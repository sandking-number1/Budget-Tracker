const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = "mongodb+srv://srirajuppalapati9:sriraj@cluster0.9if4yk1.mongodb.net/Cluster0";

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
};

module.exports = connectDb;
