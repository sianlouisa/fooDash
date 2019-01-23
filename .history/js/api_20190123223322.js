import * as firebase from '@firebase';
import { firebaseConfig } from '../config';
import '@firebase/firestore';

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

export const signup = async (email, password) => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
  return user.uid;
};

export const signin = async (email, password) => {
  const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
  return user.uid;
};

export const addUser = async (uid, playerName) => {
  await db.collection('players').add({
    uid,
    playerName,
    score: 0
  });
  return uid;
};

export const updateScore = async (uid, score) => {
  await db.collection('players').doc(uid).update({
    score
  });
};
