const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://srirajuppalapati9:sriraj@cluster0.9if4yk1.mongodb.net/Cluster0");
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

module.exports = connectDb;
