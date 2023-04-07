//Import required modules
const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
require("dotenv").config();
require("./config/db");

//Import routes
const authRouter = require("./routes/authRoutes");

//Define global variables and constants
const PORT = process.env.PORT || 3000;

//Create express app
const app = express();

//Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Use middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/v1/auth", authRouter);

//Error handler
app.use(globalErrorHandler);

//Catch 404 errors
app.use("*", (req, res) => {
  res.status(404).json({
    responseCode: "99",
    responseMessage: `${req.originalUrl} not found`,
  });
});
