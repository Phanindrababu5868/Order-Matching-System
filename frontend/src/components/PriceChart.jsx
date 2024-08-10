import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./PriceChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart({ fetchData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/completed`
        );
        const data = response.data;

        if (data && data.length > 0) {
          setChartData({
            labels: data.map((order) =>
              new Date(order.executedAt).toLocaleTimeString()
            ),
            datasets: [
              {
                label: "Price",
                data: data.map((order) => order.price),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
    console.log("fetching data from price chart");
  }, [fetchData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Price Chart",
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default PriceChart;
