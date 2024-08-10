const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orders");
const connectDB = require("./config.js");
const dotenv = require("dotenv");

dotenv.config();
connectDB();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
