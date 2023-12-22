import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";

function OrderSummary({ items, orderQuantities, toDisplayAll }) {
  const theme = useTheme();

  if (!toDisplayAll) {
    items = items.filter((item, index) => orderQuantities[index] > 0);
  }
  

  const totalPayableAmount = items.reduce((total, item, index) => {
    return total + item.price * orderQuantities[index];
  }, 0);

  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.yellow }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{orderQuantities[index]}</TableCell>
                <TableCell>{`$${item.price}`}</TableCell>
                <TableCell align="right">
                  {`$${item.price * orderQuantities[index]}`}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="left">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Payable Amount
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {`$${totalPayableAmount.toFixed(2)}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderSummary;
