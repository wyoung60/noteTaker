const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

const app = express();
const PORT = 3000;

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
});

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
