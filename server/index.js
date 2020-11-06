const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = 9000;
const app = express();
const db = require('../database/index.js');
const mysql = require('../database/mysql.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

// <----- Users RESTful Api Routes ----->
app.get('/users', (req, res) => {
  mysql.query(`SELECT * FROM users`, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  })
  // db.collection('users').get()
  //   .then(snapshot => {
  //     let snapshotARR = [];
  //     snapshot.docs.forEach(doc => {
  //       snapshotARR.push(doc.data());
  //     })
  //     res.status(200).json(snapshotARR);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //     process.exit();
  //   })
})

app.post('/users', (req, res) => {

  let data = {
    aboutMe: `${req.body.aboutMe}`,
    email: `${req.body.email}`,
    name: `${req.body.name}`,
    onlineStatus: `${req.body.onlineStatus}`,
    password: `${req.body.password}`,
    userType: `${req.body.userType}`,
    profilePicture: `${req.body.profilePicture}`,
    region: `${req.body.region}`,
    userName: `${req.body.userName}`
  }

  db.collection('users')
    .doc()
    .set(data)
    .then(() => {
      console.log('data written to firebase firestore!')
      res.status(200).send('SUCCESSFUL POST');
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

app.delete('/users/:id', (req, res) => {
  db.collection('users')
    .doc(req.params.id)
    .delete()
    .then(() => {
      console.log('data deleted from firebase firestore!')
      res.status(200).send('SUCCESSFUL DELETE');
    })
    .catch(err => {
      res.status(400).send(err);
    })
})


// <----- Games RESTful Api Routes ----->
app.get('/games', (req, res) => {
  mysql.query(`SELECT gameName FROM games WHERE gameName LIKE '${req.query.search}%' LIMIT 10;`, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  })
  // db.collection('games').get()
  //   .then(snapshot => {
  //     let snapshotARR = [];
  //     snapshot.docs.forEach(doc => {
  //       snapshotARR.push(doc.data());
  //     })
  //     res.status(200).json(snapshotARR);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //     process.exit();
  //   })
})

var unirest = require("unirest");

const randomNumber = (number) => {
  return Math.floor(Math.random() * Math.floor(number));
};

app.get('/gamesApi', (req, res) => {
  var apiReq = unirest("GET", `https://rapidapi.p.rapidapi.com/developers/${randomNumber(5000) + 1}`);

  apiReq.headers({
    "x-rapidapi-key": "953cbfac59mshb4aee5d81428765p14ec02jsna109d3230bdb",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "useQueryString": true
  });

  apiReq.end(function (apiRes) {
    if (apiRes.error)  {
      res.status(400).send(err);
      throw new Error(apiRes.error);
    } else {
      res.status(200).json(apiRes)
    }
  });
})

app.listen(port, () => console.log(`listening on port #${port}`))
