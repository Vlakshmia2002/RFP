// // const prisma = require("../prismaClient");

// // exports.getProposals = async (req, res) => {
// //   try {
// //     const proposals = await prisma.proposal.findMany();
// //     res.json(proposals);
// //   } catch (err) {
// //     console.error("Error loading proposals:", err);
// //     res.status(500).json({ error: "Failed to load proposals" });
// //   }
// // };


// exports.getProposals = async (req, res) => {
//     try {
//         const proposals = await prisma.proposal.findMany({
//             include: { vendor: true, rfp: true }
//         });
//         res.json(proposals);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to load proposals" });
//     }
// };

// exports.addProposal = async (req, res) => {
//     try {
//         const proposal = await prisma.proposal.create({
//             data: req.body
//         });
//         res.json(proposal);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to add proposal" });
//     }
// };



const prisma = require("../prismaClient");

exports.getProposals = async (req, res) => {
  try {
    const proposals = await prisma.proposal.findMany({
      include: { rfp: true, vendor: true }
    });
    res.json(proposals);
  } catch (err) {
    console.error("Error loading proposals:", err);
    res.status(500).json({ error: "Failed to load proposals" });
  }
};

exports.createProposal = async (req, res) => {
  try {
    const { vendorId, rfpId, amount, details } = req.body;

    if (!vendorId || !rfpId || !amount) {
      return res.status(400).json({ error: "vendorId, rfpId, and amount required" });
    }

    const proposal = await prisma.proposal.create({
      data: {
        vendorId,
        rfpId,
        amount,
        details: details || null
      }
    });

    res.json(proposal);
  } catch (err) {
    console.error("Error creating proposal:", err);
    res.status(500).json({ error: "Failed to create proposal" });
  }
};
