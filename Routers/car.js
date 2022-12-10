const express = require("express");
const router = express.Router();

const {postCar} = require("../Controllers/controller");

router.route("/").post(postCar);

module.exports = router;