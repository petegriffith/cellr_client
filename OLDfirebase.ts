import firebase from 'firebase/compat/app'


const firebaseConfig = {
  apiKey: 'AIzaSyDahRII2uxKg4o3hc0524mvm8v2beFAOr8',
  authDomain: 'cellr-ad49e.firebaseapp.com',
  projectId: 'cellr-ad49e',
  storageBucket: 'cellr-ad49e.appspot.com',
  messagingSenderId: '973177731278',
  appId: '1:973177731278:web:3db5f7898d922bc660389f',
  measurementId: 'G-8PS2PKDQ7F',
};

firebase.initializeApp(firebaseConfig);

export default firebase