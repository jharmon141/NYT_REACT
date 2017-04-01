// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require Click schema
const Article = require("./models/article");

// Create a new express app
const app = express();
// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://admin:nytreact@ds141960.mlab.com:41960/nytsearchdb");
const db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {

  // This GET request will search for the latest clickCount
  Article.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api/saved", function(req, res) {

    console.log(req.body);
    let newArticle = new Article(req.body);

    newArticle.save(function(err, doc) {

        if (error) {
            console.log(error);
        }
        else {
            res.redirect('/');
        }

    });

});

app.delete("/api/saved/:id", function(req, res) {

    Article.findOneAndRemove({
        "_id": req.params.id
    },
        function(err, doc) {

        if (error) {
            console.log(error);
        }
        else {
            console.log(doc);
        }

    });

});
// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
