const mongoose = require("mongoose");

const pendingOrderSchema = new mongoose.Schema({
  orderType: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PendingOrder", pendingOrderSchema);
