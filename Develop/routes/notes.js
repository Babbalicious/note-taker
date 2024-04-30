const express = require("express");

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

express.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

express.post("/api/notes", (req, res) => {
  // receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Give each note a unique ID when it's saved.
});
