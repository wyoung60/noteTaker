const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// app.use(express.static("/assets/css/style.css"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes.html", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// app.get("/assets/js/index.js", (req, res) => {
//   app.use(express.static("/assets/js/index.js"));
// });

// app.get("/assets/css/styles.css", (req, res) => {
//   res.type("text/css");
//   res.end(app.use(express.static("/assets/css/style.css")));
// });

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
