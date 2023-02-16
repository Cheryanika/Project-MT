require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
// const User = require("./models/HuggingFace");
const app = express();

// const HuggingFaceRoutes = require("./routes/HuggingfaceRoutes");
// const HuggingFaceController = require("./controller/HuggingfaceController");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept"
    );
  next();
});

// const text = { inputs: `${"inputs"} ` };

// var data = { inputs: "Something here" };

// const response = fetch(
//   `https://api-inference.huggingface.co/models/SigmarAI/mt5-sentence-translator`,
//   {
//     headers: {
//       Authorization: "Bearer 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",
//     },
//     method: "POST",
//     data: JSON.stringify(data),
//   }
// );

// const data = await response.json();
// return data;

async function translateWord(data) {
  var data = { inputs: `${"inputs"} ` };
  const response = await fetch(
    `https://api-inference.huggingface.co/models/SigmarAI/mt5-sentence-translator`,
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  data = await response.json();
  // data = query({ inputs: "The Output: " }).then((response) => {
  // });
  console.log(JSON.stringify(response));
  return data;
}

app.use("/api/word", translateWord);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
