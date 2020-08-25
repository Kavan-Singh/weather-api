// require all needed modules
const express = require("express");
const fetch = require("node-fetch");
const argv = require("yargs").argv;

// declare port
const PORT = process.env.PORT || 3000;

let zipcode = argv.z || "21043";

// set up express server
const app = express();

// set up middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/weatherpage.html");
});

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
