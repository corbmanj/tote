var router = require('express').Router();

//db connection
var pg = require('pg')
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
  var result = []
  client.query('SELECT * from users;')
    .then(result => {
      response.json(result.rows)
    })
    // .on('row', function (row) {
    //   result.push(row)
    // })
    // .on('end', function (){
    //   res.json(result)
    // });
});

router.get('/user/:email', function(req, response) {
  var result = []
  client.query("SELECT * from users WHERE email = '" + req.params.email + "';")
    .then(result => {
      response.json(result.rows[0])
    })
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   result.push(row)
    // })
    // .on('end', function (){
    //   res.json(result[0])
    // });
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
        console.log(additionalItems.rows)
        ret.additionalItems = additionalItems.rows.map(row => ({
          id: row.id,
          list: row.list
        }))
        response.json(ret)
      })
    })
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   row.outfit.id = row.id
    //   result.outfits.push(row.outfit)
    // })
    // .on('end', function (){
    //   client.query("SELECT id, list from additional_items_json WHERE user_id = '" + req.params.userid + "';")
    //     .on('error', function (err) {
    //       res.json(err)
    //     })
    //     .on('row', function (row) {
    //       row.list.id = row.id
    //       result.additionalItems.push(row.list)
    //     })
    //     .on('end', function (){
    //       res.json(result)
    //     })
    // });
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
    // .on('error', function (err) {
    //   response.json(err)
    // })
    // .on('row', function (row) {
    //   response.json(row)
    // });
});

// delete an outfit type for the logged in user
router.delete('/deleteOutfit/:userid/:outfitid', function(req, respose) {
  client.query(`
    DELETE FROM outfit_types_json 
    WHERE user_id = $1 and id = $2
    returning id;`,
    [req.params.userid, req.params.outfitid]
  )
    .then(result => {
      response.json(result.rows[0])
    })
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   res.json(row)
    // });
});

// save or update an outfit type for the logged in user
router.put('/userItems/:userid/:outfitid', function(req, respose) {
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
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   res.json(row)
    // });
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
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   result.push(row)
    // })
    // .on('end', function (){
    //   res.json(result)
    // });
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
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   res.json(row)
    // });
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
    // .on('error', function (err) {
    //   console.log('error', err)
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   result.push(row.trip)
    // })
    // .on('end', function (){
    //   res.json(result)
    // });
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
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   res.send(row)
    // });
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
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   res.send(row)
    // });
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
    // .on('error', function (err) {
    //   res.json(err)
    // })
    // .on('row', function (row) {
    //   res.send(row)
    // });
});

module.exports = router;