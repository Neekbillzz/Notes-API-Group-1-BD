const express = require('express');
const {
    postNote,
    getNoteByID,
    getAllNotes,
    updateNoteByID,
    deleteNoteByID,
    searchArticles
} = require('../controllers/note.controller.js');
const requireAuth = require('../middlewares/require-auth.js');

const router = express.Router();

router.post('/articles', requireAuth, postNote);
router.get('/articles', requireAuth, getAllNotes);
router.get('/articles/search', requireAuth, searchArticles);
router.get('/articles/:id', requireAuth, getNoteByID);
router.put('/articles/:id', requireAuth, updateNoteByID);
router.delete('/articles/:id', requireAuth, deleteNoteByID);

module.exports = router;