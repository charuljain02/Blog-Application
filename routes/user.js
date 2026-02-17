const { Router } = require("express");
const router = Router();
const User = require("../models/user");

// Signin Page
router.get("/signin", (req, res) => {
  res.render("signin");
});

// Signup Page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Signup POST
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({ fullName, email, password });

    const token = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error);
    return res.send("Something went wrong");
  }
});

// Signin POST
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.send("Invalid Email or Password");
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
