const { connection } = require("../db");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    const { EMAIL, PASSWORDHASH } = req.body;
    if (!EMAIL || !PASSWORDHASH) {
        return res.status(400).json({ error: "Faltan datos del usuario" });
    }

    try {
        const query = `SELECT * FROM User WHERE EMAIL = '${EMAIL}'`;
        connection.exec(query, async (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al realizar el login" });
            }
            if (result.length > 0) {
                const user = result[0];
                const match = await bcrypt.compare(PASSWORDHASH, user.PASSWORDHASH);
                if (match) {
                    res.status(200).json({ message: "Login exitoso" });
                } else {
                    res.status(401).json({ error: "Error en el login" });
                }
            } else {
                res.status(401).json({ error: "Error en el login" });
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error al realizar el login" });
    }
};

module.exports = { loginUser };
