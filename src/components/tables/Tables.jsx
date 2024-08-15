import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Tables = ({
  allTransactions,
  setAllTransactions,
  setEditTransaction,
}) => {
  const getTransactionID = (event) => {
    const row = event.currentTarget.closest("tr");
    const transactionId = row.getAttribute("data-id");
    return transactionId;
  };
  const handleDelete = (event) => {
    updateStoredData(getTransactionID(event));
  };

  const updateStoredData = (transactionId) => {
    const storedData = JSON.parse(localStorage.getItem("formDataList")) || [];
    const updatedData = storedData.filter((item) => {
      return item.id !== parseInt(transactionId);
    });
    localStorage.setItem("formDataList", JSON.stringify(updatedData));
    setAllTransactions(updatedData);
  };

  const handleEdit = (event) => {
    const transactionId = getTransactionID(event);
    const transactionToEdit = allTransactions.find(
      (transaction) => transaction.id === parseInt(transactionId)
    );
    setEditTransaction(transactionToEdit);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell size="small">Amount (₹)</TableCell>
            <TableCell size="small" align="center">
              Type
            </TableCell>
            <TableCell size="small" align="center">
              Category
            </TableCell>

            <TableCell size="small" align="center">
              Date
            </TableCell>
            <TableCell size="medium" align="center">
              Remark
            </TableCell>
            <TableCell size="small" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allTransactions.length > 0 ? (
            allTransactions.map((trans) => (
              <TableRow
                data-id={trans.id}
                key={trans.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell size="small" component="th" scope="row">
                  {trans.amount}
                </TableCell>
                <TableCell size="small" align="center">
                  {trans.type}
                </TableCell>
                <TableCell size="small" align="center">
                  {trans.category}
                </TableCell>
                <TableCell size="small" align="center">
                  {trans.date}
                </TableCell>
                <TableCell
                  sx={{ textWrap: "wrap", fontSize: "12px", width: "20%" }}
                  align="center"
                >
                  {trans.remark}
                </TableCell>
                <TableCell size="small" align="center">
                  <IconButton
                    onClick={handleEdit}
                    color="success"
                    size="small"
                    aria-label="edit"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={handleDelete}
                    color="error"
                    size="small"
                    aria-label="delete"
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
