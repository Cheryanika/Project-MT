const express = require("express");
const HuggingFaceController = require("../controllers/HuggingfaceController");
const router = express.Router();

router.post("/translate", HuggingFaceController.translateWording);

module.exports = router;
