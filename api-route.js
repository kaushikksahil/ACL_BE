var router = require("express").Router();
router.get("/", function (req, res) {
  console.log("Route");
  res.json({
    status: 200,
    message: "This is initial stage",
  });
});

module.exports = router;
