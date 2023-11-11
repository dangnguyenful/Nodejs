const mongoose = require("mongoose");
const connectDB = async (mongoUri) => {
  const conn = await mongoose
    .connect(mongoUri, { socketTimeoutMS: 1000 })
    .then(() => console.log("Connection to mongodb successful".yellow))
    .catch((err) => console.error(err));
};

module.exports = connectDB;
