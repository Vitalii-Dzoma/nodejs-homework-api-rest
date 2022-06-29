const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const sha256 = require("sha256");
const { User } = require("../db/usersModel");
const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const { transporter } = require("../helpers/nodemailer");

const registration = async (email, password) => {
  const verificationToken = sha256(email + process.env.JWT_SECRET);
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    verificationToken,
  });
  await user.save();

  //sha256("hello");

  const emailOptions = {
    from: email,
    to: "voda24147@gmail.com",
    subject: "Nodemailer test",
    text: `Подтвердите вашу электронную почту по ссылке https://localhost:3000/api/auth/verify/${verificationToken}`,
    html: `Подтвердите вашу электронную почту по ссылке https://localhost:3000/api/auth/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOptions);
};

const registrationConfirmation = async (verificationToken) => {
  const verifiedUser = await User.findOne({
    verificationToken,
    verified: false,
  });

  console.log(verifiedUser);

  verifiedUser.verified = true;
  verifiedUser.verificationToken = null;
  // await verifiedUser.save();

  const emailOptions = {
    from: verifiedUser.email,
    to: "voda24147@gmail.com",
    subject: "Nodemailer test",
    text: `Подтвердите вашу электронную почту по ссылке https://localhost:3000/api/auth/verify/${verificationToken}`,
    html: `Подтвердите вашу электронную почту по ссылке https://localhost:3000/api/auth/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOptions);
};

const login = async (email, password) => {
  const user = await User.findOne({ email, password, verified: true });
  console.log(user);
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const findUserById = async (ownerId) => {
  const user = await User.findOne({ _id: ownerId });
  return user;
};

module.exports = {
  registration,
  login,
  findUserById,
  registrationConfirmation,
};
