require("dotenv").config();

const express = require("express");
const app = express();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
global.__basedir = __dirname;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept"
    );
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
