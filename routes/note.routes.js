const express = require("express");

const {
  postNote,
  getNoteByID,
  getAllNotes,
  updateNoteByID,
  deleteNoteByID,
  searchNotes,
} = require("../controllers/note.controller.js");
const requireAuth = require("../middlewares/require-auth.js");
const validatePost = require("../validators/validatePost.js");
const validateUpdate = require("../validators/validateUpdate.js");

const router = express.Router();

router.post("/", requireAuth, validatePost, postNote);
router.get("/", requireAuth, getAllNotes);
router.get("/search", requireAuth, searchNotes);
router.get("/:id", requireAuth, getNoteByID);
router.put("/:id", requireAuth, validateUpdate, updateNoteByID);
router.delete("/:id", requireAuth, deleteNoteByID);

module.exports = router;
