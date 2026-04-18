const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true, // Indexed for search
    },
    content: {
      type: String,
      required: true,
      index: true, // Indexed for search
    },
    category: {
      type: String,
      required: false,
      default: "Personal",
    },
    tags: {
      type: [String], // Array of Strings
      required: false,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  },
);

// Adding a text index for full-text search across title and content
noteSchema.index({ title: "text", content: "text" });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
