const mongoose = require("mongoose");

const applyNowSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    confmEmail: {
      type: String,
      required: true,
    },
    cover_letter: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("applyNow", applyNowSchema);
