var router = require('express').Router();

//db connection
var pg = require('pg')
// pg.defaults.ssl = true;
var client = new pg.Client(process.env.DB_URL || 'postgres://localhost:5432/tote_local');
client.connect(function (err, client) {
  if (err) throw err;
  console.log('connected to postgres! Getting schemas...');
});

router.get('/users', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
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
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
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
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
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
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  result = []
  client.query("SELECT list from additional_items_json WHERE user_id = '" + req.params.userid + "';")
    .on('error', function (err) {
      res.json(err)
    })
    .on('row', function (row) {
      result.push(row.outfit)
    })
    .on('end', function (){
      res.json(result)
    });
});

module.exports = router;