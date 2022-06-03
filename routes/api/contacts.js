const express = require("express");
const {
  updateContact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
} = require("../../models/contacts.js");
const { addPostValidation } = require("../../middlewares/ValidationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();

  res.json({ data, message: "success" });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);

  res.json({ data, message: "success" });
});

router.post("/", addPostValidation, async (req, res, next) => {
  const data = await addContact(req.body);
  res.json({ data, message: "success" });
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);

  res.json({ data, message: "success" });
});

router.put("/:contactId", addPostValidation, async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body);

  res.json({ data, message: "success" });
});

router.patch(
  "/:contactId/favourite",
  addPostValidation,
  async (req, res, next) => {
    const { favourite } = req.body;

    if (favourite === null) {
      return res.status(400).json({ message: "missing field favourite" });
    } else {
      try {
        const data = await updateStatusContact(req.params.contactId, req.body);
        res.status(200).json({ data, message: "success" });
      } catch (err) {
        res.status(400).json({ message: "Not found" });
      }
    }
  }
);

module.exports = router;
