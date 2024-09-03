const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  accessToken: String,
  refreshToken: String,
  email: String,
  name: String,
  profilePic: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
