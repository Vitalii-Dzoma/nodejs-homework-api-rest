const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controllers/AuthController");

const router = express.Router();

router.post("/signup", registrationController);

router.post("/login", loginController);

module.exports = router;
