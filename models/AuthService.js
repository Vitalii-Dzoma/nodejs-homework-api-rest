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
    text: `Подтвердите вашу электронную почту по ссылке localhost:3000/api/users/verify/${verificationToken}`,
    html: `Подтвердите вашу электронную почту по ссылке localhost:3000/api/users/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOptions);
};

const registrationConfirmation = async (verificationToken) => {
  const verifiedUser = await User.findOne({
    verificationToken,
    verified: false,
  });

  verifiedUser.verified = true;
  verifiedUser.verificationToken = 1;
  await verifiedUser.save();

  const emailOptions = {
    from: verifiedUser.email,
    to: "voda24147@gmail.com",
    subject: "Thank you for registration!",
    text: "and easy to do anywhere, even with Node.js",
    html: "<h1>and easy to do anywhere, even with Node.js</h1>",
  };
  await transporter.sendMail(emailOptions);
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  const password = sha256(Date.now() + process.env.JWT_SECRET);
  user.password = password;
  await user.save();

  const emailOptions = {
    from: user.email,
    to: "voda24147@gmail.com",
    subject: "Forgot password!",
    text: `Here is your temporary password: ${password}`,
    html: `Here is your temporary password: ${password}`,
  };
  await transporter.sendMail(emailOptions);
};

const verificationError = async (email) => {
  const user = await User.findOne({ email, confirmed: false });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  await user.save();

  const emailOptions = {
    from: user.email,
    to: "voda24147@gmail.com",
    subject: "Verification error!",
    text: `Here is your verification token: ${user.verificationToken}`,
  };
  await transporter.sendMail(emailOptions);
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verified: true });
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
  forgotPassword,
  verificationError,
};
