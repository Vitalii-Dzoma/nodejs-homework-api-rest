const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContactsController = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).send(contacts);
};

const getContactWithId = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact)
    res.status(404).json({ message: `Contact with ${contactId} not found` });

  res.status(200).send(contact);
};

const createContact = async (req, res) => {
  const createdContact = await addContact(req.body);
  return res.status(201).json({ createdContact, message: "Contact created" });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await getContactById(contactId);

  if (!contactToDelete)
    return res
      .status(404)
      .json({ message: `Contact with ${contactId} not found` });

  await removeContact(contactToDelete.id);

  res.status(200).json({ message: "contact deleted" });
};

const renewContact = async (req, res) => {
  const { contactId } = req.params;

  const contactToRenew = await getContactById(contactId);

  if (!contactToRenew) {
    return res
      .status(404)
      .json({ message: `Contact with ${contactId} not found` });
  }

  const updatedCont = await updateContact(contactId, req.body);

  res
    .status(200)
    .json({ updatedCont, message: "Contact successfully updated" });
};

module.exports = {
  getAllContactsController,
  getContactWithId,
  renewContact,
  createContact,
  deleteContact,
};
