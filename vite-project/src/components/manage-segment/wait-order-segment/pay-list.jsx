import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

function PayList({ orders, items }) {
  //   const [paidStatuses, setPaidStatuses] = useState(
  //     orders.map((order) => order.paid)
  //   );
  //   const handlePaidStatusChange = (orderIndex) => (event) => {
  //     // update paid status of order
  //     const newPaidStatuses = [...paidStatuses];
  //     newPaidStatuses[orderIndex] = !event.target.value;
  //     setPaidStatuses(newPaidStatuses);
  //   };
  const handlePaidStatusChange = (orderIndex) => async (event) => {
    // update paid status
    // console.log('checked', event.target.checked)
    try {
      const response = await fetch(
        `http://localhost:3000/orders/${orders[orderIndex].listing_id}/${orders[orderIndex].buyer_id}/update-payment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payed: event.target.checked }),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ marginTop: "1rem", marginRight: "1rem", fontSize: "1.3rem" }}
      >
        Pay List
      </Typography>
      <TableContainer component="div">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Buyer&apos;s email</TableCell>
              <TableCell align="right">Payable amount</TableCell>
              <TableCell align="right">Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{"hngshanhern@gmailcom"}</TableCell>
                <TableCell align="right">
                  {/* Calculate Payable Amount Here */}
                  {/* Assuming items and orderQuantities are structured correctly */}
                  {`$${order.finalised_quantities
                    .reduce((total, qty, i) => total + qty * items[i].price, 0)
                    .toFixed(2)}`}
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    defaultChecked={order.has_payed}
                    onChange={handlePaidStatusChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PayList;
