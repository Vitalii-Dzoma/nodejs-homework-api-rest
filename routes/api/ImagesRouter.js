const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Jimp = require("jimp");
let fs = require("fs");

const FILE_DIR = path.resolve("./tmp");
const router = new express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);

    Jimp.read(file)
      .then((img) => {
        return img
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write("lena-small-bw.jpg"); // save
      })
      .catch((err) => {
        console.error(err);
      });
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    const imageName = `${uuidv4()}.${extension}`;

    cb(null, imageName);
    fs.rename(imageName, "../public/avatars", (err) => {
      if (err) throw err;
      console.log("Файл успешно перемещён");
    });
  },
});

const { uploadController } = require("../../controllers/filesController");
const uploadMiddleware = multer({ storage });

router.patch("/avatars", uploadMiddleware.single("avatar"), uploadController);
router.use("/download", express.static(FILE_DIR));

module.exports = { filesRouter: router };
