import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCiHPLmwCcUzKgiU805XCdyRp1g2Jo71m4",
    authDomain: "awesomeproject2-2bcb5.firebaseapp.com",
    databaseURL: "https://awesomeproject2-2bcb5.firebaseio.com",
    projectId: "awesomeproject2-2bcb5",
    storageBucket: "awesomeproject2-2bcb5.appspot.com",
    messagingSenderId: "933264694554"
    }

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();