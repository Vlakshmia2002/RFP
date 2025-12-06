const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ status: "OK", db_time: result[0].now });
  } catch (err) {
    res.json({ status: "ERROR", message: err.message });
  }
});

module.exports = router;
