var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format, ObjectID = require('mongodb').ObjectID;
var db = new mongo.Db('scrymgdb', new mongo.Server('localhost', 27017, {}), {safe: true});

db.open(function() {
  console.log("Database online");
});


/**
 * Publish story
 */
app.get('/scrymg/story/publish/:title/:content', function(req, res) {

  db.collection('stories', function(err, collection) {
    if (err) {
      res.jsonp('{"success":false}');
      throw err;
    }

    console.log("Publishing a new story...\n\tTitle: " + req.params.title + "\n\tContent:\n\t" + req.params.content);

    //Infer the content type, so the correct player can be generated later.
    var inferredType = "text";

    if (req.params.content.match(/(\.jpg|\.jpeg|\.png|\.gif)$/) != null) {
      inferredType = "image";
    }

    console.log("Inferred type:\t" + inferredType);

    collection.insert({
      time: Math.round(new Date().getTime() / 1000),
      user: "Anonymous",
      rating: 0,
      type: inferredType,
      title: req.params.title,
      content: req.params.content
    }, function(err, count) {
      if (err) {
        res.jsonp('{"success":false}');
        throw err;
      }

      res.jsonp('{"success":true}');
    });
  });
});

/**
 * Get stories
 */
app.get('/scrymg/story/get/:count/:since', function(req, res) {

  db.collection('stories', function(err, collection) {
    if (err) {
      res.jsonp('[]');
      throw err;
    }

    console.log("Getting the most recent " + req.params.count + " stories since " + req.params.since + "...");

    collection.find({time : {$gt: parseInt(req.params.since)}}, {}, function (err, cursor) {
      if (err) {
        res.jsonp('[]');
        throw err;
      }

      var lowestLimit = Math.min(parseInt(req.params.count), 128);
      cursor.limit(lowestLimit);
      cursor.sort({time: -1});

      cursor.toArray(function(err, documents) {
        res.jsonp(documents);
      });
    });
  });
});




app.listen(5555);
console.log("scrymg server listening on 5555");
