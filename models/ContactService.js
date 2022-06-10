const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { Contact } = require("../db/contactsModel");

const listContacts = async (ownerId) => {
  const contacts = await Contact.find({ ownerId });
  return contacts;
};

const getContactById = async (contactId, ownerId) => {
  const contact = await Contact.findOne({ _id: contactId, ownerId });

  return contact;
};

const removeContact = async (contactId, ownerId) => {
  await Contact.findOneAndRemove({ _id: contactId, ownerId });
};

const addContact = async ({ name, email, phone }, ownerId) => {
  const contact = new Contact({ name, email, phone, ownerId });
  await contact.save();
};

const updateContact = async (contactId, body, ownerId) => {
  const { name, email, phone } = body;

  await Contact.findOneAndUpdate(
    { _id: contactId, ownerId },
    {
      $set: { name, email, phone },
    }
  );
};

const updateStatusContact = async (contactId, body, ownerId) => {
  await Contact.findOneAndUpdate({ _id: contactId, ownerId }, body, {
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
