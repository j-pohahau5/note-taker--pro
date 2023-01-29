const express = require('express');
const fs = require('fs'); 
const path = require('path');
const uuid = require('./helpers/uuid');

let db = require('./db/db.json')
const app = express();
const PORT = 3001;

// app.use is a express method called middleware
// these 2 are formatting the data
// first one is going to covert our body to json code before it gets to our server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
//    fs.read('./db/db.json',) 
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    // create and import uuid
    // have the uuid create an id for new note
        // new note will be req.body
    // once req.body has a new id we want to  push our new note in to db array
    // now we need the new variable db to rewrite our new note
    // use the write file method to do so
    // need a respond with the new note
})



// * this means anything
// any route under this will go to this instead of this
// has to be the last route period
app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
