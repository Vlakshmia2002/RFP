const express = require("express");
const router = express.Router();
const controller = require("../controllers/rfpController");

router.post("/", controller.createRFP);
router.get("/", controller.getRFPs);
router.get("/:id", controller.getRFP);

module.exports = router;
