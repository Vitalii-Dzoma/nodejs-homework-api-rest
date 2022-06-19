const { User } = require("../db/usersModel");

const updateUserAvatar = async (ownerId, avatarURL) => {
  const user = await User.findOneAndUpdate(
    { _id: ownerId },
    {
      $set: { avatarURL },
    }
  );
  return user;
};

module.exports = { updateUserAvatar };
