import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) 
    return res.status(401).json({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token, process.env.JWT);
    req.user = verified;

    next();
  } catch {
    res.status(400).json({ message: "Invalid Token!" });
  }
};








// export const auth = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     return next(
//       res.status(401).json({
//         message: "You are not authenticated",
//       })
//     );
//   }

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) {
//       return next(res.status(403).json("invalid token"));
//     } else {
//       req.user = user;
//     }
//   });
// };

// export const verifyUser = (res, req) => {
//   auth(req, res, () => {
//     if (req.user.id === req.params.id) {
//     } else {
//       res.status(403).json({
//         message: "You are not authorized",
//       });
//     }
//   });
// };