const express = require("express");
const router = express.Router();
const PendingOrder = require("../models/PendingOrder");
const CompletedOrder = require("../models/CompletedOrder");
const { placeOrder } = require("../services/orderMatchingService");

router.get("/pending", async (req, res) => {
  const pendingOrders = await PendingOrder.find().sort({ createdAt: -1 });

  res.json(pendingOrders);
});

router.get("/completed", async (req, res) => {
  const completedOrders = await CompletedOrder.find().sort({ executedAt: -1 });
  res.json(completedOrders);
});

router.post("/place", async (req, res) => {
  const { orderType, quantity, price } = req.body;
  try {
    const matchedQuantity = await placeOrder(orderType, quantity, price);
    res.json({ success: true, matchedQuantity });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
