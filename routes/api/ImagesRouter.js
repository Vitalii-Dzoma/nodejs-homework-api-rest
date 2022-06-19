const express = require("express");

const { authMiddleware } = require("../../middlewares/AuthMiddleware");
const { uploadMiddleware } = require("../../middlewares/uploadMiddleware");

const router = new express.Router();
const { uploadController } = require("../../controllers/filesController");

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  uploadController
);

module.exports = { filesRouter: router };
