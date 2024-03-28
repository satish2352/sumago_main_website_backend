const quoteController = require("../controllers/quotesController");
const express = require("express");
const router = express();

router.post("/add", quoteController.quotesRegistration);
module.exports = router;
