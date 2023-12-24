import React from "react";
import { Typography } from "@mui/material";
import OrderSummary from "../../order-segment/view-summary-segment/order-summary";

function TotalOrderList({ items, orders }) {
  const renderContent = () => {
    if (orders && orders.length > 0) {
      const totalOrderQuantities = orders.reduce((acc, order) => {
        const combinedQuantities = acc.map(
          (qty, index) => qty + order.item_quantities[index]
        );
        return combinedQuantities;
      }, Array(orders[0].item_quantities.length).fill(0)); // Initialize with zeros
      return (
        <OrderSummary
          items={items}
          orderQuantities={totalOrderQuantities}
          toDisplayAll={false}
        />
      );
    } else {
      return (
        <Typography variant="body1" sx={{ marginTop: "2rem" }}>
          No orders were made.
        </Typography>
      );
    }
  };
  return (
    <>
      <Typography
        variant="h5"
        sx={{ marginTop: "2rem", marginRight: "1rem", fontSize: "1.3rem" }}
      >
        Total Order List
      </Typography>
      {renderContent()}
    </>
  );
}

export default TotalOrderList;
