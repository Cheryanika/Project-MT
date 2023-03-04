const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Data in firebase
app.post("/create/translator", async (req, res) => {
  try {
    console.log(req.body);
    // const id = req.body.English;
    const translatorJson = {
      English: req.body.English,
      Model: req.body.Model,
      Thai: req.body.Thai,
    };
    const response = db.collection("TranslatorData").add(translatorJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

// Checking Running Port Sever
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Sever is running on PORT ${PORT}.`);
});
