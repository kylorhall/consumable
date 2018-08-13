import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
// import "firebase/firestore");
// import "firebase/messaging");
// import "firebase/functions");

const config = {
  apiKey: 'AIzaSyBqrWUrEcDOEl3vfBeHu6YJOW0fgYyL9SE',
  authDomain: 'consumable-5d7ab.firebaseapp.com',
  databaseURL: 'https://consumable-5d7ab.firebaseio.com',
  projectId: 'consumable-5d7ab',
  storageBucket: 'consumable-5d7ab.appspot.com',
  messagingSenderId: '604648436842',
};

firebase.initializeApp(config);

export default {
  auth: firebase.auth(),
  GoogleAuthProvider: new firebase.auth.GoogleAuthProvider(),
};
