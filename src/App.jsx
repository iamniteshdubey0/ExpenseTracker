import "./App.css";
import { Grid, Container, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Tables from "./components/tables/Tables";
import ExpensePieChart from "./components/charts/ExpensePieChart";
import ExpenseVSIncom from "./components/charts/ExpenseVSIncom";
import IncomeRadialChart from "./components/charts/IncomeRadialChart";
import InputForm from "./components/inputform/InputForm";
import { useState, useEffect } from "react";

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formDataList")) || [];
    setAllTransactions(storedData);
  }, []);

  const expenseList = allTransactions.filter((transaction) => {
    return transaction.type === "Expense";
  });

  const incomeList = allTransactions.filter((transaction) => {
    return transaction.type === "Income";
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        p: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid sx={{ p: 1, mb: 2 }} item xs={12}>
          <Paper
            elevation={1}
            sx={{
              width: "100%",
              p: 1,
              textTransform: "uppercase",
            }}
          >
            <Divider sx={{mb:2}}>
              <Chip label="Transactions Form" variant="outlined" color="success" size="medium" />
            </Divider>
            <InputForm
              setAllTransactions={setAllTransactions}
              allTransactions={allTransactions}
              editTransaction={editTransaction}
              setEditTransaction={setEditTransaction}
            />
          </Paper>
        </Grid>
        <Grid sx={{ p: 1 }} item xs={12} sm={6} md={4}>
          <Paper
            elevation={1}
            sx={{
              height:230,
              width:"100%",
              p: 1,
              textTransform: "uppercase",
            }}
          >
            <Divider>
              <Chip label="Expenses" size="small" />
            </Divider>
            {expenseList.length > 0 ? (
              <ExpensePieChart expenseList={expenseList}></ExpensePieChart>
            ) : (
              <p>No Data</p>
            )}
          </Paper>
        </Grid>
        <Grid sx={{ p: 1 }} item xs={12} sm={6}  md={4}>
          <Paper
            elevation={1}
            sx={{
              height: 230,
              width: "100%",
              p: 1,
              textTransform: "uppercase",
            }}
          >
            <Divider>
              <Chip label="Ex VS In" size="small" />
            </Divider>
            {expenseList.length > 0 && incomeList.length > 0 ? (
              <ExpenseVSIncom
                expenseList={expenseList}
                incomeList={incomeList}
              ></ExpenseVSIncom>
            ) : (
              <p>No Data</p>
            )}
          </Paper>
        </Grid>
        <Grid sx={{ p: 1 }} item xs={12} sm={6} md={4}>
          <Paper
            elevation={1}
            sx={{
              height: 230,
              width: "100%",
              p: 1,
              textTransform: "uppercase",
            }}
          >
            <Divider>
              <Chip label="Income" size="small" />
            </Divider>
            {incomeList.length > 0 ? (
              <IncomeRadialChart incomeList={incomeList}></IncomeRadialChart>
            ) : (
              <p>No Data</p>
            )}
          </Paper>
        </Grid>
        <Grid sx={{ p: 1, mt: 2 }} item xs={12}>
          <Tables
            setAllTransactions={setAllTransactions}
            allTransactions={allTransactions}
            setEditTransaction={setEditTransaction}
          ></Tables>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
