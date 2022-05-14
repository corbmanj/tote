var router = require('express').Router();

//db connection
var pg = require('pg');
const { getTrip, saveTrip } = require('./dbFunctions');

const config = {
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
const dburl = process.env.TOTE_DB_URL || 'postgres://localhost:5432/tote_local';

let client = process.env.NODE_ENV === 'production' ? new pg.Client({
  connectionString: dburl,
  ssl: { rejectUnauthorized: false }
}) : new pg.Client({ connectionString: dburl })
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

router.get('/users', async function (_req, response) {
  const result = await client.query('SELECT * from users;')
  response.json(result.rows)
});

router.get('/user/:email', async function (req, response) {
  const result = await client.query(`SELECT * from users WHERE email = '${req.params.email}';`)
  response.json(result.rows[0])
});

router.get('/userItems/:userid', async function (req, response) {
  var ret = {}
  const outfits = await client.query(`
    SELECT id, outfit, type
    FROM outfit_types
    WHERE user_id = $1;
  `,
    [req.params.userid]
  )

  ret.outfits = outfits.rows.map(row => ({
    id: row.id,
    type: row.type,
    items: row.outfit
  }))

  const additionalItems = await client.query(`
        SELECT id, items, name
        FROM additional_items
        WHERE user_id = $1;
      `,
    [req.params.userid]
  )
  ret.additionalItems = additionalItems.rows.map(row => ({
    id: row.id,
    name: row.name,
    items: row.items
  }))
  response.json(ret)
});

// add an outfit type for the logged in user
router.post('/addOutfit/:userid', async function (req, response) {
  const result = await client.query(`
    INSERT INTO outfit_types (outfit, type, user_id) 
    VALUES($1, $2, $3)
    returning id;`,
    [JSON.stringify(req.body.outfit), req.body.type, req.params.userid]
  )
  response.json(result.rows[0])
});

// delete an outfit type for the logged in user
router.delete('/deleteOutfit/:userid/:outfitid', async function (req, response) {
  const result = await client.query(`
    DELETE FROM outfit_types
    WHERE user_id = $1 and id = $2
    returning id;`,
    [req.params.userid, req.params.outfitid]
  )
  response.json(result.rows[0])
});

// save or update an outfit type for the logged in user
router.put('/userItems/:userid/:outfitid', async function (req, response) {
  const result = await client.query(`
    INSERT INTO outfit_types (id, outfit, user_id, type) VALUES($1, $2, $3, $4)
    ON CONFLICT (id) DO UPDATE
    SET outfit = $2, user_id = $3, type = $4
    returning id;`,
    [req.params.outfitid, JSON.stringify(req.body.outfit), req.params.userid, req.body.type]
  )
  response.json(result.rows[0])
});

// get list of additional items for the logged in user
router.get('/additionalItems/:userid', async function (req, response) {
  const result = await client.query(`
    SELECT id, list 
    FROM additional_items 
    WHERE user_id = $1;`,
    [req.params.userid]
  )
  response.json(result.rows.map(row => ({ id: row.id, list: row.items, name: row.name })))
});

// add an additional item section for the logged in user
router.post('/additionalItems/:userid', async function (req, response) {
  const result = await client.query(`
    INSERT INTO additional_items (user_id, items, name)
    VALUES ($1, $2, $3)
    RETURNING id;`,
    [req.params.userid, JSON.stringify(req.body.items), req.body.name]
  )
  response.json(result.rows.map(row => ({ id: row.id, list: row.list })))
});

// update an additional item section for the logged in user
router.put('/updateAdditionalItems/:userid/:listid', async function (req, response) {
  const result = await client.query(`
    UPDATE additional_items SET list=$1, name=$2
    WHERE id=$3
    AND user_id=$4
    returning id;`,
    [JSON.stringify(req.body.items), req.body.name, req.params.listid, req.params.userid]
  )
  response.json(result.rows[0])
});

// get all saved totes for a user
router.get('/tote/getTrips/:userid', async function (req, response) {
  const result = await client.query(`
    SELECT id, start_date, end_date, location
    FROM trips
    WHERE user_id=$1;`,
    [req.params.userid]
  )
  response.json(result.rows.map(row => {
    const { id, start_date: start, end_date: end, location } = row
    return { id, start, end, location }
  }))
});

// get a saved tote for a user by id
router.get('/tote/getTrip/:tripId', async function (req, response) {
  const result = await getTrip(client, req.params.tripId)
  response.json(result)
});

// initialize a new trip (saved tote)
router.post('/tote/newTrip/:userid', async function (req, response) {
  const result = await client.query(`
    INSERT into trips (user_id) 
    VALUES ($1)
    returning id;`,
    [req.params.userid]
  )
  response.json(result.rows[0])
});

// update a saved tote
router.post('/tote/updateTrip/:id', async function (req, response) {
  await saveTrip(client, req.body, req.params.id)
  response.json(await getTrip(client, req.params.id));
});

router.delete('/tote/deleteTrip/:id', async function (req, response) {
  const result = await client.query(`
    DELETE FROM trips
    WHERE id=$1
    returning id;`,
    [req.params.id]
  )
  response.json(result.rows[0])
});

router.delete('tote/deleteTripOutfit/:tripId/:outfitId', async function (req, response) {
  await client.query(`
    DELETE FROM outfits
    WHERE id=$1;`, [req.params.outfitId]
  )
  response.json(await getTrip(client, req.params.tripId));
})

// delete an additional item section
router.delete('/deleteAdditionalItemSection/:user_id/:id', async function (req, response) {
  const result = await client.query(`
    DELETE FROM additional_items
    WHERE user_id=$1
    AND id=$2
    returning id;`,
    [req.params.user_id, req.params.id]
  )
  response.json(result.rows[0])
});

module.exports = router;