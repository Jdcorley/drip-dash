const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController.js");
const helper = require("../auth/helpers");


router.get("/", staticController.index);
router.get("/dashboard", helper.ensureAuthenticated, staticController.dashboard);

module.exports = router;