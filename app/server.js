var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extendex: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev'));

app.route('/')
  .get(function(req, res) {
    res.render('pages/test', {
      variables: [{a:1, b:[2, 3]}, [2, 3]],
      backup: [  'hello',
        {
          name: 'test',
          values: [
            1,
            {
              a: 'aa',
              b: 'bb'
            }
          ]
        }
      ]
    });
  });

app.use(express.static('./public'));

app.listen(port);
console.log('listening on port ' + port);
