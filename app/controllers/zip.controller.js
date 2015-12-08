var MongoClient = require('mongodb').MongoClient,
    db = 'mongodb://localhost/test';

exports.findByCity = function(city, callback) {
  MongoClient.connect(db, function(err, db) {
    db.collection('zips').find({
      city: city.toUpperCase()
    }, function(err, cursor) {
      var zips = [];
      cursor.each(function(err, zip) {
        if (zip) {
          zips.push(zip);
        } else {
          db.close();
          callback(zips);
        }
      })
    });
  });
};

exports.getStatePopulations = function(callback) {
  MongoClient.connect(db, function(err, db) {
    db.collection('zips').aggregate([
      { $group: {
        _id: '$state',
        pop: { $sum: '$pop' }
      }},
      { $sort: { _id: 1 }}
    ]).toArray(function(err, result) {
      callback(result);
   });
  });
};
