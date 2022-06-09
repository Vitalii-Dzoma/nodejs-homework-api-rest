const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const { User } = require("../db/usersModel");
const jwt = require("jsonwebtoken");

const registration = async (email, password) => {
  const user = new User({ email, password: await bcrypt.hash(password, 10) });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = { registration, login };
