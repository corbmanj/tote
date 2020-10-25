var router = require('express').Router();

//db connection
var pg = require('pg')

config = {
  user: process.env.RDS_USERNAME,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
  // connectionString?: string, // e.g. postgres://user:password@host:5432/database
  // ssl?: any, // passed directly to node.TLSSocket, supports all tls.connect options
  // types?: any, // custom type parsers
  // statement_timeout?: number, // number of milliseconds before a statement in query will time out, default is no timeout
  // query_timeout?: number, // number of milliseconds before a query call will timeout, default is no timeout
  // connectionTimeoutMillis?: number, // number of milliseconds to wait for connection, default is no timeout
}
// 
let client = new pg.Client('postgres://localhost:5432/tote_local');
// if (process.env.NODE_ENV === 'production') {
//   client = new pg.Client({
//     user: process.env.RDS_USERNAME,
//     host: process.env.RDS_HOSTNAME,
//     database: process.env.RDS_DB_NAME,
//     password: process.env.RDS_PASSWORD,
//     port: process.env.RDS_PORT,
//   })
// }
// var client = new pg.Client(process.env.TOTE_DB_URL || 'postgres://localhost:5432/tote_local');
client.connect(function (err) {
  if (err) throw err;
  console.log('connected to postgres! Getting schemas...');
});

router.get('/users', function(req, response) {
  client.query('SELECT * from users;')
    .then(result => {
      response.json(result.rows)
    })
});

router.get('/user/:email', function(req, response) {
  client.query('SELECT * from users WHERE email = \'' + req.params.email + '\';')
    .then(result => {
      response.json(result.rows[0])
    })
});

router.get('/userItems/:userid', function(req, response) {
  var ret = {}
  client.query(`
    SELECT id, outfit
    FROM outfit_types_json
    WHERE user_id = $1;
  `, [req.params.userid])
    .then(outfits => {
      ret.outfits = outfits.rows.map(row => ({
        id: row.id,
        type: row.outfit.type,
        items: row.outfit.items
      }))
      client.query(`
        SELECT id, list
        FROM additional_items_json
        WHERE user_id = $1;
      `, [req.params.userid])
      .then(additionalItems => {
        ret.additionalItems = additionalItems.rows.map(row => ({
          id: row.id,
          name: row.list.name,
          items: row.list.items
        }))
        response.json(ret)
      })
    })
});

// add an outfit type for the logged in user
router.post('/addOutfit/:userid', function(req, response) {
  client.query(`
    INSERT INTO outfit_types_json (outfit, user_id) 
    VALUES($1, $2)
    returning id;`,
    [JSON.stringify(req.body), req.params.userid]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

// delete an outfit type for the logged in user
router.delete('/deleteOutfit/:userid/:outfitid', function(req, response) {
  client.query(`
    DELETE FROM outfit_types_json 
    WHERE user_id = $1 and id = $2
    returning id;`,
    [req.params.userid, req.params.outfitid]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

// save or update an outfit type for the logged in user
router.put('/userItems/:userid/:outfitid', function(req, response) {
  client.query(`
    INSERT INTO outfit_types_json (id, outfit, user_id) VALUES($1, $2, $3)
    ON CONFLICT (id) DO UPDATE
    SET outfit = $2, user_id = $3
    returning id;`,
    [req.params.outfitid, JSON.stringify(req.body), req.params.userid]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

// get list of additional items for the logged in user
router.get('/additionalItems/:userid', function(req, response) {
  client.query(`
    SELECT id, list 
    FROM additional_items_json 
    WHERE user_id = $1;`,
    [req.params.userid]
  )
    .then(result => {
      response.json(result.rows.map(row => ({ id: row.id, list: row.list })))
    })
});

// add an additional item section for the logged in user
router.post('/additionalItems/:userid', function(req, response) {
  client.query(`
    INSERT INTO additional_items_json (user_id, list)
    VALUES ($1, $2)
    RETURNING id;`,
    [req.params.userid, JSON.stringify(req.body)]
  )
    .then(result => {
      response.json(result.rows.map(row => ({ id: row.id, list: row.list })))
    })
});

// update an additional item section for the logged in user
router.put('/updateAdditionalItems/:userid/:listid', function(req, response) {
  client.query(`
    UPDATE additional_items_json SET list=$1
    WHERE id=$2
    AND user_id=$3
    returning id;`,
    [JSON.stringify(req.body), req.params.listid, req.params.userid]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

// get all saved totes for a user
router.get('/tote/getTrips/:userid', function(req, response) {
  client.query(`
    SELECT trip
    FROM saved_trips_json
    WHERE user_id=$1;`,
    [req.params.userid]
  )
    .then(result => {
      response.json(result.rows.map(row => row.trip))
    })
});

// get a saved tote for a user by id
router.get('/tote/getTrip/:userid/:tripId', function(req, response) {
  client.query(`
    SELECT trip
    FROM saved_trips_json
    WHERE user_id=$1
    AND id=$2;`,
    [req.params.userid, req.params.tripId]
  )
    .then(result => {
      response.json(result.rows.map(row => row.trip))
    })
});

// initialize a new trip (saved tote)
router.post('/tote/newTrip/:userid', function(req, response) {
  client.query(`
    INSERT into saved_trips_json (user_id) 
    VALUES ($1)
    returning id;`,
    [req.params.userid]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

// update a saved tote
router.post('/tote/updateTrip/:id', function(req, response) {
  client.query(`
    UPDATE saved_trips_json
    SET trip=$1
    WHERE id=$2
    returning id;`,
    [JSON.stringify(req.body), req.params.id]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

router.delete('/tote/deleteTrip/:id', function(req, response) { 
  client.query(`
    DELETE FROM saved_trips_json
    WHERE id=$1
    returning id;`,
    [req.params.id]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

// delete an additional item section
router.delete('/deleteAdditionalItemSection/:user_id/:id', function(req, response) {
  client.query(`
    DELETE FROM additional_items_json
    WHERE user_id=$1
    AND id=$2
    returning id;`,
    [req.params.user_id, req.params.id]
  )
    .then(result => {
      response.json(result.rows[0])
    })
});

module.exports = router;