//Import required modules
const express = require("express");
require("dotenv").config();
require("./config/db");

//Define global variables and constants
const PORT = process.env.PORT || 3000;

//Create express app
const app = express();

//Use middleware
app.use(express.json({ extended: false }));

//Define routes
//app.use("/api/users", require("./routes/api/users"));

//Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    responseCode: "99",
    responseMessage: message,
  });
});
