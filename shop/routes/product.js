const express = require("express");
const {
  getAllProducts,
  getDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:uid")
  .get(getDetailProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
