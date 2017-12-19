var router = require('express').Router();

//db connection
var pg = require('pg')
let client = new pg.Client({
  user: process.env.RDS_USERNAME,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
})
if (process.env.NODE_ENV !== 'production') {
  client = new pg.Client('postgres://localhost:5432/tote_local');
}
// var client = new pg.Client(process.env.TOTE_DB_URL || 'postgres://localhost:5432/tote_local');
client.connect(function (err) {
  if (err) throw err;
  console.log('connected to postgres! Getting schemas...');
});

router.get('/users', function(req, res) {
  var result = []
  client.query('SELECT * from users;')
    .on('row', function (row) {
      result.push(row)
    })
    .on('end', function (){
      res.json(result)
    });
});

router.get('/user/:email/:password', function(req, res) {
  var result = []
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
  client.query("SELECT id, outfit from outfit_types_json WHERE user_id = '" + req.params.userid + "';")
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      row.outfit.id = row.id
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

// add an outfit type for the logged in user
router.post('/addOutfit/:userid', function(req, res) {
  var result
  client.query("INSERT INTO outfit_types_json (outfit, user_id) VALUES($1, $2) \
    returning id;",
    [JSON.stringify(req.body), req.params.userid])
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.json(row)
    });
});

// delete an outfit type for the logged in user
router.delete('/deleteOutfit/:userid/:outfitid', function(req, res) {
  var result
  client.query("DELETE FROM outfit_types_json WHERE user_id = $1 and id = $2\
    returning id;",
    [req.params.userid, req.params.outfitid])
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.json(row)
    });
});

// save or update an outfit type for the logged in user
router.put('/userItems/:userid/:outfitid', function(req, res) {
  var result
  client.query("INSERT INTO outfit_types_json (id, outfit, user_id) VALUES($1, $2, $3) \
    ON CONFLICT (id) DO UPDATE \
    SET outfit = $2, user_id = $3 \
    returning id;",
    [req.params.outfitid, JSON.stringify(req.body), req.params.userid])
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.json(row)
    });
});

router.get('/additionalItems/:userid', function(req, res) {
  var result = []
  client.query("SELECT list from additional_items_json WHERE user_id = '" + req.params.userid + "';")
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

// get all saved totes for a user
router.get('/tote/getTrips/:userid', function(req, res) {
  var result = []
  client.query(`SELECT trip from saved_trips_json WHERE user_id=${req.params.userid};`)
    .on('error', function (err) {
      console.log('error', err)
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
  var query =  `UPDATE saved_trips_json SET trip='${JSON.stringify(req.body)}' WHERE id=${req.params.id} returning id;`
  client.query(query)
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.send(row)
    });
});

router.delete('/tote/deleteTrip/:id', function(req, res) {
  var query =  `DELETE FROM saved_trips_json WHERE id=${req.params.id} returning id;`
  client.query(query)
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      res.send(row)
    });
});

module.exports = router;