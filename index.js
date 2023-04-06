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
