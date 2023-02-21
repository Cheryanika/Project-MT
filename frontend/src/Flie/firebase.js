import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDUq_Gc_O70AvAr2QqlYKuG1yQq2J7DEcU",
    authDomain: "abstract-translator.firebaseapp.com",
    databaseURL: "https://abstract-translator-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "abstract-translator",
    storageBucket: "abstract-translator.appspot.com",
    messagingSenderId: "30307328309",
    appId: "1:30307328309:web:36898e4deb236784b36c7c",
    measurementId: "G-BC3K58EQ5W"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase();