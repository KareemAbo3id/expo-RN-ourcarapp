// firebase confige kay setup:

import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// firebase web app configs:
const firebaseConfig = {
  apiKey: 'AIzaSyDL5HC_c7cs1oqueeOFJOERKUlcFRT4r98',
  authDomain: 'our-car-app-edf68.firebaseapp.com',
  projectId: 'our-car-app-edf68',
  storageBucket: 'our-car-app-edf68.appspot.com',
  messagingSenderId: '193169070839',
  appId: '1:193169070839:web:d167161a5f2143956351f2',
};

const app = firebase.initializeApp(firebaseConfig);

export { app, firebase };
