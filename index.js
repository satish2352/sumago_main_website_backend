require("./db");
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const env = require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes


const recordsRoutes = require("./src/routes/contactRoutes");
app.use("/contact", recordsRoutes);
const applyNowRoutes = require("./src/routes/applyNowRoutes");
app.use("/applynow", applyNowRoutes);
const quoteRoutes = require("./src/routes/quoteRoutes");
app.use("/quotes", quoteRoutes);
const locationRoutes = require("./src/routes/locationRoute");
app.use("/location", locationRoutes);
const LifeCategoryRoutes = require("./src/routes/lifeCategoryRoute");
app.use("/life_category", LifeCategoryRoutes);
const lifeCategoryDetailsRoutes = require("./src/routes/lifeCategoryDetailsRoute");
app.use("/life_category_details", lifeCategoryDetailsRoutes);
const jobOpeningRoutes = require("./src/routes/jobOpeningRoutes");
app.use("/jobs", jobOpeningRoutes);
const internshipOpeningRoutes = require("./src/routes/internshipOpeningRoutes");
app.use("/internship", internshipOpeningRoutes);
const testimonialsRoutes = require("./src/routes/testimonialRoute");
app.use("/testimonials", testimonialsRoutes);
const clientCountRoutes = require("./src/routes/clientCountRouters");
app.use("/clientCount", clientCountRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running on port no. ${process.env.APP_PORT}`);
});

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port no. ${process.env.APP_PORT}`);
});
