const express = require("express");
const router = express.Router();
const controller = require("../controllers/proposalController");

router.get("/", controller.getProposals);

module.exports = router;
