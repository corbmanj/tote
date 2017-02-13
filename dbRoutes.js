var router = require('express').Router();

//db connection
var pg = require('pg')
var client = new pg.Client(process.env.DB_URL || 'postgres://localhost:5432/tote_local');
client.connect(function (err, client) {
  if (err) throw err;
  console.log('connected to postgres! Getting schemas...');
});

router.get('/users', function(req, res) {
  result = []
  client.query('SELECT * from users;')
    .on('row', function (row) {
      result.push(row)
    })
    .on('end', function (){
      res.json(result)
    });
});

router.get('/user/:email/:password', function(req, res) {
  result = []
  client.query("SELECT * from users WHERE email = '" + req.params.email + "' AND password = '" + req.params.password + "';")
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      result.push(row)
    })
    .on('end', function (){
      res.json(result)
    });
});

router.get('/userItems/:userid', function(req, res) {
  var result = {outfits: [], additionalItems: []}
  client.query("SELECT outfit from outfit_types_json WHERE user_id = '" + req.params.userid + "';")
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      result.outfits.push(row.outfit)
    })
    .on('end', function (){
      client.query("SELECT list from additional_items_json WHERE user_id = '" + req.params.userid + "';")
        .on('error', function (err) {
          res.json(err)
        })
        .on('row', function (row) {
          result.additionalItems.push(row.list)
        })
        .on('end', function (){
          res.json(result)
        })
    });
});

router.get('/additionalItems/:userid', function(req, res) {
  result = []
  client.query("SELECT list from additional_items_json WHERE user_id = '" + req.params.userid + "';")
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      result.push(row.list)
    })
    .on('end', function (){
      res.json(result)
    });
});

// get all saved totes for a user
router.get('/tote/getTrips/:userid', function(req, res) {
  result = []
  console.log('getting user trips')
  client.query(`SELECT trip from saved_trips_json WHERE user_id=${req.params.userid};`)
    .on('error', function (err) {
      console.log('errrrror', err)
      res.json(err)
    })
    .on('row', function (row) {
      result.push(row.trip)
    })
    .on('end', function (){
      res.json(result)
    });
});

// initialize a new trip (saved tote)
router.post('/tote/newTrip/:userid', function(req, res) {
  result = []
  var query = "INSERT into saved_trips_json (user_id) VALUES (" + req.params.userid + ") returning id;"
  client.query(query)
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.send(row)
    });
});

// update a saved tote
router.post('/tote/updateTrip/:id', function(req, res) {
  result = []
  var query =  `UPDATE saved_trips_json SET trip='${JSON.stringify(req.body)}' WHERE id=${req.params.id} returning id;`
  client.query(query)
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.send(row)
    });
});

module.exports = router;