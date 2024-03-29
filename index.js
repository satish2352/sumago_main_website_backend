require("./db");
const express = require("express");
const cors = require("cors");
const fs = require('fs').promises;
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());


// Function to create 'uploads' folder if it doesn't exist
async function createUploadsFolder() {
  const uploadsFolderPath = path.join(__dirname, 'uploads');
  try {
    // Check if uploads folder exists
    const folderExists = await fs.stat(uploadsFolderPath);
    if (!folderExists.isDirectory()) {
      // If it exists but is not a directory (e.g., a file), handle the error
      throw new Error(`${uploadsFolderPath} is not a directory.`);
    }
    console.log("Uploads folder already exists.");
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If uploads folder does not exist, create it
      console.log("Uploads folder does not exist, creating...");
      await fs.mkdir(uploadsFolderPath);
    } else {
      // Handle other errors
      console.error('Error checking/creating uploads folder:', error);
    }
  }
}

// Create 'uploads' folder when the application starts
createUploadsFolder().catch(err => {
  console.error('Error creating uploads folder:', err);
  process.exit(1); // Exit the application if there's an error creating the folder
});
// Routes
app.get("/", (req, res) => {
  res.send(`Server is running on port no. ${process.env.APP_PORT}`);
});

// Contact form
const contactRouter = require("./src/routes/contactRoute");
app.use("/contact", contactRouter);

// Quotes form
const quoteRouter = require("./src/routes/quotesRoute");
app.use("/quote", quoteRouter);

// Apply Now form
const applyNowRouter = require("./src/routes/applyNowRoute");
app.use("/career", applyNowRouter);

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port no. ${process.env.APP_PORT}`);
});
