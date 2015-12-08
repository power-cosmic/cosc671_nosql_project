var rests = require('../controllers/rest.controller');

module.exports = function(app) {
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



  app.param('restName', function(req, res, next, name) {
    rests.byName(name, function(restaurants) {
      req.restaurants = restaurants;
      next();
    });
  });
};
