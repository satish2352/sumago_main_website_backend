require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// create server

app.get("/", (req, res) => {
  res.send(`server is running on port no. ${process.env.APP_PORT}`);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`server is running on port no.${process.env.APP_PORT}`);
});

// contact form
const contactRouter = require("./src/routes/contactRoute");
app.use("/contact", contactRouter);

// Quotes form
const quoteRouter = require("./src/routes/quotesRoute");
app.use("/quote", quoteRouter);

// Apply Now form
const applyNowRouter = require("./src/routes/applyNowRoute");
app.use("/career", applyNowRouter);
