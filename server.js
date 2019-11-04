var express = require('express')
var path = require('path')
var compression = require('compression')
require('isomorphic-fetch')
var city = require('./lib/cityResponse.json')
var weather = require('./lib/weatherResponse.json')
var dbRoutes = require('./dbRoutes')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// send all requests to index.html so browserHistory in React Router works
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Following is an example to proxy client request to DarkSky forecast API
var DARKSKY_SECRET_KEY = process.env.DARKSKY_SECRET_KEY

var darksky_prefix = 'https://api.darksky.net/forecast/'+DARKSKY_SECRET_KEY+'/'
var darksky_excludes = '?exclude=currently,hourly,flags'
app.get('/api/darksky/:lat/:lng/:time', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  if (process.env.NODE_ENV !== 'production') {
    return res.status(200).json(weather)
  }
  try {
    // Retrieves location coordinates (latitude and longitude) from client request query
    var coordinates = req.params.lat+','+req.params.lng+','+req.params.time
    var url = darksky_prefix + coordinates + darksky_excludes;
    console.log('Fetching '+url);

    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          res.status(response.status).json({'message': 'Bad response from Dark Sky server'})
        }
        return response.json()
      })
      .then(function(payload) {
        res.status(200).json(payload)
      })
  } catch(err) {
    console.log('Errors occurs requesting Dark Sky API', err);
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : err})
  }
})

var google_prefix = 'https://maps.googleapis.com/maps/api/geocode/json?address='
app.get('/api/googleapis/maps/:cityState', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  if (process.env.NODE_ENV !== 'production') {
    return res.status(200).json(city)
  }
  try {
    var coordinates = req.params.cityState
    var url = google_prefix + coordinates
    var key = process.env.G_API_KEY
    url = url + '&key=' + key
    console.log('Fetching '+url)

    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
        }
        return response.json();
      })
      .then(function(payload) {
        res.status(200).json(payload);
      });
  } catch(err) {
    console.log('Errors occurs requesting Google Location API', err);
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : err});
  }
})

app.use('/db', dbRoutes);

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.info('Production Express server running at localhost:', PORT)
})