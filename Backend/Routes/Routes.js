const express = require('express');
const router = express.Router();

const TestController = require("../Controllers/TestController");
const LoginController = require("../Controllers/LoginController");

router.get("/test", LoginController.verify, TestController.test);
router.post("/register", LoginController.register);
router.post("/login", LoginController.login);
module.exports = router;