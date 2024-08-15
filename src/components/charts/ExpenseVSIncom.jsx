import React from "react";
import Chart from "react-apexcharts";

const ExpenseVSIncom = ({incomeList, expenseList}) => {
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  // Aggregate data by month or any other relevant category
  const aggregateByMonth = (list) => {
    return list.reduce((acc, item) => {
      const month = getMonthName(item.date); // Assume each item has a date field
      const amount = parseInt(item.amount, 10);
      if (month && !isNaN(amount)) {
        if (acc[month]) {
          acc[month] += amount;
        } else {
          acc[month] = amount;
        }
      }
      return acc;
    }, {});
  };

  const aggregatedExpenses = aggregateByMonth(expenseList);
  const aggregatedIncomes = aggregateByMonth(incomeList);

  const categories = Object.keys(aggregatedExpenses).concat(Object.keys(aggregatedIncomes))
    .filter((value, index, self) => self.indexOf(value) === index); // Unique categories

  const expenseAmount = categories.map(cat => aggregatedExpenses[cat] || 0);
  const incomeAmount = categories.map(cat => aggregatedIncomes[cat] || 0);

  return (
    <Chart
      type="bar"
      height={200}
      series={[
        {
          name: "Expense",
          data: expenseAmount,
        },
        {
          name: "Income",
          data: incomeAmount,
        },
      ]}
      options={{
        chart: {
          type: "bar",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: categories,
          title: {
            text: "Month",
          },
        },
        yaxis: {
          title: {
            text: "Money",
          },
          min: 0,
          max: Math.max(...expenseAmount, ...incomeAmount) + 200,
        },
      }}
    />
  );
};

export default ExpenseVSIncom;
