import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
// import "firebase/messaging";
// import "firebase/functions";

const config = {
  apiKey: 'AIzaSyBqrWUrEcDOEl3vfBeHu6YJOW0fgYyL9SE',
  authDomain: 'consumable-5d7ab.firebaseapp.com',
  databaseURL: 'https://consumable-5d7ab.firebaseio.com',
  projectId: 'consumable-5d7ab',
  // storageBucket: 'consumable-5d7ab.appspot.com',
  // messagingSenderId: '604648436842',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
db.enablePersistence();

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

// general helpers
export const parseModel = obj => Object.entries(obj).reduce((o, [key, value]) => {
  if (value === undefined) return o;

  let parsedValue = value;
  if (typeof parsedValue.toDate === 'function') parsedValue = parsedValue.toDate();
  if (typeof parsedValue.toJSDate === 'function') parsedValue = parsedValue.toJSDate();

  return { ...o, [key]: parsedValue };
}, []);

export const saveToFirebase = async (collectionName, modelState) => {
  const { id, ...data } = parseModel(modelState);

  // we require an id to save or create
  if (!id) throw new Error(`No ID provided, unable to save to ${collectionName}.`);

  return db.collection(collectionName).doc(id).set(data, { merge: true });
};
