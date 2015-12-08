var zips = require('../controllers/zip.controller');

module.exports = function(app) {

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


  app.param('city', function(req, res, next, city) {
    zips.findByCity(city, function(zips) {
      req.zips = zips;
      next();
    });
  });

};
