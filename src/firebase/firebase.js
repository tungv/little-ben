import firebase from 'firebase';

type FirebaseConfigType = {
  apiKey: string,
  authDomain: string,
  databaseURL: string,
};

export type FirebaseAppType = {
  name: string,
  auth: Function,
  database: Function,
  delete: Function,
};

export type FirebaseUserType = any;

export default function initFirebase(
  firebaseConfig: FirebaseConfigType,
  appName: string
) : FirebaseAppType {
  const app = firebase.initializeApp(firebaseConfig, appName);
  return app;
}

export async function auth() : ?FirebaseUserType {
  try {
    const result = await firebase.auth();
    const { credential: { accessToken }, user } = result;
    console.log('accessToken', accessToken);
    console.log('user', user);
    return user;
  } catch (error) {
    const { code, message, credential, email } = error;
    console.error('cannot authenticate', { code, message, credential, email });
    return null;
  }
}
