import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./OrdersTable.module.css";

const BUY_COLOR = "#00ff11";
const SELL_COLOR = "#ff1111";
function PendingOrdersTable({ fetchData }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/pending`
      );
      setOrders(response.data);
    };
    fetchOrders();
    console.log("fetching data from pending orders");
  }, [fetchData]);

  const buyOrders = [];
  const sellOrders = [];

  // Separate the buy and sell orders
  orders.forEach((each) => {
    if (each.orderType === "BUY") {
      buyOrders.push(each);
    } else {
      sellOrders.push(each);
    }
  });

  // Sort the buy and sell orders
  buyOrders.sort((a, b) => b.price - a.price);
  sellOrders.sort((a, b) => a.price - b.price);

  return (
    <table className={styles.table}>
      <caption>Pending Orders</caption>
      <thead>
        <tr>
          <th style={{ color: BUY_COLOR }}>Buyer Qty</th>
          <th style={{ color: BUY_COLOR }}>Buyer Price</th>
          <th style={{ color: SELL_COLOR }}>Seller Price</th>
          <th style={{ color: SELL_COLOR }}>Seller Qty</th>
        </tr>
      </thead>
      <tbody>
        {buyOrders.map((buyOrder, index) => (
          <tr key={`buy-${buyOrder._id}`}>
            <td style={{ color: BUY_COLOR }}>{buyOrder.quantity}</td>
            <td style={{ color: BUY_COLOR }}>{buyOrder.price}</td>
            <td style={{ color: SELL_COLOR }}>
              {sellOrders[index] ? sellOrders[index].price : ""}
            </td>
            <td style={{ color: SELL_COLOR }}>
              {sellOrders[index] ? sellOrders[index].quantity : ""}
            </td>
          </tr>
        ))}
        {sellOrders.length > buyOrders.length &&
          sellOrders.slice(buyOrders.length).map((sellOrder) => (
            <tr key={`sell-${sellOrder._id}`}>
              <td></td>
              <td></td>
              <td style={{ color: SELL_COLOR }}>{sellOrder.price}</td>
              <td style={{ color: SELL_COLOR }}>{sellOrder.quantity}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default PendingOrdersTable;
