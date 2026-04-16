const express = require('express');
const {
    postNote,
    getNoteByID,
    getAllNotes,
    updateNoteByID,
    deleteNoteByID,
    searchArticles
} = require('../controllers/note.controller.js');

const router = express.Router();

router.post('/articles', postNote);
router.get('/articles', getAllNotes);
router.get('/articles/search',  searchArticles);
router.get('/articles/:id',  getNoteByID);
router.put('/articles/:id', updateNoteByID);
router.delete('/articles/:id', deleteNoteByID);

module.exports = router;