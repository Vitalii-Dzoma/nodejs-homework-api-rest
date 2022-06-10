const jsonwebtoken = require("jsonwebtoken");
const { registration, login, findUserById } = require("../models/AuthService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registration(email, password, {
      subscription: "starter",
    });
    res.status(201).json({ user, message: "Created" });
  } catch (err) {
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
    res.status(401).json({ message: "Email or password is wrong" });
  }
};

module.exports = {
  registrationController,
  loginController,
};
