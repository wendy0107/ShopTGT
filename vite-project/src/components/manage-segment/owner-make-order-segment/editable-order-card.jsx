import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  IconButton,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function EditableOrderCard({ buyerEmail, items, order }) {
  const orderQuantities = order.finalised_quantities;

  const [editedQuantities, setEditedQuantities] = useState(orderQuantities);

  const handleQuantityChange = async (index, delta) => {
    // const newValue = Math.max(0, parseInt(event.target.value)); // Prevent negative values
    const newQuantities = [...editedQuantities];
    const newQuantity = Math.max(
      0,
      Math.min(newQuantities[index] + delta, order.item_quantities[index])
    );
    newQuantities[index] = newQuantity;

    try {
      const response = await fetch(
        `http://localhost:3000/listings/${order.listing_id}/${order.buyer_id}/finalise-order`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ finalised_quantities: newQuantities }),
        }
      );
      const data = await response.json();
      console.log("update quantities (editable order card", data);
      setEditedQuantities(newQuantities);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom component="div">
          {buyerEmail}&apos;s order
        </Typography>
        <TableContainer component={CardContent}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleQuantityChange(index, -1)}
                      disabled={editedQuantities[index] === 0}
                    >
                      <ArrowLeftIcon />
                    </IconButton>
                    <Input
                      type="tel"
                      value={editedQuantities[index]}
                      min={0}
                      max={order.item_quantities[index]}
                      sx={{ width: "25%" }}
                    />
                    <IconButton
                      onClick={() => handleQuantityChange(index, 1)}
                      disabled={
                        editedQuantities[index] === order.item_quantities[index]
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
      </CardContent>
    </Card>
  );
}

export default EditableOrderCard;
