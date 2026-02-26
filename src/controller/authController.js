const Usuario = require('../models/Usuario');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: {email} });
        if (usuario && usuario.password === password) {
            res.json({
                message: `Bienvenido - ${usuario.nombre}`,
                user: { nombre: usuario.nombre, email: usuario.email}
            });
        } else {
            res.status(401).json({ message: "Usuario o contraseña incorrectos "});
        }
    }catch (error) {
        res.status(500).json({ message: "Error en el servidor", error })
    }
};

module.exports = { login };