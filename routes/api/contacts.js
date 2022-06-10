const express = require("express");
const { updateStatusContact } = require("../../models/ContactService.js");
const {
  getAllContactsController,
  getContactWithId,
  renewContact,
  createContact,
  deleteContact,
} = require("../../controllers/ContactController");
const { authMiddleware } = require("../../middlewares/AuthMiddleware");
const { addPostValidation } = require("../../middlewares/ValidationMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/", getAllContactsController);

router.get("/:contactId", getContactWithId);

router.post("/", addPostValidation, createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", addPostValidation, renewContact);

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
