import { Platform } from 'react-native';
import * as firebaseiOS from 'firebase';
import firebase from 'firebase/app';
import { firebaseConfig } from '../config';
import '@firebase/firestore';

if (Platform.OS === 'ios') {
  firebaseiOS.initializeApp(firebaseConfig);
} else { firebase.initializeApp(firebaseConfig); }

const db = Platform.OS === 'ios' ? firebaseiOS.firestore() : firebase.firestore();

export const signup = async (email, password) => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
  return user.uid;
};

export const signin = async (email, password) => {
  const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
  return user.uid;
};

export const addUser = async (uid, playerName) => {
  await db.collection('players').doc(uid).set({
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

export const getPlayersScores = async () => {
  const snapshot = await db.collection('players').orderBy('score', 'desc').limit(10).get();
  return snapshot;
};

export const getPlayersUsernames = async () => {
  const snapshot = await db.collection('players').get();
  return snapshot;
};

export const getUserDetails = async (uid) => {
  const doc = await db.collection('players').doc(uid).get();
  const { playerName, score } = doc.data();
  return { uid, username: playerName, score };
};
