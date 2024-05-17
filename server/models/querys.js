const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'latam',
    database: 'softjobs',
    allowExitOnIdle: true
});

const getUser = async () => {
    const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
    return usuarios;
};

const credential = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 401, message: "Email o contraseña incorrecta" };
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta) throw { code: 401, message: "Email o contraseña incorrecta" };
};

const registerUser = async (usuario) => {
    let { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    const values = [email, passwordEncriptada, rol, lenguage];
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
    await pool.query(consulta, values);
};

module.exports = { getUser, registerUser, credential };
