const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/UserController");

// GET
router.get("/login", loginUser);

// POST
router.post("/register", registerUser);

module.exports = router;
