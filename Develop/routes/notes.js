const express = require("express");
const router = express.Router();

const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

const path = require("path");

router.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

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
      review_id: uuid(),
    };

    readAndAppend(newNote, path.join(__dirname, "../db/db.json"));

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

module.exports = router;
