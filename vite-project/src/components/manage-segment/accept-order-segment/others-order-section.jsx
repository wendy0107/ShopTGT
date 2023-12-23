import React from "react";
import OrderCard from "../order-card";
import { Typography } from "@mui/material";

function OthersOrderSection({ orders, items, showFinalOrder }) {
  return (
    <div>
      <Typography
        variant="h5"
        sx={{ marginRight: "1rem", fontSize: "1.3rem" }}
      >
        Other&apos;s orders
      </Typography>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          buyerEmail={"dummy@mailinator.com"}
          phone={'0123413556'}
          items={items}
          orderQuantities={showFinalOrder ? order.finalQuantities : order.orderQuantities}
        />
      ))}
    </div>
  );
}

export default OthersOrderSection;
