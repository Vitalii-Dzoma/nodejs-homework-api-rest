const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { Contact } = require("../db/contactsModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  console.log("Database connection successful");
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  return contact;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  const contact = new Contact({ id: uuidv4(), ...body });
  await contact.save();
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
};

const updateStatusContact = async (contactId, body) => {
  await Contact.findByIdAndUpdate(contactId, body, {
    favourite: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
