var UserRouter = require("express").Router();
var UserModel = require("../models/User");
var constants = require("../utils/constants");
var auth = require("../auth/JwtAuth");
var { isAlphaNumberic } = require("../utils/util");
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
var {
  loginParameter,
  signupParameter,
  paramEmptyValue,
} = require("../validation/UserValidation");

UserRouter.post("/add", async (req, res) => {
  console.log("in user/add ");
  let reqBodyFields = signupParameter(req.body);
  if (reqBodyFields && Object.keys(reqBodyFields).length !== 0) {
    return res
      .status(constants.STATUS_CODE.BAD_REQUEST)
      .json({ token: generateToken(reqBodyFields) });
  }
  let reqBodyValue = paramEmptyValue(req.body);
  if (reqBodyValue && Object.keys(reqBodyValue).length !== 0) {
    return res
      .status(constants.STATUS_CODE.BAD_REQUEST)
      .json({ token: generateToken(reqBodyValue) });
  }
  if (!isAlphaNumberic(req.body.password)) {
    return res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY).json({
      token: generateToken({
        status: constants.STATUS_CODE.UNPROCESSABLE_ENTITY,
        field: "password",
        message: "Password should be Alphanumeric",
      }),
    });
  }
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error)
      return res.status(constants.STATUS_CODE.INTERNAL_ERROR).json(error);
    else {
      req.body.password = hash;
      UserModel.createUser(req.body)
        .then(function (user) {
          res.status(constants.STATUS_CODE.SUCCESS).json({
            token: generateToken(user),
          });
        })
        .catch(function (err) {
          console.log("errr:::", err);
          let errorField =
            err &&
            err.errors &&
            Object.values(err.errors).map((val) => val.path)[0];
          let errorMessage =
            err &&
            err.errors &&
            Object.values(err.errors).map((val) => val.message)[0];
          if (err.code === constants.ERROR_CODE.DUPLICATE_EMAIL) {
            res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY).json({
              token: generateToken({
                status: constants.STATUS_CODE.UNPROCESSABLE_ENTITY,
                field: "userName",
                message:
                  "This user name is alreay taken, please provide unique" ||
                  errorMessage,
              }),
            });
          } else if (err.name === "ValidationError") {
            res.status(constants.STATUS_CODE.UNPROCESSABLE_ENTITY).json({
              token: generateToken({
                status: constants.STATUS_CODE.UNPROCESSABLE_ENTITY,
                field: errorField,
                message: errorMessage,
              }),
            });
          } else {
            console.log(err);
            res
              .status(constants.STATUS_CODE.INTERNAL_ERROR)
              .json({ token: generateToken(err) });
          }
        });
    }
  });
});

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "10m" });
}

UserRouter.post("/login", async (req, res) => {
  console.log("in user/login ");
  let reqBodyFields = loginParameter(req.body);
  if (reqBodyFields && Object.keys(reqBodyFields).length !== 0) {
    return res
      .status(constants.STATUS_CODE.BAD_REQUEST)
      .json({ token: generateToken(reqBodyFields) });
  }
  let reqBodyValue = paramEmptyValue(req.body);
  if (reqBodyValue && Object.keys(reqBodyValue).length !== 0) {
    return res
      .status(constants.STATUS_CODE.BAD_REQUEST)
      .json({ token: generateToken(reqBodyValue) });
  }
  let condition = { email: req.body.email };
  UserModel.login(condition)
    .then(function (user) {
      if (user.length === 0)
        return res.status(constants.STATUS_CODE.NOT_FOUND).json({
          token: generateToken({
            status: constants.STATUS_CODE.NOT_FOUND,
            message: "Invalid Credentials",
          }),
        });
      bcrypt.compare(req.body.password, user[0].password, (error, match) => {
        if (error)
          return res
            .status(constants.STATUS_CODE.INTERNAL_ERROR)
            .json({ token: generateToken(error) });
        else if (match)
          return res.status(200).json({
            token: generateToken({
              _id: user[0]._id,
              role: user[0].role,
            }),
          });
        else
          return res.status(constants.STATUS_CODE.NOT_FOUND).json({
            token: generateToken({
              status: constants.STATUS_CODE.NOT_FOUND,
              message: "Invalid Credentials",
            }),
          });
      });
    })
    .catch(function (err) {
      res
        .status(constants.STATUS_CODE.INTERNAL_ERROR)
        .json({ token: generateToken(err) });
    });
});

module.exports = UserRouter;
