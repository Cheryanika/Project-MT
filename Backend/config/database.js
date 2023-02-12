const { FIREBASE_URI } = process.env;
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

exports.connect = () => {
  try {
    const firebaseConfig = {
      FIREBASE_URI,
    };
    var server = app.listen(
      console.log(`Successfully connected to database: ${port}`)
    );
  } catch (error) {
    console.log(error);
    console.log("Error connecting to database");
  }
};
