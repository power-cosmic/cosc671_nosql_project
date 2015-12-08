var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    MongoClient = require('mongodb').MongoClient,
    db = 'mongodb://localhost/test',
    port = 8080

    rests = require('./controllers/rest.controller'),
    zips = require('./controllers/zip.controller');

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

app.route('/populations/').get(function(req, res) {
  zips.getStatePopulations(function(states) {
    res.render('pages/output', {
      variables: states
    })
  })
});

app.param('restName', function(req, res, next, name) {
  rests.byName(name, function(restaurants) {
    req.restaurants = restaurants;
    next();
  });
});

app.param('city', function(req, res, next, city) {
  zips.findByCity(city, function(zips) {
    req.zips = zips;
    next();
  });
});

app.use(express.static('./public'));

app.listen(port);
console.log('listening on port ' + port);
