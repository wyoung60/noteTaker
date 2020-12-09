const express = require("express");
const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const app = express();
const PORT = process.env.PORT || 3000;

//Review these two lines of code.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = shortid.generate();
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      storedData = JSON.parse(data);
      storedData.push(newNote);
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
  res.send(path.join(__dirname, "db/db.json"));
});

app.delete("/api/notes/:id", (req, res) => {
  let selectedId = req.params.id;
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      storedData = JSON.parse(data);
      for (let i = 0; i < storedData.length; i++) {
        if (storedData[i].id === selectedId) {
          storedData.splice(i, 1);
        }
      }
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
  res.send(path.join(__dirname, "db/db.json"));
});

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
