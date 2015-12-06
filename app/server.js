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

app.listen(port);
console.log('listening on port ' + port);
