import React, { useState } from "react";
import OrderForm from "./components/OrderForm";
import PendingOrdersTable from "./components/PendingOrdersTable";
import CompletedOrdersTable from "./components/CompletedOrdersTable";
import PriceChart from "./components/PriceChart";
import "./App.css";

function App() {
  const [fetchData, setFetchData] = useState(false);
  return (
    <div className="container">
      <h1>Order Matching System</h1>
      <div className="card">
        <h2>Place Order</h2>
        <OrderForm setFetchData={setFetchData} />
      </div>
      <div className="details-container">
        <div className="tables-container">
          <PendingOrdersTable fetchData={fetchData} />
          <CompletedOrdersTable fetchData={fetchData} />
        </div>

        <div className="price-chart-container">
          <h2>Price Chart</h2>
          <PriceChart fetchData={fetchData} />
        </div>
      </div>
    </div>
  );
}

export default App;
