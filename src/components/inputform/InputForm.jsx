import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const InputForm = ({
  setAllTransactions,
  allTransactions,
  editTransaction,
  setEditTransaction,
}) => {
  const exType = [
    {
      label: "Income",
      subCategories: ["Salary", "Rent", "Loan"],
    },
    {
      label: "Expense",
      subCategories: ["Food", "Rent", "Loan", "Miscllineous"],
    },
  ];

  const [selectedType, setSelectedType] = useState("");
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTransaction) {
      setFormData(editTransaction);
      setSelectedType(editTransaction.type);
    }
  }, [editTransaction]);

  const validateForm = ()=>{
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.remark) newErrors.remark = "Remarks are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSelectedTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const selectedSubCategories =
    exType.find((option) => option.label === selectedType)?.subCategories || [];

  const [formData, setFormData] = useState({
    id: "",
    amount: "",
    type: "",
    category: "",
    remark: "",
    date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || "",
    }));
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (editTransaction) {
      const updatedData = allTransactions.map((transaction) =>
        transaction.id === editTransaction.id ? formData : transaction
      );
      localStorage.setItem("formDataList", JSON.stringify(updatedData));
      setAllTransactions(updatedData);
      setEditTransaction(null);
    } else {
      const newFormData = {
        ...formData,
        date: new Date().toISOString(),
        id: Math.floor(Math.random() * 1000),
      };
      const updatedData = [...allTransactions, newFormData];
      localStorage.setItem("formDataList", JSON.stringify(updatedData));
      setAllTransactions(updatedData);
    }
    setFormData({
      id: "",
      amount: "",
      type: "",
      category: "",
      remark: "",
      date: "",
    });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleInputSubmit}
      sx={{ p: 1, flexGrow: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} sx={{ p: 1 }}>
          <TextField
            required
            id="transaction-amount"
            label="Amount"
            placeholder="100"
            sx={{ width: "100%" }}
            size="small"
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleInputChange}
            error={!!errors.amount}
            helperText={errors.amount}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ p: 1 }}>
          <TextField
            id="transaction-type"
            select
            label="Type"
            sx={{ width: "100%" }}
            size="small"
            value={formData.type || ""}
            name="type"
            onChange={(event) => {
              handleInputChange(event);
              handleSelectedTypeChange(event);
            }}
            error={!!errors.type}
            helperText={errors.type}
          >
            {exType.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ p: 1 }}>
          <TextField
            id="transaction-category"
            select
            label="Category"
            sx={{ width: "100%" }}
            size="small"
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            error={!!errors.category}
            helperText={errors.category}
          >
            {selectedSubCategories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={8} sx={{ p: 1}}>
          <TextField
            required
            id="transaction-remark"
            label="Remarks"
            placeholder="use only 07 word atmost!"
            sx={{ width: "100%" }}
            size="small"
            type="text"
            name="remark"
            value={formData.remark || ""}
            onChange={handleInputChange}
            error={!!errors.remark}
            helperText={errors.remark}
          />
        </Grid>
        <Grid item xs={12} sm={12} sx={{ p: 1}}>
          <Button type="submit" variant="contained" startIcon={<SendIcon />}>
            {editTransaction ? "Update" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;
