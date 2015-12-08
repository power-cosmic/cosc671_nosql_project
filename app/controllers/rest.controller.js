var MongoClient = require('mongodb').MongoClient,
    db = 'mongodb://localhost/test';

exports.byName = function(name, callback) {
  MongoClient.connect(db, function(err, db) {
    db.collection('rest').find({name: name}, function (err, cursor) {
      var restaurants = [];
      cursor.each(function(err, restaurant) {
        if (restaurant) {
          restaurants.push(restaurant);
        } else {
          db.close();
          callback(restaurants);
        }
      })
    });

  });
};
