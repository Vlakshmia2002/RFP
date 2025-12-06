const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({
      status: "OK",
      message: "Prisma is connected to PostgreSQL",
      serverTime: result[0].now
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

module.exports = router;
