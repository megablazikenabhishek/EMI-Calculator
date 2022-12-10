const express = require("express");
const router = express.Router();

const {postHome} = require("../Controllers/controller");

router.route("/").post(postHome);

module.exports = router;