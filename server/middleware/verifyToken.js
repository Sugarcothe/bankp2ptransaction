const jwt = require("jsonwebtoken");
const config = require("../config/index");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).json({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token, config.JWT_SECRET);
    req.user = verified;

    next();
  } catch {
    res.status(400).json({ message: "Invalid Token!" });
  }
};
