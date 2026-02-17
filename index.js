const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));


// Serve public folder for images
app.use(express.static(path.join(__dirname, "public")));

// Authentication middleware
app.use(checkForAuthenticationCookie("token"));

// Make user available in all EJS templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Home Page - show all blogs
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 }); // newest first
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
