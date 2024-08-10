const mongoose = require("mongoose");

const completedOrderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  executedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CompletedOrder", completedOrderSchema);
