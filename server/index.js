const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const { getUser, credential, registerUser } = require("./models/querys.js");

const app = express();

app.listen(3000, () => console.log("SERVER ON"));
app.use(cors());
app.use(express.json());







app.get("/usuarios",  async (req, res) => {
  try {
    const usuarios = await getUser();
    res.json(usuarios);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

app.post("/login",  async (req, res) => {
  try {
    const { email, password } = req.body;
    await credential(email, password);
    const token = jwt.sign({ email }, "az_AZ", { expiresIn: "1h" });
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    console.log("Registrando usuario");
    const usuario = req.body;
    await registerUser(usuario);
    res.send("Usuario creado con éxito");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
