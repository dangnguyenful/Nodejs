const productModels = require("../models/product");
const { deepClone } = require("../utils/common");
const errorHandler = require("../middleware/error");
const ErrorResponse = require("../utils/errorResponse");

// @desc Get all product
// @route GET /api/v1/products
// @access Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const docs = await productModels.find();
    res.status(200).json({ success: true, data: docs });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// @desc Get one product
// @route GET /api/v1/products/:uid
// @access Public
exports.getDetailProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOne({ uid: req.params.uid });
    if (!docs) {
      return next(
        new ErrorResponse(
          `Product not found with id of ${req.params.uid}`,
          404,
        ),
      );
    }
    res.status(200).json({ success: true, data: docs });
  } catch (err) {
    next(err);
  }
};

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOne({ name: req.body.name });
    if (!!docs) {
      return next(
        new ErrorResponse(
          `Product with name ${req.body.name} is already exist !`,
          409,
        ),
      );
    } else {
      const product = deepClone(req.body);
      product.uid = new Date().getTime();
      await productModels.create(product);
      res.status(200).json({ success: true, data: req.body });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Update product
// @route PUT /api/v1/products/:uid
// @access Private
exports.updateProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOne({ uid: req.params.uid });
    if (!docs) {
      return next(
        new ErrorResponse(
          `Product not found with id of ${req.params.uid}`,
          404,
        ),
      );
    } else {
      await productModels.updateOne({ uid: req.params.uid }, req.body);
      docsNew = await productModels.findOne({ uid: req.params.uid });
      res.status(200).json({ success: true, data: docsNew });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Delete product
// @route DELETE /api/v1/products/:uid
// @access Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOne({ uid: req.params.uid });
    if (!docs) {
      return next(
        new ErrorResponse(
          `Product not found with id of ${req.params.uid}`,
          404,
        ),
      );
    } else {
      await productModels.deleteOne({ uid: req.params.uid });
      res.status(200).json({ success: true });
    }
  } catch (err) {
    next(err);
  }
};
