
const checkCredentials = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Credenciales no proporcionadas");
    }
    next();
  };
  
  module.exports = checkCredentials;
  