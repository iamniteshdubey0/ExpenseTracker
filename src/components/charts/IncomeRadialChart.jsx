import React from "react";
import Chart from "react-apexcharts";

const IncomeRadialChart = ({ incomeList }) => {
  const aggregatedData = incomeList.reduce((accumulate, item) => {
    const category = item.category;
    const amount = parseInt(item.amount, 10);
    if (category && !isNaN(amount)) {
      if (accumulate[category]) {
        accumulate[category] += amount;
      } else {
        accumulate[category] = amount;
      }
    }

    return accumulate;
  }, {});

  const labels = Object.keys(aggregatedData);
  const series = Object.values(aggregatedData);
  const totalAmount = series.reduce((sum, value) => sum + value, 0);

  return (
    <Chart
      height={230}
      width={"100%"}
      type="radialBar"
      series={series}
      options={{
        labels: labels,
        plotOptions: {
          radialBar: {
            hollow: {
              size: "40%",
            },
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
                formatter: (value) => {
                  return `₹${value}`;
                },
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (_w) {
                  return `₹${totalAmount}`;
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default IncomeRadialChart;
