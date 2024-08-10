const PendingOrder = require("../models/PendingOrder");
const CompletedOrder = require("../models/CompletedOrder");

async function placeOrder(orderType, quantity, price) {
  let remainingQuantity = quantity;

  if (orderType === "BUY") {
    const matchingSells = await PendingOrder.find({
      orderType: "SELL",
      price: { $lte: price },
    }).sort({ price: 1, createdAt: 1 });

    for (const sell of matchingSells) {
      if (remainingQuantity <= 0) break;

      const matchedQuantity = Math.min(sell.quantity, remainingQuantity);
      const executionPrice = sell.price;

      await CompletedOrder.create({
        price: executionPrice,
        quantity: matchedQuantity,
      });

      sell.quantity -= matchedQuantity;
      if (sell.quantity === 0) {
        await PendingOrder.deleteOne({ _id: sell._id });
      } else {
        await sell.save();
      }

      remainingQuantity -= matchedQuantity;
    }
  } else if (orderType === "SELL") {
    const matchingBuys = await PendingOrder.find({
      orderType: "BUY",
      price: { $gte: price },
    }).sort({ price: -1, createdAt: 1 });

    for (const buy of matchingBuys) {
      if (remainingQuantity <= 0) break;

      const matchedQuantity = Math.min(buy.quantity, remainingQuantity);
      const executionPrice = buy.price;

      await CompletedOrder.create({
        price: executionPrice,
        quantity: matchedQuantity,
      });

      buy.quantity -= matchedQuantity;
      if (buy.quantity === 0) {
        await PendingOrder.deleteOne({ _id: buy._id });
      } else {
        await buy.save();
      }

      remainingQuantity -= matchedQuantity;
    }
  } else {
    throw new Error("Invalid order type");
  }

  if (remainingQuantity > 0) {
    await PendingOrder.create({
      orderType,
      quantity: remainingQuantity,
      price,
    });
  }

  return quantity - remainingQuantity;
}

module.exports = { placeOrder };
