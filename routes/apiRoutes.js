const api = require("express").Router();
const storeNote = require("../db/storage");
// routing and bringing in storage logic

// get request for getting notes from db
api.get('/notes', (req, res) => {
    storeNote
      .getNotes()
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.sendStatus(404).json(err));
  });

// post request to post notes to db
api.post("/notes", (req, res) => {
    storeNote
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.sendStatus(404).json(err));
});

// delete request to delete by id from db
api.delete("/notes/:id", (req, res) => {
    storeNote
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.sendStatus(404).json(err))
});


// export file
module.exports = api;