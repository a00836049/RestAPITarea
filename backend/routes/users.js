const express = require("express");
const { getUsers, createUser, updateUser, deleteUser, getUserById } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:ID", getUserById);
router.put("/:ID", updateUser);
router.delete("/:ID", deleteUser);

module.exports = router;
