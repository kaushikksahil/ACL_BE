const RoleRoute = require("express").Router();
const Role = require("../models/Role");
var constants = require("../utils/constants");

RoleRoute.get("/role", async (req, res) => {
  console.log("in /role with param ::: ", req.body);
  let condition = req.body || {};
  Role.getRole(condition)
    .then((RoleList) => {
      res.status(constants.STATUS_CODE.SUCCESS).json({
        data: RoleList[0].roles,
      });
    })
    .catch((err) => {
      console.log("err:: ", err);
      res.status(constants.STATUS_CODE.INTERNAL_ERROR).json(err);
    });
});

module.exports = RoleRoute;
