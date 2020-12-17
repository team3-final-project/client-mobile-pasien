import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAdOd6XqXSIEK27h-n0izCf_KHIsIol6UM",
    authDomain: "med-tracker-9f773.firebaseapp.com",
    projectId: "med-tracker-9f773",
    storageBucket: "med-tracker-9f773.appspot.com",
    messagingSenderId: "473078585981",
    appId: "1:473078585981:web:70de5fa7293bdf3f7a6f14"
  };
firebase.initializeApp(firebaseConfig);

export default firebase