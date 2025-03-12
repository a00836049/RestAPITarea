// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "miClaveSecreta"; // Clave secreta

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Obtener el token del encabezado

    if (!token) {
        return res.status(403).json({ error: "Acceso denegado, token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Guardar usuario decodificado en req
        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
};

module.exports = verifyToken;
