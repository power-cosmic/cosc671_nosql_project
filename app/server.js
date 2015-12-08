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

app.route('/zips/').get(function(req, res) {
  res.render('pages/zips', {
    variables: []
  });
});

app.route('/zips/:city').get(function(req, res) {
  res.render('pages/zips', {
    variables: req.zips
  })
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
