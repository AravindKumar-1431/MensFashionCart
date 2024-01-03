const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    let token = req.header("y-token");
    console.log("Token:", token);
    if (!token) {
      return res.status(404).send("token not found");
    }
    let decoded = jwt.verify(token, "jwtPassword");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send("autherr");
  }
};
