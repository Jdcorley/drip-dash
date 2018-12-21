const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");

const propertyController = require("../controllers/propertyController");

router.get("/properties", helper.ensureAuthenticated, propertyController.index);
router.get("/properties/new", helper.ensureAuthenticated, propertyController.new);
router.post("/properties/create", helper.ensureAuthenticated, propertyController.create);
router.get("/properties/:id", helper.ensureAuthenticated, propertyController.show);

module.exports = router;