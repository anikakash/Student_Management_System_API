const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  //   if (!req.header["Authorize"]) {
  //     return res.status(403).json({ message: "Token required!" });
  //   }
  //   try {
  //     const decode = jwt.verify(req.headers["Authorize"], process.env.SECRET);
  //     next();
  //   } catch (error) {
  //     return res.status(403).json({
  //       message: "Token is not valid, or it expired",
  //     });
  //   }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    const decode = jwt.verify(authHeader, process.env.SECRET);
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token is not valid, or it expired",
    });
  }
};

module.exports = {
  ensureAuthenticated,
};
