import jwt from "jsonwebtoken"
// const config = require("../config/index");

export const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if(!token) {
    return next( res.status(401).json({
        message: "You are not authenticated",
      }))
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(res.status(403).json("invalid token"));
    } else {
      req.user = user;
      next();
    }
  });
}

export const verifyUser = (res, req) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id ){
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized",
      })
    }
  })
}

// module.exports = (req, res, next) => {
//   const token = req.header("auth-token");

//   if (!token) return res.status(401).json({ message: "Access Denied!" });

//   try {
//     const verified = jwt.verify(token, config.JWT_SECRET);
//     req.user = verified;

//     next();
//   } catch {
//     res.status(400).json({ message: "Invalid Token!" });
//   }
// };

