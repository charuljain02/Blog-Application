const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "fallbackSecret123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  return JWT.sign(payload, secret, {
    expiresIn: "1d",
  });
}

function validateToken(token) {
  return JWT.verify(token, secret);
}

module.exports = {
  createTokenForUser,
  validateToken,
};
