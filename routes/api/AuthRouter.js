const express = require("express");
const {
  registrationController,
  loginController,
  registrationVerificationController,
  forgotPasswordController,
  verificationErrorController,
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

router.post("/verify/", verificationErrorController);

router.get("/current", authMiddleware, getCurrentUserController);

router.post("/forgot_password", forgotPasswordController);

module.exports = router;
