import React from "react";
import { Alert, Button, Typography } from "@mui/material";
import OrderSummary from "./order-summary";

function ViewSummarySegment({
  listing,
  orderQuantities,
  setCurrentStage,
  items,
}) {
  const handleAmendOrder = () => {
    setCurrentStage((prevStage) => Math.max(prevStage - 1, 0));
    // no need to change remainingQty and orderQuantities here
  };

  const renderButton = () => {
    return (
      <Button
        variant="contained"
        onClick={handleAmendOrder}
        color="error"
        disabled={listing.status == "CLOSED"}
        sx={{ fontSize: "1rem", fontWeight: "600", margin: "1.2rem 0" }}
      >
        Amend order
      </Button>
    );
  };
  return (
    <>
      <Alert severity="warning" sx={{ mt: 5 }}>
        {listing.status == "CLOSED"
          ? "The owner has closed the listing. Please contact the owner if you want to make amendments."
          : "The listing is still open! You may still amend your order."}
      </Alert>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <OrderSummary
        items={items}
        orderQuantities={orderQuantities}
        toDisplayAll={true}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {renderButton()}
      </div>
    </>
  );
}

export default ViewSummarySegment;
