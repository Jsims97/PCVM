import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqmp6fXu_uT-PlGRtdCPdqHcHw0o7dKBc",
  authDomain: "pro-cutters-mechanic-app.firebaseapp.com",
  databaseURL: "https://pro-cutters-mechanic-app-default-rtdb.firebaseio.com",
  projectId: "pro-cutters-mechanic-app",
  storageBucket: "pro-cutters-mechanic-app.appspot.com",
  messagingSenderId: "700451622884",
  appId: "1:700451622884:web:d50fdc54a4e93ad40941f1",
  measurementId: "G-YW1VJP9CH0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);