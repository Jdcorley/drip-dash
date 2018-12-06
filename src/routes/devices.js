const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");

const deviceController = require("../controllers/deviceController");

router.get("/devices", helper.ensureAuthenticated, deviceController.showDevices);
router.post("/devices/claim", helper.ensureAuthenticated, validation.validateDeviceClaim, deviceController.claimDevice);

module.exports = router;