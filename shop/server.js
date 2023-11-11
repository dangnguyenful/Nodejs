const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product");
const logger = require("morgan");
const colors = require("colors");
const connectDB = require("./db/db");

dotenv.config({ path: "./config/config.env" });

connectDB(process.env.MONGO_URI);

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use("/api/v1/products", productRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
