import * as firebase from 'firebase';
import { firebaseConfig } from '../config'

firebase.initializeApp(firebaseConfig)

export const signup = async (email, password) => {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user
}