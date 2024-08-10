import React, { useState } from "react";
import axios from "axios";
import styles from "./OrderForm.module.css";
import { enqueueSnackbar } from "notistack";

function OrderForm({ setFetchData }) {
  const [orderType, setOrderType] = useState("BUY");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubMitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubMitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/place`,
        {
          orderType,
          quantity: Number(quantity),
          price: Number(price),
        }
      );
      console.log(response);
      setOrderType("BUY");
      setQuantity("");
      setPrice("");
      enqueueSnackbar("order placed Successfully", {
        variant: "success",
      });
      setFetchData(new Date().getTime());
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setSubMitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select
        className={styles.select}
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
      >
        <option value="BUY">Buy</option>
        <option value="SELL">Sell</option>
      </select>
      <input
        className={styles.input}
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <input
        className={styles.input}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <button className={styles.button} type="submit" disabled={submitting}>
        {submitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}

export default OrderForm;
