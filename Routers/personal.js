const express = require("express");
const router = express.Router();

const {postPersonal} = require("../Controllers/controller");

router.route("/").post(postPersonal);

module.exports = router;