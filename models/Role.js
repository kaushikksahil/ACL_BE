let mongoose = require("mongoose");

let Role = mongoose.Schema({
  role: [
    {
      name: { type: String, default: "" },
      id: Number,
      privilege: { type: Array },
      apiPrivilege: { type: Array },
    },
  ],
});

Role.statics.getRole = async function (condition) {
  console.log("in getRole");
  let role = await this.find(condition).lean().exec();
  console.log("getRole finished");
  return role;
};

var RoleModal = mongoose.model("role", Role);
module.exports = RoleModal;
