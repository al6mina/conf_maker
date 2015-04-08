var appData = require('./package.json');
var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var React = require('react');
var app = express();

var port = 8080;
var env = process.env.NODE_ENV || 'development';

//This is for pre rendering jsx to index.html
require("node-jsx").install();
var data = {
  location: require('./app/locales/en/location.json'),
  speakers: require('./app/locales/en/speakers.json'),
  partners: require('./app/locales/en/partners.json'),
  schedule: require('./app/locales/en/schedule.json'),
  registration: require('./app/locales/en/registration.json'),
  overview: require('./app/locales/en/mainInfo.json'),
  footer: require('./app/locales/en/footer.json')
}

var outHtml = React.renderToString(React.createElement(require('./app/scripts/preRender.jsx').App, data));

var appEnvData = {
  version: appData.version,
  env: env,
  head_commit: "null",
  reactOutput: outHtml
}

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res){
  res.render('index', appEnvData);
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.status(404).send("Sorry this page does not exist!");
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
