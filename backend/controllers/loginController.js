// backend/controllers/loginController.js

const { connection } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "miClaveSecreta"; // Clave secreta

const loginUser = async (req, res) => {
    const { EMAIL, PASSWORDHASH } = req.body;
    if (!EMAIL || !PASSWORDHASH) {
        return res.status(400).json({ error: "Faltan datos del usuario" });
    }

    try {
        const query = `SELECT * FROM User WHERE EMAIL = ?`;
        connection.prepare(query, (err, statement) => {
            if (err) return res.status(500).json({ error: "Error al preparar la consulta" });

            statement.exec([EMAIL], async (err, result) => {
                if (err) return res.status(500).json({ error: "Error en la base de datos" });

                if (result.length > 0) {
                    const user = result[0];
                    const match = await bcrypt.compare(PASSWORDHASH, user.PASSWORDHASH);
                    if (match) {
                        // Generar JWT
                        const token = jwt.sign(
                            { id: user.ID, email: user.EMAIL },
                            secretKey,
                            { expiresIn: "1h" }
                        );

                        res.status(200).json({ message: "Login exitoso", token });
                    } else {
                        res.status(401).json({ error: "Credenciales incorrectas" });
                    }
                } else {
                    res.status(401).json({ error: "Credenciales incorrectas" });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = { loginUser };
