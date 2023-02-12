const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  inputWord: {
    type: String,
    required: true,
  },
  outWord: {
    type: String,
    required: true,
  },
});

const Wordtranslator = mongoose.model("wordtranslator", userSchema);

module.exports = Wordtranslator;
