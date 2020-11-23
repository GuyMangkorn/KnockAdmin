import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBH5Q_tbsUyP-pBkG_xZr_OFr8ybHhHvx0",
    authDomain: "anonymoussocial-cfece.firebaseapp.com",
    databaseURL: "https://anonymoussocial-cfece.firebaseio.com",
    projectId: "anonymoussocial-cfece",
    storageBucket: "anonymoussocial-cfece.appspot.com",
    messagingSenderId: "332943175535",
    appId: "1:332943175535:web:2567b68437ca2a3362429a",
    measurementId: "G-VVJZHME5ZK"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.database()
const auth = firebase.auth()


export {
    db,
    auth
}
