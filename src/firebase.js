import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || process.env.API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || process.env.AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID || process.env.PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || process.env.MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID || process.env.APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;