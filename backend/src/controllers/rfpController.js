const prisma = require("../prismaClient");
const ai = require("../services/aiService");

exports.createRFP = async (req, res) => {
  try {
    const { naturalText } = req.body;

    if (!naturalText || typeof naturalText !== "string") {
      return res.status(400).json({ error: "naturalText required" });
    }

    const extracted = await ai.extractRFP(naturalText);

    if (!extracted || !extracted.title) {
      return res.status(500).json({ error: "AI extraction failed" });
    }

    // const rfp = await prisma.rFP.create({
    //   data: {
    //     title: extracted.title,
    //     description: extracted.description || "",
    //     totalBudget: extracted.totalBudget || null,
    //     deliveryDays: extracted.deliveryDays || null,
    //     terms: extracted.terms || null,
    //   },
    // });

    const rfp = await prisma.rFP.create({
    data: {
        title: extracted.title,
        description: extracted.description || "",
        totalBudget: extracted.totalBudget || null,
        deliveryDays: extracted.deliveryDays || null,
        terms: extracted.terms || null,
    },
});


    return res.json({ rfp });
  } catch (err) {
    console.error("Error creating RFP:", err);
    res.status(500).json({ error: "Failed to create RFP" });
  }
};

exports.getRFPs = async (req, res) => {
  try {
    const rfps = await prisma.rFP.findMany();
    res.json(rfps);
  } catch (err) {
    console.error("Error loading RFPs:", err);
    res.status(500).json({ error: "Failed to load RFPs" });
  }
};

exports.getRFP = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const rfp = await prisma.rFP.findUnique({ where: { id } });
    res.json(rfp);
  } catch (err) {
    console.error("Error loading RFP:", err);
    res.status(500).json({ error: "Failed to load RFP" });
  }
};
