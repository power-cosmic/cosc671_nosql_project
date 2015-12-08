var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    MongoClient = require('mongodb').MongoClient,
    db = 'mongodb://localhost/test',
    port = 8080

    restRoutes = require('./routes/rest.routes'),
    zipRoutes = require('./routes/zip.routes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extendex: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev'));

require('./routes/rest.routes')(app);
require('./routes/zip.routes')(app);

app.use(express.static('./public'));

app.listen(port);
console.log('listening on port ' + port);
