const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUser,
} = require("../controller/authController");
const verifyToken = require("../middleware/verifyToken");
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/all", verifyToken, getAllUser);

module.exports = authRouter;
