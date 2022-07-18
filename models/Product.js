let mongoose = require("mongoose");

let Product = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: "name is required",
  },
  description: String,
  color: String,
  price: {
    type: Number,
    trim: true,
    lowercase: true,
    required: "Price is required",
  },
});

Product.statics.createProduct = async (productInput) => {
  let product = new ProductModal(productInput);
  console.log("Going to save product...", productInput);

  let savedProduct = await product.save();

  console.log("Product saved successfully!! :: ", savedProduct);
  return savedProduct.toJSON();
};

Product.statics.getProduct = async function (condition) {
  console.log("in getProduct");
  let product = await this.find(condition).lean().exec();
  console.log("getProduct finished");
  return product;
};

Product.statics.updateProduct = async function (condition, doc) {
  console.log("in updateProduct");
  let product = await this.findOneAndUpdate(condition, doc, {
    upsert: true,
    setDefaultsOnInsert: true,
    new: true,
  })
    .lean()
    .exec();
  console.log("updateProduct finished");
  return product;
};

Product.statics.deleteProduct = async function (condition) {
  console.log("in deleteProduct");
  let product = await this.find(condition).remove().exec();
  console.log("deleteProduct finished");
  return product;
};

var ProductModal = mongoose.model("product", Product);
module.exports = ProductModal;
