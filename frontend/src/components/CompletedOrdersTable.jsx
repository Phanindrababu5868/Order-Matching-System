import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./OrdersTable.module.css";

function CompletedOrdersTable({ fetchData }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/completed`
      );
      setOrders(response.data);
    };

    fetchOrders();
    console.log("fetching data from completed orders");
  }, [fetchData]);

  return (
    <table className={styles.table}>
      <caption>Completed Orders</caption>
      <thead>
        <tr>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.price}</td>
            <td>{order.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CompletedOrdersTable;
