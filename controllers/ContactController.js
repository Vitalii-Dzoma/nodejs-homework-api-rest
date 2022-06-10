const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/ContactService");

const getAllContactsController = async (req, res) => {
  const { _id: ownerId } = req.owner;
  const contacts = await listContacts(ownerId);

  res.status(200).send(contacts);
};

const getContactWithId = async (req, res) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.owner;
  const contact = await getContactById(contactId, ownerId);

  if (!contact)
    res.status(404).json({ message: `Contact with ${contactId} not found` });

  res.status(200).send(contact);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { _id: ownerId } = req.owner;
  const createdContact = await addContact({ name, email, phone }, ownerId);
  return res.status(201).json({ createdContact, message: "Contact created" });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.owner;

  const contactToDelete = await getContactById(contactId, ownerId);
  console.log(contactToDelete);
  if (!contactToDelete)
    return res
      .status(404)
      .json({ message: `Contact with ${contactId} not found` });

  await removeContact(contactToDelete, ownerId);

  res.status(200).json({ message: "contact deleted" });
};

const renewContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.owner;
  const contactToRenew = await getContactById(contactId, ownerId);

  if (!contactToRenew) {
    return res
      .status(404)
      .json({ message: `Contact with ${contactId} not found` });
  }

  const updatedCont = await updateContact(contactId, req.body, ownerId);

  res
    .status(200)
    .json({ updatedCont, message: "Contact successfully updated" });
};

const matchUserByIdController = async (req, res, next) => {
  console.log(req);
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

module.exports = {
  getAllContactsController,
  getContactWithId,
  renewContact,
  createContact,
  deleteContact,
  matchUserByIdController,
};
