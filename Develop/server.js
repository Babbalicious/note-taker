const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const path = require("path");

//require routes
const { pageRouter } = require("./routes/pages");
const notesRouter = require("./routes/notes");

//middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routers
app.use("/pages", pageRouter);
app.use("/api/notes", notesRouter);

//route for front-end pages
app.use("/", pageRouter);

//static middleware for assets in public folder
app.use(express.static("public"));

app.get("*", (req, res) => {
  console.log("get request");
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});
