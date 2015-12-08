var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    MongoClient = require('mongodb').MongoClient,
    db = 'mongodb://localhost/test',
    port = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extendex: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev'));

app.route('/rest/').get(function(req, res) {
  res.render('pages/output', {
    variables: []
  });
});

app.route('/rest/:restName').get(function(req, res) {
  res.render('pages/output', {
    variables: req.restaurants
  })
});

app.route('/zips/').get(function(req, res) {
  res.render('pages/output', {
    variables: []
  });
});

app.route('/zips/:city').get(function(req, res) {
  res.render('pages/output', {
    variables: req.zips
  })
});


app.param('restName', function(req, res, next, name) {
  MongoClient.connect(db, function(err, db) {
    db.collection('rest').find({name: name}, function (err, cursor) {
      var restaurants = [];
      cursor.each(function(err, restaurant) {
        if (restaurant) {
          restaurants.push(restaurant);
        } else {
          db.close();
          req.restaurants = restaurants;
          next();
        }
      })
    });

  });
});

app.param('city', function(req, res, next, city) {
  MongoClient.connect(db, function(err, db) {
    db.collection('zips').find({city: city.toUpperCase()}, function(err, cursor) {
      var zips = [];
      cursor.each(function(err, zip) {
        if (zip) {
          zips.push(zip);
        } else {
          db.close();
          req.zips = zips;
          next();
        }
      })
    });
  });
});

app.use(express.static('./public'));

app.listen(port);
console.log('listening on port ' + port);
