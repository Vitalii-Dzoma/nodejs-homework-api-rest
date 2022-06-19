const { updateUserAvatar } = require("../models/ImageService");
const { uploadMiddleware } = require("../middlewares/uploadMiddleware");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const uploadController = async (req, res) => {
  const { path: avatarPath, originalname } = req.file;
  const { _id: ownerId } = req.owner;
  const avatarsDir = path.join(process.cwd(), "public", "avatars");
  const ext = path.extname(originalname);
  const avatrName = `${ownerId}${ext}`;
  const resUpload = path.join(avatarsDir, avatrName);
  const avatarUrl = path.join("public", "avatars", avatrName);
  try {
    await fs.rename(avatarPath, resUpload);
    const user = await updateUserAvatar(ownerId, avatarUrl);
    const avatar = await Jimp.read(resUpload);
    avatar.resize(250, 250).write(resUpload);

    res.status(200).json({ avatarURL: avatarUrl });
    return user;
  } catch (err) {
    await fs.unlink(avatarPath);
    throw err;
  }
};

module.exports = {
  uploadController,
};
