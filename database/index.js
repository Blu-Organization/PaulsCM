var admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gffinder-87f92.firebaseio.com'
});

var db = admin.firestore();

module.exports = db;