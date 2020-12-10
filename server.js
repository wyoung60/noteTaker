//Required npm and node modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

//Run express and create variable
const app = express();
//Create heroku and local PORT
const PORT = process.env.PORT || 3000;

//Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Allows HTML files to use JS and CSS files
app.use(express.static(path.join(__dirname, "public")));

//Opens index.html with empty request
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//Opens note file with "/notes" request or request from index.html file
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//Gets saved note from db.json file
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Post new notes in db.json file
app.post("/api/notes", (req, res) => {
  //Stores user note variable
  let newNote = req.body;
  //Uses shortid to generate random note id and save to object
  newNote.id = shortid.generate();
  //Open db.json
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
    //Handles error if present
    if (err) {
      console.log(err);
    } else {
      //Converts JSON object and store data
      let storedData = JSON.parse(data);
      //Adds new note object to stored data
      storedData.push(newNote);
      //Writes to db.json file
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        //Converts to JSON and stores
        JSON.stringify(storedData),
        (err) => {
          //Handles error if present
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
  //End response
  res.end();
});

//Delete specific notes from db.json
app.delete("/api/notes/:id", (req, res) => {
  //Get selected id.
  let selectedId = req.params.id;
  //Open db.json file
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //Store JSON data
      let storedData = JSON.parse(data);
      //For loop to delete note with matching id.
      for (let i = 0; i < storedData.length; i++) {
        if (storedData[i].id === selectedId) {
          storedData.splice(i, 1);
        }
      }
      //Rewrite db.json file without note
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(storedData),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
  //End response
  res.end();
});

//Start server listening
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
