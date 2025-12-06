const express = require("express");
const router = express.Router();
const controller = require("../controllers/vendorController");

router.get("/", controller.getVendors);
router.post("/", controller.createVendor);

module.exports = router;
