const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const { text } = require("body-parser");
const { request } = require("../app");

// var text = bodyParser.data;

async function translateWording(data) {
  //   var text = bodyParser.data;
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
  const text = response.json();
  return text;
}

translateWording({}).then((response) => {
  return JSON.stringify(response);
});

module.exports = {
  translateWording,
};
