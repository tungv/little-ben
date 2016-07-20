import firebase from 'firebase';

type FirebaseConfig = {
  apiKey: string,
  authDomain: string,
  databaseURL: string,
};

export default function initFirebase(firebaseConfig: FirebaseConfig) {
  const app = firebase.initializeApp(firebaseConfig);

  return app;
}
