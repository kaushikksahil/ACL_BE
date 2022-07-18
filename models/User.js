let mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let User = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "User Name is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid User Name",
    ],
  },
  email: String,
  password: {
    type: String,
    trim: true,
  },
  role: Number,
  token: String,
});

User.statics.createUser = async (userInput) => {
  let _user;
  let user = new UserModal(userInput);
  user.email = userInput.userName;
  let x = userInput.userName;
  console.log("Going to save user...", userInput);

  let savedUser = await user.save();
  _user = {
    _id: savedUser.toJSON()._id,
    role: savedUser.toJSON().role,
  };
  console.log("Used saved successfully!! :: ", _user);
  return _user;
};

User.statics.login = async (userInput) => {
  console.log("Going to check user");
  let _user = await UserModal.find(userInput).lean().exec();
  console.log("Used found");
  return _user;
};

var UserModal = mongoose.model("user", User);
module.exports = UserModal;
