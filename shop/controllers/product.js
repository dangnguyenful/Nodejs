const productModels = require("../models/product");
const { deepClone } = require("../utils/common");

// @desc Get all product
// @route GET /api/v1/products
// @access Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const docs = await productModels.find();
    if (!docs) {
      res.status(400).json({ success: false, error: "Empty !" });
    } else {
      res.status(200).json({ success: true, data: docs });
    }
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
      res.status(400).json({ success: false, error: "Not found !" });
    } else {
      res.status(200).json({ success: true, data: docs });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOne({ name: req.body.name });
    if (!!docs) {
      res.status(409).json({ success: false, message: "Duplicate name !" });
    } else {
      const product = deepClone(req.body);
      product.uid = new Date().getTime();
      productModels.create(product);
      res.status(200).json({ success: true, data: req.body });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// @desc Update product
// @route PUT /api/v1/products/:uid
// @access Private
exports.updateProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOneAndUpdate(
      { uid: req.params.uid },
      req.body,
      { new: true, runValidators: true },
    );
    if (!docs) {
      res.status(400).json({ success: false, message: "Not found item !" });
    }
    res.status(200).json({ success: true, data: docs });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// @desc Delete product
// @route DELETE /api/v1/products/:uid
// @access Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const docs = await productModels.findOneAndDelete({ uid: req.params.uid });
    if (!docs) {
      res.status(400).json({ success: false, message: "Not found item !" });
    }
    res.status(200).json({ success: true, message: "Success deleted !" });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
