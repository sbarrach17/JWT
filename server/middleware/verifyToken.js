// middlewares/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send("Token no proporcionado");
  }
  try {
    const decoded = jwt.verify(token, "az_AZ");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Token inválido");
  }
};

module.exports = verifyToken;
