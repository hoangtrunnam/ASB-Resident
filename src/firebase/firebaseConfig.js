import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyCEPUyFV03ckYBVX46W-Xl-YmysG1312-8",
    // AIzaSyDYNQd-qwO17YXOCO76D3aY3F2ATEMq7bM
    authDomain: "rnfirebase-83abd.firebaseapp.com",
    databaseURL: "https://rnfirebase-83abd.firebaseio.com",
    projectId: "rnfirebase-83abd",
    storageBucket: "rnfirebase-83abd.appspot.com",
    messagingSenderId: "893838364280"
    // 1049370974200
};
export const firebaseApp = firebase.initializeApp(config);