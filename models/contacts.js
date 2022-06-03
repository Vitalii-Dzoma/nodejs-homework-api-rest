const fs = require("fs").promises;
const contactPath = "./models/contacts.json";
const { v4: uuidv4 } = require("uuid");
const { Contact } = require("../db/contactsModel");
const { WrongParametersError } = require("../helpers/errors");

const listContacts = async () => {
  // const data = await fs.readFile(contactPath, "utf8");
  const contacts = await Contact.find({});
  console.log("Database connection successful");
  console.log(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`
    );
  }

  return contact;
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  const { name, email, phone, favourite } = body;

  const contact = new Contact({ id: uuidv4(), name, email, phone, favourite });
  await contact.save();
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
};

const updateStatusContact = async (contactId, body) => {
  const { name, email, phone, favourite } = body;
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favourite },
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
