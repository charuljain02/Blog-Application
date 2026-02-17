const { createHmac, randomBytes } = require("node:crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");

  this.password = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;

});

// 🔥 FIXED: static -> statics
userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const hash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password !== hash)
    throw new Error("Incorrect password");

  return createTokenForUser(user);
};

const User = model("User", userSchema);
module.exports = User;
