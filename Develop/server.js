const express = require('express');
const fs = require('fs'); 
const path = require('path');

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

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
