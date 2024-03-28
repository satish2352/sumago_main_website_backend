// const { validationResult } = require('express-validator');

const contactModal = require("../models/contactModal");

const contactRegistration = async (req, resp) => {
  try {
    // Check for validation errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return resp.status(400).json({ errors: errors.array() });
    // }

    const data = new contactModal({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website,
      message: req.body.message,
    });

    const saveData = await data.save();
    resp.status(201).send({ message: "contact details added successfully", saveData });
  } catch (error) {
    console.log("error", error);
    resp.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { contactRegistration };
