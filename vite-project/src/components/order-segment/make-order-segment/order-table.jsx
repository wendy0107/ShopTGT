import React from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function OrderTable({ items, orderQuantities, setOrderQuantities }) {
  const handleQuantityChange = async (index, delta) => {
    const newQuantities = [...orderQuantities];
    const newQuantity = Math.max(
      0,
      Math.min(newQuantities[index] + delta, items[index].remaining_quantity)
    );
    newQuantities[index] = newQuantity;
    setOrderQuantities(newQuantities);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell sx={{ width: "5%" }}>{index + 1}</TableCell>
                <TableCell sx={{ width: "60%" }}>{item.name}</TableCell>
                <TableCell sx={{ width: "10%" }}>{`$${item.price}`}</TableCell>
                <TableCell sx={{ width: "25%" }} align="right">
                  <IconButton
                    onClick={() => handleQuantityChange(index, -1)}
                    disabled={orderQuantities[index] === 0}
                  >
                    <ArrowLeftIcon />
                  </IconButton>
                  <Input
                    type="tel"
                    value={orderQuantities[index]}
                    min={0}
                    max={item.remaining_quantity}
                    sx={{ width: "25%" }}
                    onChange={(e) => {
                      setOrderQuantities((prevQuantities) => {
                        return prevQuantities.map((qty, i) =>
                          i === index
                            ? Math.min(e.target.value, item.remaining_quantity)
                            : qty
                        );
                      });
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ display: "inline-block" }}
                  >{`/${item.remaining_quantity}`}</Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(index, 1)}
                    disabled={
                      orderQuantities[index] === item.remaining_quantity
                    }
                  >
                    <ArrowRightIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderTable;
