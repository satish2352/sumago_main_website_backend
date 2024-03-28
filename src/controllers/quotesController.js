const quoteModal = require("../models/quotesModal");

const quotesRegistration = async (req, resp) => {
  try {
    const data = new quoteModal({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      other_service: req.body.other_service,
      address: req.body.address,
      comment: req.body.comment,
    });

    const saveData = await data.save();
    resp
      .status(201)
      .send({ message: "quote details added successfully", saveData });
  } catch (error) {
    console.log("error", error);
    resp.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { quotesRegistration };
