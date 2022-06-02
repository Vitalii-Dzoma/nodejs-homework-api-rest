const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favourite: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
