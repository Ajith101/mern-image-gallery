const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  password: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
