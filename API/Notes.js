const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");

// Create a new note
router.post("/", async (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ message: "User ID and note text are required" });
  }

  try {
    const newNote = new Note({ userId, text });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all notes for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { text }, { new: true });
    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;