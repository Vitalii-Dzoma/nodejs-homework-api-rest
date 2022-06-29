const express = require("express");
const {
  registrationController,
  loginController,
  registrationVerificationController,
} = require("../../controllers/AuthController");
const {
  matchUserByIdController,
  getCurrentUserController,
} = require("../../controllers/AuthController");
const { addUserValidation } = require("../../middlewares/ValidationMiddleware");

const { authMiddleware } = require("../../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/signup", registrationController);

router.post("/login", loginController);

router.get("/logout", authMiddleware, matchUserByIdController);

router.get("/verify/:verificationToken", registrationVerificationController);

router.get("/current", authMiddleware, getCurrentUserController);

module.exports = router;
