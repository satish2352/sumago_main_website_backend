const applyNowModal = require("../models/applyNowModal");

const applyNow = async (req, resp) => {
  try {
    const data = new applyNowModal({
      name: req.body.name,
      title: req.body.title,
      email: req.body.email,
      phone: req.body.phone,
      confmEmail: req.body.confmEmail,
      address: req.body.address,
      cv: req.files.cv[0].path, // Assuming 'cv' is the key for CV file upload
      cover_letter: req.files.cover_letter[0].path
    });

    const saveData = await data.save();
    resp
      .status(201)
      .send({ message: "data added successfully", saveData });
  } catch (error) {
    console.log("error", error);
    resp.status(500).send({ error: "Internal server error" });
  }
};


module.exports = {applyNow}