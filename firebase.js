import firebase from 'firebase'


// const firebaseConfig = {
//     apiKey: "AIzaSyAmSpsJELuQMMGHQwSiZKlt0rxDDKADqrg",
//     authDomain: "med-notification-1c8a9.firebaseapp.com",
//     projectId: "med-notification-1c8a9",
//     storageBucket: "med-notification-1c8a9.appspot.com",
//     messagingSenderId: "397709004556",
//     appId: "1:397709004556:web:40319a8a6eb95ba1390329"
//   };

  var firebaseConfig = {
    apiKey: "AIzaSyBCz3dX_eCyHVUgTa90FKtrt2Tl9Da66fs",
    authDomain: "dave-test-apps.firebaseapp.com",
    projectId: "dave-test-apps",
    storageBucket: "dave-test-apps.appspot.com",
    messagingSenderId: "5482969416",
    appId: "1:5482969416:web:76c2811fe3f0b276031b7d"
  };

firebase.initializeApp(firebaseConfig);

export default firebase