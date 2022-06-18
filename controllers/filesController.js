const { updateUserAvatar } = require("../models/ImageService");

const uploadController = async (req, res) => {
  const { _id: ownerId, avatarURL } = req.owner;
  try {
    const user = await updateUserAvatar(ownerId);
    res.status(200).json({ avatarURL: "тут будет ссылка на изображение" });
    return user;
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  uploadController,
};
