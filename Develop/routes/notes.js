const notes = require('express').Router();
const fs = require("fs");
const uuid = require("../helpers/uuid");
let db = require("../db/db.json");


// api/notes
notes.get("/", (req, res) => {
  //    fs.read('./db/db.json',)
  res.json(db);
});
// api/notes
notes.post("/", (req, res) => {
  // create and import uuid
  // have the uuid create an id for new note
  // new note will be req.body
  // once req.body has a new id we want to  push our new note in to db array
  // now we need the new variable db to rewrite our new note
  // use the write file method to do so
  // need a respond with the new note
  // Log that a POST request was received
//   console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

    // Write the string to a file
    // first parameter needs a string value of path you want 
    // fs need the first 
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile(
            './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.log("successfully updated notes!")
        );
      }
    });
  
    const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
});

// this delete taking in the route to id from /api/notes/:id
// api/notes/
notes.delete("/:id", (req, res) => {
    console.log("delete");
    // giving id the value fo requesting the parameters id
    var id = req.params.id
    console.log(id)
    // reading the file db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // if there is an error then console log it
        if (err) {
          console.error(err);
        } else {
          // letting parsedNoted equal the object of data
          let parsedNotes = JSON.parse(data);
         // filtering parsedNotes by the notes_id 
          parsedNotes = parsedNotes.filter((note) => {
          // returning  if notes_id is equal to id then it is true
          return note.note_id === id;
          });
            // rewriting the file db.json with the deleted notes taken out
          
          fs.writeFile(
              './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.log("successfully deleted note!")
          );
        
        };
    }) 
})

 
module.exports = notes;