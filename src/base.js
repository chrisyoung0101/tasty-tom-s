import Rebase from 're-base';
import firebase from 'firebase';

//our firebase app :
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDsNhxGWRdo8zV-Fi0pPJeR7u4mv2qRPYU",
    authDomain: "home-grown-dd678.firebaseapp.com",
    databaseURL: "https://home-grown-dd678.firebaseio.com"
});

//our Rebase bindings : 
const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;

