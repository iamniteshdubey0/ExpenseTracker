import React from "react";
import Chart from "react-apexcharts";

const ExpensePieChart = ({ expenseList }) => {
  const aggregatedData = expenseList.reduce((acc, item) => {
    const category = item.category;
    const amount = parseInt(item.amount, 10);
    if (category && !isNaN(amount)) {
      if (acc[category]) {
        acc[category] += amount;
      } else {
        acc[category] = amount;
      }
    }

    return acc;
  }, {});
  const labels = Object.keys(aggregatedData);
  const series = Object.values(aggregatedData);

  return (
    <Chart
      type="pie"
      height={230}
      width={"100%"}
      series={series}
      options={{
        labels: labels,
        legend: {
          show: false
        }
      }}
    />
  );
};

export default ExpensePieChart;
