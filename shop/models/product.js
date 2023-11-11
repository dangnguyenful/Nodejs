const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uid: { type: String },
  name: {
    type: String,
    required: [true, "Please add name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more 50 character"],
  },
  category: {
    type: Number,
    required: [true, "Please add category"],
    max: [1000, "Category in 1000 number"],
  },
});

module.exports = mongoose.model("product", productSchema);
