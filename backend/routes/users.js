const express = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:ID", updateUser);
router.delete("/:ID", deleteUser); 

module.exports = router;
