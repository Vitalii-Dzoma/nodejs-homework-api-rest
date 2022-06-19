const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Jimp = require("jimp");
let fs = require("fs-extra");

const FILE_DIR = path.resolve("./tmp/");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },

  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    const imageName = `${uuidv4()}.${extension}`;
    cb(null, imageName);
    // Jimp.read(FILE_DIR)
    //   .then((img) => {
    //     return img
    //       .resize(250, 250) // resize
    //       .quality(60) // set JPEG quality
    //       .greyscale() // set greyscale
    //       .write(`../nodejs-homework-api-rest/public/avatars/${imageName}`);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // const newAvatarURL = `../nodejs-homework-api-rest/public/avatars/${imageName}`;
    // // fs.move(FILE_DIR, newAvatarURL, (err) => {
    // //   if (err) throw err;
    // // });
    // req.path = newAvatarURL;
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
