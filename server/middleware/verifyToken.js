const jwt = require("jsonwebtoken");
const { secret } = require("../services/authService");

const verifyToken = async (req, res, next) => {
  try {
    const token = req?.headers["authorization"].split(" ")[1];
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json({ message: `Token is not valid` });
      }
      req.userId = result.id;
      next();
    });
  } catch (error) {
    return res.status(400).json({ message: `Token not valid ${error}` });
  }
};

module.exports = verifyToken;
