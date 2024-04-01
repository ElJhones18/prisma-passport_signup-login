const userController = require("../controllers/user_controller");
const express = require("express");
const router = express.Router();

// http:localhost:3000/api/v1/users/signup
router.post("/signup", userController.signUpUser);
router.post("/login", userController.loginUser);

module.exports = router;