const Note = require("../models/note.model");
const Task = require("../models/task");
const extractTask = require("../utils/taskExtractor");

// Create a new note
exports.postNote = async (req, res) => {
  try {
    // Check for exact note existing for user
    const existingNote = await Note.findOne({
      user: req.user.id,
      content: req.body.content,
    });

    if (existingNote) {
      return res.status(409).json({ message: "Note already exists!" });
    }

    const newNote = await Note.create({ ...req.body, user: req.user.id });
    // Extraction Logic
    const extracted = extractTask(newNote.content);
    console.log("--- DEBUG EXTRACTION ---");
    console.log("Input Text:", newNote.content);
    console.log("Extracted Result:", extracted);
    console.log("--------------------------");

    if (extracted) {
      await Task.create({
        noteId: newNote._id,
        taskText: extracted.description,
        dueDate: extracted.date,
      });
    }
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
    try {
        // Build query object
        let query = { user: req.user.id };

        // 1. Filtering
        if (req.query.category) {
            query.category = req.query.category;
        }

        // 2. Pagination 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const notes = await Note.find(query)
            .sort({ createdAt: -1 }) // Sorting (Rubric Requirement - 5 pts)
            .skip(skip)
            .limit(limit);

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single note by ID
exports.getNoteByID = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a note
exports.updateNoteByID = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: req.params.id, user: req.body },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a note
exports.deleteNoteByID = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deleteNote = await Note.findByIdAndDelete({
      _id: noteId,
      user: req.user.id,
    });

    if (!deleteNote) {
      return;
      res.status(404).json({ message: "Note not found" });
    }
    // Delete any task relating to this note
    await Task.deleteMany({ noteId: noteId });

    res
      .status(200)
      .json({ message: "Note and associated tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search notes
exports.searchNotes = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Note.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
