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

function OrderSummary({
  items,
  orderQuantities,
  toDisplayAll,
  excludePrice,
  sx,
}) {
  const theme = useTheme();

  if (!toDisplayAll) {
    // console.log("order summary items", items);
    // console.log("order summary orderQuantities", orderQuantities);
    let filteredItems = items?.filter(
      (item, index) => orderQuantities?.[index] > 0
    );
    let filteredQuantites = orderQuantities?.filter((_, index) =>
      filteredItems.includes(items[index])
    );
    items = filteredItems;
    orderQuantities = filteredQuantites;
    // console.log('filtered items', filteredItems)
  }

  const totalPayableAmount = items?.reduce((total, item, index) => {
    return total + item.price * orderQuantities?.[index];
  }, 0);
  // console.log("total payable amount", totalPayableAmount);

  return (
    <Box sx={{ mt: 3, ...sx }}>
      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.yellow }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              {!excludePrice && <TableCell align="right">Total</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{`$${item.price}`}</TableCell>
                <TableCell>{orderQuantities?.[index]}</TableCell>
                {!excludePrice && (
                  <TableCell align="right">
                    {`$${item.price * orderQuantities?.[index]}`}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {!excludePrice && (
              <TableRow>
                <TableCell colSpan={4} align="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Total Payable Amount
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {`$${totalPayableAmount?.toFixed(2)}`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderSummary;
