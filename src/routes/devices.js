const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");

const deviceController = require("../controllers/deviceController");

router.get("/devices", helper.ensureAuthenticated, deviceController.index);
router.get("/devices/new", helper.ensureAuthenticated, deviceController.new);
router.post("/devices/claim", helper.ensureAuthenticated, validation.validateDeviceClaim, deviceController.claim);
router.get("/devices/:id", helper.ensureAuthenticated, deviceController.show);

module.exports = router;