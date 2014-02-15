var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format, ObjectID = require('mongodb').ObjectID;
var db = new mongo.Db('scrymgdb', new mongo.Server('localhost', 27017, {}), {safe: true});

/**
 * Publish story
 */
app.get('/scrymg/story/publish/:type/:title/:content', function(req, res) {
  res.header("Content-Type", "application/json");

  db.open(function() {
    db.collection('stories', function(err, collection) {
      if (err) {
        res.end('{"success":false}');
        throw err;
      }

      console.log("Publishing a new story...\n\tTitle: " + req.params.title + "\n\tType: " + req.params.type + "\n\tContent:\n\t" + req.params.content);
      res.end('{"success":true}');
    });
  });
});

app.listen(5555);
console.log("scrymg server listening on 5555");
