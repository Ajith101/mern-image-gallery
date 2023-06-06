const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const {
  hashedPassword,
  createAtoken,
  comparePassword,
} = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await userModel.findOne({ email });
    if (!emailExist) {
      const hash = await hashedPassword(password);
      req.body.password = hash;
      const response = await userModel.create(req.body);
      const token = createAtoken({
        id: response._id,
        firstName: response.firstName,
      });
      return res.status(200).json({ user: response, token });
    }
    return res
      .status(400)
      .json({ message: `The email ${email} already exist` });
  } catch (error) {
    return res.status(400).json({ message: `something went wrong` });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      const passwordMatch = await comparePassword(
        password,
        emailExist.password
      );
      if (passwordMatch) {
        const token = createAtoken({
          id: emailExist._id,
          firstName: emailExist.firstName,
        });
        return res.status(200).json({
          user: emailExist,
          token,
        });
      }
      return res.status(400).json({ message: "Password does not match" });
    }
    return res.status(400).json({ message: `the email ${email} not exist` });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({ _id: req.userId });
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { registerUser, loginUser, getAllUser };
