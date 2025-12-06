// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/rfps", require("./routes/rfps"));
// app.use("/api/vendors", require("./routes/vendors"));
// app.use("/api/proposals", require("./routes/proposals"));

// app.get("/", (req, res) => res.send("RFP AI Backend Running"));

// const PORT = 4000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


const express = require("express");
const cors = require("cors");
const app = express();

// REQUIRED – without this POST requests break
app.use(express.json());

// CORS (optional but recommended)
app.use(cors());

// ROUTES
app.use("/api/vendors", require("./routes/vendors"));
app.use("/api/proposals", require("./routes/proposals"));
app.use("/api/rfps", require("./routes/rfps"));

// START SERVER
app.listen(4000, () => console.log("Server running on port 4000"));
