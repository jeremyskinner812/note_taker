const page = require("express").Router();
const path = require("path");
// routing from server and require path for .join

// get request for notes HTML page
page.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// get request for main html page
page.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// exporting file
module.exports = page;