const jsonwebtoken = require("jsonwebtoken");
const gravatar = require("gravatar");
const {
  registration,
  login,
  findUserById,
  registrationConfirmation,
} = require("../models/AuthService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await registration(email, password, {
      subscription: "starter",
    });
    res.status(201).json({ user, message: "Created" });
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: "Email in use" });
  }
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password, {
      subscription: "starter",
    });

    res.status(200).json({ message: "Logged in", token });
    return token;
  } catch (err) {
    res
      .status(401)
      .json({
        message: "Email or password is wrong or need to verify your email",
      });
  }
};

const matchUserByIdController = async (req, res) => {
  const { _id: ownerId } = req.owner;
  try {
    const user = await findUserById(ownerId);

    req.token = "";
    res.status(204).json({ message: "No Content" });
    return user;
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

const getCurrentUserController = async (req, res) => {
  const { _id: ownerId } = req.owner;
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  try {
    const user = await findUserById(ownerId);
    const { email, subscription, token } = user;
    token = null;
    res.status(200).json({ email, subscription, message: "OK" });
    return user;
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

const registrationVerificationController = async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await registrationConfirmation(verificationToken);
    res.status(200).json({ user, message: "Verification successful" });
  } catch (err) {
    console.log(err);
    res.status(40).json({ message: "Not found" });
  }
};

module.exports = {
  registrationController,
  loginController,
  matchUserByIdController,
  getCurrentUserController,
  registrationVerificationController,
};
