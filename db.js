const mongoose = require("mongoose");
const env = require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("database successfully connected");
  })
  .catch((err) => {
    console.log("err", err);
  });
