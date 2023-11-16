const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product");
const logger = require("morgan");
const colors = require("colors");
const connectDB = require("./db/db");
const errorHandler = require("./middleware/error");
const ch = require("./middleware/createContextHook");
const gh = require("./middleware/getContextHook");

dotenv.config({ path: "./config/config.env" });

connectDB(process.env.MONGO_URI);

const app = express();

app.use(ch);
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(gh);
app.use("/api/v1/products", productRoutes);
app.use(errorHandler);

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
