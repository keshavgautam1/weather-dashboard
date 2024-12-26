import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

const WeatherGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new Chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.time,
        datasets: [
          {
            label: "Max Temperature (°C)",
            data: data.temperature_2m_max,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
          {
            label: "Min Temperature (°C)",
            data: data.temperature_2m_min,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Weather Trends",
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance when the component unmounts or updates
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]); // Re-run effect when `data` changes

  return <canvas ref={chartRef}></canvas>;
};

export default WeatherGraph;
