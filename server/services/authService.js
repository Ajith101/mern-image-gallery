const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "hello";

const hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const createAtoken = (user) => {
  const token = jwt.sign(user, secret, { expiresIn: "7d" });
  return token;
};

const comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

module.exports = { hashedPassword, createAtoken, comparePassword, secret };
