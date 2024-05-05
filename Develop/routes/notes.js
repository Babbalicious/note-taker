const express = require("express");
const router = express.Router();

// const fs = require("fs");

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

const path = require("path");

//GET handler
router.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST handler
router.post("/", (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, path.join(__dirname, "../db/db.json"));

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

//DELETE handler
router.delete("/:id", (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to delete a note`);

  const noteID = req.params.id;

  readFromFile(path.join(__dirname, "../db/db.json"))
    .then((data) => {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== noteID);

      if (notes.length === filteredNotes.length) {
        throw new Error("Note not found");
      }

      //write filtered notes back to the file
      return writeToFile(path.join(__dirname, "../db/db.json"), filteredNotes);
    })
    .then(() => res.status(200).json({ message: "Note deleted successfully" }))
    .catch((error) => {
      console.error(`Error in deleting note: ${error}`);
      res.status(404).json({ error: "Note not found" });
    });
});

module.exports = router;
