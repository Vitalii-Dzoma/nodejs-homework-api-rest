const nodemailer = require("nodemailer");

require("dotenv").config();
const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "vitala20077@meta.ua",
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(config);

module.exports = {
  transporter,
};
