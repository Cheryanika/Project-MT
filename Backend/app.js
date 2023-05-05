const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Data in Firebase
// Path: http://localhost:8000/create/translator
app.post("/create/translator", async (req, res) => {
  try {
    console.log(req.body);
    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();
    let full = day.toString() + month.toString() + year.toString() ;

    let m = objectDate.getMinutes();
    let h = objectDate.getHours();
    let sc =objectDate.getSeconds();
    let time = h.toString() +m.toString() +sc.toString() ;

    const id = "Date"+ "-" + full + "-" + time;
    const translatorJson = {
      Machine: req.body.Machine,
      Translate: req.body.Translate,
      Input: req.body.Input,
      Output: req.body.Output,
    };

    const response = db.collection("TranslatorData").doc(id).set(translatorJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

// Function Read data all in db
// Path: http://localhost:8000/read/all
app.get("/read/all", async (req, res) => {
  try {
    const translatorRef = db.collection("TranslatorData");
    const response = await translatorRef.get();
    let responseArr = [];
    response.forEach((doc) => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
});

// Checking Running Port Sever
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Sever is running on PORT ${PORT}.`);
});
