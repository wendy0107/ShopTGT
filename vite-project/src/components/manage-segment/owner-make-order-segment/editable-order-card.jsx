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

function EditableOrderCard({ buyerEmail, items, orderQuantities }) {
  const [editedQuantities, setEditedQuantities] = useState(orderQuantities);

  const handleQuantityChange = (index, delta) => {
    // const newValue = Math.max(0, parseInt(event.target.value)); // Prevent negative values
    const newQuantities = [...editedQuantities];
    const newQuantity = Math.max(
      0,
      Math.min(newQuantities[index] + delta, orderQuantities[index])
    );
    newQuantities[index] = newQuantity;
    setEditedQuantities(newQuantities); 
    // need to write the changes here
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
                      max={orderQuantities[index]}
                      sx={{ width: "25%" }}
                    />
                    <IconButton
                      onClick={() => handleQuantityChange(index, 1)}
                      disabled={
                        editedQuantities[index] === orderQuantities[index]
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
