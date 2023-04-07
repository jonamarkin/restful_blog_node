//Connect to MongoDB
const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  await mongoose.connection.close();
};

module.exports = { connectDb, closeDB };
