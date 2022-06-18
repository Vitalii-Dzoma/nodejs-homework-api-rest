const { User } = require("../db/usersModel");

const updateUserAvatar = async (ownerId, avatarURL) => {
  await User.findOneAndUpdate(
    { _id: ownerId },
    {
      $set: { avatarURL },
    }
  );
};

module.exports = { updateUserAvatar };
