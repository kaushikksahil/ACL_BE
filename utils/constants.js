module.exports = Object.freeze({
  STATUS_CODE: {
    SUCCESS: 200,
    INTERNAL_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  },
  ERROR_CODE: {
    DUPLICATE_EMAIL: 11000,
  },
  MESSAGE: {
    REQUIRED_EMAIL: "Kindly provide the required parameter (email)",
    REQUIRED_USER_NAME: "Kindly provide the required parameter (username)",
    REQUIRED_PASSWORD: "Kindly provide the required parameter (password)",
    REQUIRED_ROLE: "Kindly provide the required parameter (Role)",
    REQUIRED_PRODUCT_NAME: "Kindly provide the required parameter (name)",
    REQUIRED_PRODUCT_PRICE: "Kindly provide the required parameter (price)",
    EMPTY_EMAIL: "Kindly provide email",
    EMPTY_USER_NAME: "Kindly provide userName",
    EMPTY_PASSWORD: "Kindly provide password",
    EMPTY_ROLE: "Kindly provide role",
    EMPTY_PRODUCT_NAME: "Kindly provide name",
    EMPTY_PRODUCT_PRICE: "Kindly provide price",
  },
  FIELD: {
    EMAIL: "email",
    USER_NAME: "userName",
    PASSWORD: "password",
    ROLE: "role",
    NAME: "name",
    PRICE: "price",
    BASE_URL_PRODUCT: "/product",
  },
});