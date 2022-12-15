const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require('uuid');
// require fs to read/write files, util for promisify, and uuid for unique id

// constants to add promises to fs read and write
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// class constructor for notes
class storeNote {
    // function to read db databas
    read() {
        return readFile("db/db.json", "utf8")
    }
    // function to write note to db
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note));
    }
    // function to get notes in db and put in array
    getNotes() {
        return this.read().then((notes) => {
            let stringNotes;
            try {
                stringNotes = [].concat(JSON.parse(notes));
            }   catch (err) {
                stringNotes = [];
            }
            return stringNotes;
        });
    }
    // function to add note
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Title and text cannot be left blank")
        }

        const newNote = { title, text, id: uuidv4() };
        // add unique id to each new note
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }
    // function to remove note using unique id
    removeNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((updatedNotes) => this.write(updatedNotes));
    }
};

// exporting file
module.exports = new storeNote();