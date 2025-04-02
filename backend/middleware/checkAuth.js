const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const verifiedUser = await jwt.verify(token, process.env.JWT_SIGN);
    req.user = verifiedUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = checkAuth;
