const isEmptyString = (input) => {
  return input.length === 0;
};

const isAlphaNumberic = (input) => {
  return !input.match(/^[0-9a-z]+$/);
};

module.exports = {
  isEmptyString,
  isAlphaNumberic,
};
