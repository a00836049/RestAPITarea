// backend/controllers/userController.js

const { connection } = require("../db");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const query = "SELECT * FROM User";
        connection.exec(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener los usuarios" });
            }
            res.json(result);
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

const getUserById = async (req, res) => {
    const { ID } = req.params;
    try {
        const query = `SELECT * FROM User WHERE ID = ${ID}`;
        connection.exec(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener el usuario" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json(result[0]);
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

const createUser = async (req, res) => {
    const { NAME, EMAIL, PASSWORDHASH } = req.body;
    if (!NAME || !EMAIL || !PASSWORDHASH) {
        return res.status(400).json({ error: "Faltan datos del usuario" });
    }

    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        const hashedPassword = await bcrypt.hash(PASSWORDHASH, saltRounds);
        const query = `INSERT INTO User (NAME, EMAIL, PASSWORDHASH) VALUES ('${NAME}', '${EMAIL}', '${hashedPassword}')`;
        connection.exec(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al crear el usuario" });
            }
            res.status(201).json({ message: "Usuario creado exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

const updateUser = async (req, res) => {
    const { ID } = req.params;
    const { NAME, EMAIL, PASSWORDHASH } = req.body;

    if (!NAME && !EMAIL && !PASSWORDHASH) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    let updates = [];
    if (NAME) updates.push(`NAME = '${NAME}'`);
    if (EMAIL) updates.push(`EMAIL = '${EMAIL}'`);
    if (PASSWORDHASH) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        const hashedPassword = await bcrypt.hash(PASSWORDHASH, saltRounds);
        updates.push(`PASSWORDHASH = '${hashedPassword}'`);
    }

    const query = `UPDATE User SET ${updates.join(", ")} WHERE ID = ${ID}`;

    try {
        connection.exec(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al actualizar el usuario" });
            }
            res.status(200).json({ message: "Usuario actualizado exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};



const deleteUser = async (req, res) => {
    const { ID } = req.params;

    try {
        const query = `DELETE FROM User WHERE ID = ${ID}`;
        connection.exec(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al eliminar el usuario" });
            }
            res.status(200).json({ message: "Usuario eliminado exitosamente" });
        });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUserById };
