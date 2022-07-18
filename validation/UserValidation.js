const constants = require("../utils/constants");

const loginParameter = (input) => {
  let inputKeys = Object.keys(input);
  let error = {};
  if (!inputKeys.includes(constants.FIELD.EMAIL)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_EMAIL;
  } else if (!inputKeys.includes(constants.FIELD.PASSWORD)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_PASSWORD;
  }
  return error;
};

const signupParameter = (input) => {
  let inputKeys = Object.keys(input);
  let error = {};
  if (!inputKeys.includes(constants.FIELD.USER_NAME)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_USER_NAME;
  } else if (!inputKeys.includes(constants.FIELD.PASSWORD)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_PASSWORD;
  } else if (!inputKeys.includes(constants.FIELD.ROLE)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_ROLE;
  }
  return error;
};

const productParameter = (input) => {
  let inputKeys = Object.keys(input);
  let error = {};
  if (!inputKeys.includes(constants.FIELD.NAME)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_PRODUCT_NAME;
  } else if (!inputKeys.includes(constants.FIELD.PRICE)) {
    error.status = constants.STATUS_CODE.BAD_REQUEST;
    error.message = constants.MESSAGE.REQUIRED_PRODUCT_PRICE;
  }
  return error;
};

const paramEmptyValue = (param) => {
  let error = {};
  let inputKeys = Object.keys(param);
  for (let i = 0; i < inputKeys.length; i++) {
    let field = inputKeys[i];
    let fieldValue = param[field];
    if (fieldValue === "") {
      if (field === constants.FIELD.EMAIL) {
        error.status = constants.STATUS_CODE.BAD_REQUEST;
        error.message = constants.MESSAGE.EMPTY_EMAIL;
      } else if (field === constants.FIELD.USER_NAME) {
        error.status = constants.STATUS_CODE.BAD_REQUEST;
        error.message = constants.MESSAGE.EMPTY_USER_NAME;
      } else if (field === constants.FIELD.PASSWORD) {
        error.status = constants.STATUS_CODE.BAD_REQUEST;
        error.message = constants.MESSAGE.EMPTY_PASSWORD;
      } else if (field === constants.FIELD.ROLE) {
        error.status = constants.STATUS_CODE.BAD_REQUEST;
        error.message = constants.MESSAGE.EMPTY_ROLE;
      } else if (field === constants.FIELD.NAME) {
        error.status = constants.STATUS_CODE.BAD_REQUEST;
        error.message = constants.MESSAGE.EMPTY_PRODUCT_NAME;
      } else if (field === constants.FIELD.PRICE) {
        error.status = constants.STATUS_CODE.BAD_REQUEST;
        error.message = constants.MESSAGE.EMPTY_PRODUCT_PRICE;
      }
    }
  }
  return error;
};

module.exports = {
  loginParameter,
  signupParameter,
  paramEmptyValue,
  productParameter,
};
