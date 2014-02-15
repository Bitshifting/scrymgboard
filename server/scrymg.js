var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format, ObjectID = require('mongodb').ObjectID;
var db = new mongo.Db('scrymgdb', new mongo.Server('localhost', 27017, {}), {safe: true});


/**
 * Publish story
 */
app.get('/scrymg/story/publish/:title/:content', function(req, res) {
//  res.header("Content-Type", "application/json");

  db.open(function() {
    db.collection('stories', function(err, collection) {
      if (err) {
        res.jsonp('{"success":false}');
        db.close();
        throw err;
      }

      console.log("Publishing a new story...\n\tTitle: " + req.params.title + "\n\tType: " + req.params.type + "\n\tContent:\n\t" + req.params.content);

      //TODO: Infer the content type, so the correct player can be generated later.
      var inferredType = "text";

      collection.insert({
        time: Math.round(new Date().getTime() / 1000),
        user: "Anonymous",
        rating: 0,
        type: inferredType,
        title: req.params.title,
        content: req.params.content
      }, function(err, count) {
        if (err) {
          res.jsonp('{"success":true}');
          db.close();
          throw err;
        }

        res.jsonp('{"success":true}');
        db.close();
      });
    });
  });
});

/**
 * Get stories
 */
app.get('/scrymg/story/get/:count/:since', function(req, res) {
  //res.header("Content-Type", "application/json");

  db.open(function() {
    db.collection('stories', function(err, collection) {
      if (err) {
        res.jsonp('[]');
        db.close();
        throw err;
      }

      console.log("Getting the most recent " + req.params.count + " stories since " + req.params.since + "...");

      collection.find({time : {$gt: parseInt(req.params.since)}}, {}, function (err, cursor) {
        if (err) {
          res.jsonp('[]');
          db.close();
          throw err;
        }

        var lowestLimit = Math.min(parseInt(req.params.count), 128);
        cursor.limit(lowestLimit);
        cursor.sort({time: -1});

        cursor.toArray(function(err, documents) {
          res.jsonp(documents);
          db.close();
        });
      });
    });
  });
});



app.listen(5555);
console.log("scrymg server listening on 5555");
