import { React, useEffect, useState } from "react";
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

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({
  labelArray,
  dataArray,
  title = "My Goal",
  xAxisLabel = "Age",
}) {
  const data = {
    labels: labelArray.map((age) => `${xAxisLabel} ${age}`),
    datasets: [
      {
        label: title,
        data: dataArray,
        backgroundColor: "#7F7FD5",
        fill: "rgba(75, 192, 192,0.6)",
        borderColor: "rgba(75, 192, 192,0.6)",
        borderWidth: "1",
        tension: 0.4,
        pointHoverBackgroundColor: "rgba(75, 192, 192,0.8)",
        pointHoverBorderColor: "rgba(75, 192, 192,0.4)",
      },
    ],
  };

  const plugins = {};

  const options = {
    scales: {
      x: {
        grid: {
          color: "rgba(75, 192, 192,0.1)",
          borderWidth: 2,
          lineWidth: 1,
        },
        tick: {
          backdropColor: "rgba(75, 192, 192,0.9)",
        },
      },
      y: {
        grid: {
          color: "rgba(75, 192, 192,0.1)",
          borderWidth: 2,
          lineWidth: 1,
        },
        tick: {
          backdropColor: "rgba(75, 192, 192,0.9)",
        },
      },
    },
    locale: "en-IN",
    plugins: {
      title: {
        display: false,
        text: "Custom Chart Title",
        align: "left",
        position: "bottom",
        padding: {
          top: 10,
          bottom: 30,
        },
      },

      //Legend Settings
      legend: {
        display: false,
        labels: {
          color: "rgb(255, 99, 132)",
        },
      },
      //Tooltip Settings
      tooltip: {
        backgroundColor: "rgba(127, 127, 213, 0.9)",
        padding: 14,
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 14,
        },
        boxPadding: 4,
        callbacks: {
          labelTextColor: function (context) {
            return "#FFFFFF";
          },
        },
      },
    },
  };

  return <Line datasetIdKey="id" options={options} data={data} />;
}

// tooltip options

/* 
callbacks: {
  labelColor: function (context) {
    return {
      borderColor: "rgb(0, 0, 255)",
      backgroundColor: "rgb(255, 0, 0)",
      borderWidth: 2,
      borderDash: [2, 2],
      borderRadius: 2,
    };
  },
  labelTextColor: function (context) {
    return "#543453";
  },
 */

/* 
  {
    layout: {
      padding: 0,
    },

    tooltips: {
      backgroundColor: "#FFF",
      titleFontSize: 16,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 14,
      displayColors: false,
    },

    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: `${title}`,
      },
    },
  }; */
