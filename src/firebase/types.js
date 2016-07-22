export type FirebaseConfigType = {
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
