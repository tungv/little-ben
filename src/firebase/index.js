import firebase from 'firebase';
export { default as reducer } from './state/reducer';
import type {
  FirebaseConfigType,
  FirebaseAppType,
  FirebaseAuthProviderType,
  FirebaseUserType,
} from './types';

const getProvider = () : FirebaseAuthProviderType
  => new firebase.auth.FacebookAuthProvider();

export const authenticate = async (app: FirebaseAppType): FirebaseAppType => {
  const auth = app.auth();
  if (auth.currentUser) {
    return app;
  }

  try {
    const result = await auth.getRedirectResult();
    const user : FirebaseUserType = result.user;

    if (!user) {
      // not logged in yet
      app.auth().signInWithRedirect(getProvider());
    }
  } catch (error) {
    const { code, message, credential, email } = error;
    console.error('cannot authenticate', { code, message, credential, email }); // eslint-disable-line
  }
  return app;
};

export default (firebaseConfig: FirebaseConfigType) : Promise<FirebaseAppType> => {
  const app = firebase.initializeApp(firebaseConfig);
  return new Promise(resolve => {
    app.auth().onAuthStateChanged(() => {
      resolve(app);
    });
  });
};
