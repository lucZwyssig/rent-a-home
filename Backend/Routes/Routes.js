const express = require('express');
const router = express.Router();

const TestController = require("../Controllers/TestController");
const LoginController = require("../Controllers/LoginController");
const RoomController = require("../Controllers/RoomController");

router.get("/test", LoginController.verify, TestController.test);
router.post("/register", LoginController.register);
router.post("/login", LoginController.login);
router.get("/rooms", RoomController.getRooms);
module.exports = router;