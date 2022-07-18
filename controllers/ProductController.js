var ProductRouter = require("express").Router();
var constants = require("../utils/constants");
var ProductModel = require("../models/Product");
var auth = require("../auth/JwtAuth");
var mongoose = require("mongoose");
var {
  productParameter,
  paramEmptyValue,
} = require("../validation/UserValidation");
const { Mongoose } = require("mongoose");

ProductRouter.post("/add", auth.verify, async (req, res) => {
  console.log("in product/add ");
  let reqBodyFields = productParameter(req.body);
  if (reqBodyFields && Object.keys(reqBodyFields).length !== 0) {
    return res.status(constants.STATUS_CODE.BAD_REQUEST).json(reqBodyFields);
  }
  let reqBodyValue = paramEmptyValue(req.body);
  if (reqBodyValue && Object.keys(reqBodyValue).length !== 0) {
    return res.status(constants.STATUS_CODE.BAD_REQUEST).json(reqBodyValue);
  }
  ProductModel.createProduct(req.body)
    .then(function (user) {
      res.status(constants.STATUS_CODE.SUCCESS).json({
        data: user,
      });
    })
    .catch(function (err) {
      if (err.name === "ValidationError") {
        res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY).json({
          status: constants.STATUS_CODE.UNPROCESSABLE_ENTITY,
          field: errorField,
          message: errorMessage,
        });
      } else {
        console.log(err);
        res.status(constants.STATUS_CODE.INTERNAL_ERROR).json(err);
      }
    });
});

ProductRouter.get("/", auth.verify, async (req, res) => {
  console.log("in product with param ::: ");
  let condition = req.body || {};
  ProductModel.getProduct(condition)
    .then((products) => {
      res.status(constants.STATUS_CODE.SUCCESS).json({
        data: products,
      });
    })
    .catch((err) => {
      console.log("err:: ", err);
      res.status(constants.STATUS_CODE.INTERNAL_ERROR).json(err);
    });
});

ProductRouter.delete("/:id", auth.verify, async (req, res) => {
  console.log("in product/id with param ::: ");
  let id = req.params.id;
  let condition = { _id: mongoose.Types.ObjectId(id) };
  ProductModel.deleteProduct(condition)
    .then((products) => {
      res.status(constants.STATUS_CODE.SUCCESS).json({
        data: products,
      });
    })
    .catch((err) => {
      console.log("err:: ", err);
      res.status(constants.STATUS_CODE.INTERNAL_ERROR).json(err);
    });
});

ProductRouter.put("/:id", auth.verify, async (req, res) => {
  console.log("in product/id with param ::: ");
  let id = req.params.id;
  let condition = { _id: mongoose.Types.ObjectId(id) };
  ProductModel.updateProduct(condition, req.body)
    .then((products) => {
      res.status(constants.STATUS_CODE.SUCCESS).json({
        data: products,
      });
    })
    .catch((err) => {
      console.log("err:: ", err);
      res.status(constants.STATUS_CODE.INTERNAL_ERROR).json(err);
    });
});

module.exports = ProductRouter;
