// backend/routes/users.js

const express = require("express");
const { getUsers, createUser, updateUser, deleteUser, getUserById } = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getUsers); // Protegido
router.post("/", verifyToken, createUser); // Protegido
router.get("/:ID", verifyToken, getUserById); // Protegido
router.put("/:ID", verifyToken, updateUser); // Protegido
router.delete("/:ID", verifyToken, deleteUser); // Protegido

module.exports = router;
