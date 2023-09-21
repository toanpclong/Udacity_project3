// Setup empty JS object to act as endpoint for all routes
let projectData = [];
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("web"));
//port Express
const port = 8000;
// Spin up the server
app.listen(port, listening);
// Callback to debug
function listening() {
  console.log(`running on localhost: ${port}`);
}
// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", allFunc);
function allFunc(req, res) {
  res.send(projectData);
  console.log("GET ROUTE");
}
// Post Route
app.post("/add", (req, res) => {
  res.send(projectData);
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feel: req.body.feeling,
  };
  console.log("POST ROUTE");
});
