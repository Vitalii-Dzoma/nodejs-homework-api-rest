const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controllers/AuthController");
const {
  matchUserByIdController,
} = require("../../controllers/ContactController");

const { authMiddleware } = require("../../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/signup", registrationController);

router.post("/login", loginController);

router.get("/logout", authMiddleware, matchUserByIdController);

module.exports = router;
