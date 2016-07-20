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

export type FirebaseAuthProviderType = any;

export type FirebaseUserType = any;

const getProvider = () : FirebaseAuthProviderType
  => new firebase.auth.FacebookAuthProvider();

const redirect = (app: FirebaseAppType) : void => app.auth().signInWithRedirect(getProvider());

const auth = async (app: FirebaseAppType): ?FirebaseUserType => {
  try {
    const result = await app.auth().getRedirectResult();
    const { user } = result;
    if (!user) {
      // not logged in yet
      redirect(app);
    }
    return user;
  } catch (error) {
    const { code, message, credential, email } = error;
    console.error('cannot authenticate', { code, message, credential, email }); // eslint-disable-line
    return null;
  }
};


export default async function initFirebase(
  firebaseConfig: FirebaseConfigType,
  appName: string
) : { user: FirebaseUserType } {
  const app : FirebaseAppType = firebase.initializeApp(firebaseConfig, appName);
  const user = await auth(app);

  return { user };
}
