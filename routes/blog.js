const { Router } = require("express");
const multer = require("multer");
const router = Router();
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

// ================= Multer Storage =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.resolve(`./public/uploads/${req.user._id}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// ================= Add Blog Page =================
router.get("/add-new", (req, res) => {
  return res.render("addBlog");
});

// ================= Create Blog =================
router.post("/", upload.single("coverImage"), async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");
  const { title, body } = req.body;

  let coverImageURL = null;

  if (req.file) {
    coverImageURL = path.relative(
      path.join(__dirname, "../public"),
      req.file.path
    );
    coverImageURL = coverImageURL.replace(/\\/g, "/");
  }

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL
  });

  return res.redirect(`/blog/${blog._id}`);
});

// ================= Single Blog Page =================
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

  return res.render("blog", { blog, comments });
});

// ================= Add Comment =================
router.post("/comment/:blogId", async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

// ================= Delete Blog =================
router.post("/:id/delete", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).send("Blog not found");

  if (!req.user || blog.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).send("You are not authorized to delete this blog");
  }

  await Blog.findByIdAndDelete(req.params.id);

  return res.redirect("/");
});

module.exports = router;
