const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use("/app", express.static(__dirname + "/app"))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/app/index.html'))
})

app.get('/get-profile', function(req, res) {
  const response = res
  MongoClient.connect('mongodb://admin:password@mongoDb', function(err, client) {
    const db = client.db('user-account')
    const query = { userid : 1 }
    db.collection('users').findOne(query, function(err, result) {
      if (err) throw err;
      client.close() // ferme les connection à la db
      response.send(result)
    })
  })
})
app.post('/update-profile', function(req, res){
  const response = res
  const userObj = req.body

  console.log('connection to mongo ...')

  MongoClient.connect('mongodb://admin:password@localhost:27017', function (err, client) {
    if (err) {
      throw err;
    };
    const db = client.db('user-account')
    userObj['userid'] = 1
    const newValues = { $set : userObj }
    const query = { userid : 1 }
    db.collection('users').updateOne(query, newValues, { upsert: true }, function(err, result) {
      if (err) throw err;
      console.log('updated correctly')
    })
    db.collection('users').findOne({ userid: 1}, function(err, result) {
      client.close()
      res.send(result)
    })
  })
})

app.get('/profile-picture', function(req, res){
  const img = fs.readFileSync('app/profile-1.jpg')
  res.writeHead(200, {'Content-type':'image/jpg'})
  res.end(img,'binary')
})

app.listen(3000, function(){
  console.log('app listening to port 3000')
})