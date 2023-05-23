import { initializeApp } from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCk66X7KlR3BtKBHUJCRb9nQaB00sGxbmI",
    authDomain: "pets-app-1dfd8.firebaseapp.com",
    projectId: "pets-app-1dfd8",
    storageBucket: "pets-app-1dfd8.appspot.com",
    messagingSenderId: "998649746988",
    appId: "1:998649746988:web:d8e3ce4751f37a1593a389",
    databaseURL: "https://pets-app-1dfd8-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
