const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
var RoleModel = require("../models/Role");
var constant = require("../utils/constants");

exports.verify = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(403).json({ error: "please provide a token" });
  else {
    jwt.verify(token, tokenSecret, (err, value) => {
      if (err)
        return res
          .status(401)
          .json({ status: 401, error: "failed to authenticate token" });
      if (req.baseUrl === constant.FIELD.BASE_URL_PRODUCT) {
        getRoles()
          .then((RoleList) => {
            let allRoles = RoleList[0].roles;
            allRoles.forEach((_role) => {
              if (_role.id === value.data.role) {
                if (!_role.apiPrivilege.includes(req.method)) {
                  return res.status(401).json({
                    status: 401,
                    error: "Not authorized to access endpoint",
                  });
                }
              }
            });
          })
          .catch((err) => {
            console.log("err:: ", err);
            res.status(500).json(err);
          });
      }
      req.user = value.data;
      next();
    });
  }
};

const getRoles = async function (next) {
  let allRoles = await RoleModel.getRole({});
  return allRoles;
};
