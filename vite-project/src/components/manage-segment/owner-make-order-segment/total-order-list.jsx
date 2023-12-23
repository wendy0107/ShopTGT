import React from "react";
import { Typography } from "@mui/material";
import OrderSummary from "../../order-segment/view-summary-segment/order-summary";

function TotalOrderList({ items, orders }) {
  const totalOrderQuantities = orders.reduce((acc, order) => {
    const combinedQuantities = acc.map(
      (qty, index) => qty + order.orderQuantities[index]
    );
    return combinedQuantities;
  }, Array(orders[0].orderQuantities.length).fill(0)); // Initialize with zeros

  return (
    <>
      <Typography
        variant="h5"
        sx={{ marginTop: "2rem", marginRight: "1rem", fontSize: "1.3rem" }}
      >
        Total Order List
      </Typography>
      <OrderSummary
        items={items}
        orderQuantities={totalOrderQuantities}
        toDisplayAll={false}
      />
    </>
  );
}

export default TotalOrderList;
