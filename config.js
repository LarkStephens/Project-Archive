import Firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCUvfPFfJoJjB-lT4UAIY1zSH-A5hF_7oM",
    authDomain: "react-native-project-c7284.firebaseapp.com",
    databaseURL: "https://react-native-project-c7284.firebaseio.com",
    projectId: "react-native-project-c7284",
    storageBucket: "react-native-project-c7284.appspot.com",
    messagingSenderId: "212848584238"
  };
let app = Firebase.initializeApp(config);

export const db = app.database();