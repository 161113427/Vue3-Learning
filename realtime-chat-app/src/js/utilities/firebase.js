import * as firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAFU-WN2f1Lq8UD9LnZBzWesSMoIuKozu0",
    authDomain: "learning-realtime-chat-9eda4.firebaseapp.com",
    databaseURL: "https://learning-realtime-chat-9eda4.firebaseio.com",
    projectId: "learning-realtime-chat-9eda4",
    storageBucket: "learning-realtime-chat-9eda4.appspot.com",
    messagingSenderId: "490115034233",
    appId: "1:490115034233:web:76d0728a4e8914d1f638a8",
    measurementId: "G-BD5LLHT8NF"
  };
const firebase = firebaseApp.default;

firebase.auth.Auth.Persistence.SESSION;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export const chatsRef = db.ref("chats");

export default firebase;