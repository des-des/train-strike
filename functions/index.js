const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.countMessages = functions.database.ref('/emails').onWrite(event => {
  return event.data.ref.parent.child('emails_count').set(event.data.numChildren());
});
