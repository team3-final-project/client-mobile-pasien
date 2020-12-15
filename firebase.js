import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAmSpsJELuQMMGHQwSiZKlt0rxDDKADqrg",
    authDomain: "med-notification-1c8a9.firebaseapp.com",
    projectId: "med-notification-1c8a9",
    storageBucket: "med-notification-1c8a9.appspot.com",
    messagingSenderId: "397709004556",
    appId: "1:397709004556:web:40319a8a6eb95ba1390329"
  };


firebase.initializeApp(firebaseConfig);

export default firebase