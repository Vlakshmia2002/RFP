// // // const prisma = require("../prismaClient");

// // // exports.getVendors = async (req, res) => {
// // //   try {
// // //     const vendors = await prisma.vendor.findMany();
// // //     res.json(vendors);
// // //   } catch (err) {
// // //     console.error("Error loading vendors:", err);
// // //     res.status(500).json({ error: "Failed to load vendors" });
// // //   }
// // // };

// // // exports.createVendor = async (req, res) => {
// // //   try {
// // //     const { name, email } = req.body;
// // //     const v = await prisma.vendor.create({ data: { name, email } });
// // //     res.json(v);
// // //   } catch (err) {
// // //     console.error("Error creating vendor:", err);
// // //     res.status(500).json({ error: "Failed to create vendor" });
// // //   }
// // // };



// // exports.getVendors = async (req, res) => {
// //     try {
// //         const vendors = await prisma.vendor.findMany();
// //         res.json(vendors);
// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to load vendors" });
// //     }
// // };

// // exports.addVendor = async (req, res) => {
// //     try {
// //         const vendor = await prisma.vendor.create({
// //             data: req.body
// //         });
// //         res.json(vendor);
// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to add vendor" });
// //     }
// // };



// const prisma = require("../prismaClient");

// // GET vendors
// exports.getVendors = async (req, res) => {
//   try {
//     const vendors = await prisma.vendor.findMany();
//     res.json(vendors);
//   } catch (err) {
//     console.error("Error loading vendors:", err);
//     res.status(500).json({ error: "Failed to load vendors" });
//   }
// };

// // CREATE vendor
// exports.createVendor = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ error: "Name & email required" });
//     }

//     // const vendor = await prisma.vendor.create({
//     //   data: { name, email }
//     // });
//     const vendor = await prisma.vendor.create({
//       data: {
//         name,
//         email,
//         phone: req.body.phone || null,
//         address: req.body.address || null
//       }
//     });

//     res.json(vendor);
//   } catch (err) {
//     console.error("Error creating vendor:", err);
//     res.status(500).json({ error: "Failed to create vendor" });
//   }
// };



const prisma = require("../prismaClient");

exports.getVendors = async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany();
    res.json(vendors);
  } catch (err) {
    console.error("Error loading vendors:", err);
    res.status(500).json({ error: "Failed to load vendors" });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const vendor = await prisma.vendor.create({
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null
      }
    });

    res.json(vendor);
  } catch (err) {
    console.error("Error creating vendor:", err);
    res.status(500).json({ error: "Failed to create vendor" });
  }
};
