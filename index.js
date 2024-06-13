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
try {
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
  const CultureCategoryRoutes = require("./src/routes/cultureCategoryRoutes");
  app.use("/culture_category", CultureCategoryRoutes);
  const cultureCategoryDetailsRoutes = require("./src/routes/cultureCategoryDetailsRoute");
  app.use("/culture_category_details", cultureCategoryDetailsRoutes);
  const jobOpeningRoutes = require("./src/routes/jobOpeningRoutes");
  app.use("/jobs", jobOpeningRoutes);
  const internshipOpeningRoutes = require("./src/routes/internshipOpeningRoutes");
  app.use("/internship", internshipOpeningRoutes);
  const testimonialsRoutes = require("./src/routes/testimonialRoute");
  app.use("/testimonials", testimonialsRoutes);
  const clientCountRoutes = require("./src/routes/clientCountRouters");
  app.use("/clientCount", clientCountRoutes);
  const teamRoutes = require("./src/routes/TeamRoutes");
  app.use("/team", teamRoutes);
  const appreciationRoutes = require("./src/routes/AppreciationRoute");
  app.use("/appreciation", appreciationRoutes);
  const broucherDownloadRoutes = require("./src/routes/broucherFormRoute");
  app.use("/broucherDownload", broucherDownloadRoutes);
  const loginRoutes = require("./src/routes/userRoutes");
  app.use("/auth", loginRoutes);
  const homesliderRoutes = require("./src/routes/homesliderroute");
  app.use("/homeslider", homesliderRoutes);
  const aboutmissionRoutes = require("./src/routes/aboutmission");
  app.use("/aboutmission", aboutmissionRoutes);
  const aboutvissonRoutes = require("./src/routes/aboutvision");
  app.use("/aboutvission", aboutvissonRoutes);
  const BlogdetailsRoutes = require("./src/routes/blogdetailPageRoute");
  app.use("/Blogdetails", BlogdetailsRoutes);
  const homecardsRoutes = require("./src/routes/homecardsRoutes");
  app.use("/homecards", homecardsRoutes); 
  const whysumagoRoutes = require("./src/routes/whysumagoRoute");
  app.use("/whysumago", whysumagoRoutes);
  const sectorsRoutes = require("./src/routes/sectorsRoutes");
  app.use("/sector", sectorsRoutes);
  const hometechnologiesRoutes = require("./src/routes/hometechnologies");
  app.use("/hometechnologies", hometechnologiesRoutes);
  const offeredservicesRoutes = require("./src/routes/offeredservicesRoute");
  app.use("/offeredservices", offeredservicesRoutes);
  const ContactInfo = require("./src/routes/contactInfoRoute");
  app.use("/contactInfo", ContactInfo);
} catch (error) {
  console.error("Error while loading routes:", error);
}

app.get("/", (req, res) => {
  res.send(`Server is running on port no. ${process.env.APP_PORT}`);
});

// Start server
try {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port no. ${process.env.APP_PORT}`);
  });
} catch (error) {
  console.error("Error while starting server:", error);
}
