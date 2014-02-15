var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format, ObjectID = require('mongodb').ObjectID;
var db = new mongo.Db('scrymgdb', new mongo.Server('localhost', 27017, {}), {safe: true});


/**
 * Publish story
 */
app.get('/scrymg/story/publish/:title/:content', function(req, res) {
  res.header("Content-Type", "application/json");

  db.open(function() {
    db.collection('stories', function(err, collection) {
      if (err) {
        res.end('{"success":false}');
        db.close();
        throw err;
      }

      console.log("Publishing a new story...\n\tTitle: " + req.params.title + "\n\tType: " + req.params.type + "\n\tContent:\n\t" + req.params.content);

      //TODO: Infer the content type, so the correct player can be generated later.

      collection.insert({
        time: Math.round(new Date().getTime() / 1000),
        user: "Anonymous",
        rating: 0,
        type: req.params.type,
        title: req.params.title,
        content: req.params.content
      }, function(err, count) {
        if (err) {
          res.end('{"success":true}');
          db.close();
          throw err;
        }

        res.end('{"success":true}');
      });
    });
  });
});

/**
 * Get stories
 */
app.get('/scrymg/story/get/:count', function(req, res) {
  res.header("Content-Type", "application/json");

  db.open(function() {
    db.collection('stories', function(err, collection) {
      if (err) {
        res.end('[]');
        db.close();
        throw err;
      }

      console.log("Getting the most recent " + req.params.count + " stories...");

      collection.find({}, {}, function (err, cursor) {
        if (err) {
          res.end('[]');
          db.close();
          throw err;
        }

        cursor.toArray(function(err, documents) {
          res.end(JSON.stringify(documents));
          db.close();
        });
      });
    });
  });
});



app.listen(5555);
console.log("scrymg server listening on 5555");
