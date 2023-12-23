import React, { useState } from "react";
import { Button } from "@mui/material";
import TotalOrderList from "./total-order-list";
import AdjustFinalOrderSection from "./adjust-final-order-section";

function OwnerMakeOrderSegment({
  listing,
  orders,
  ownerOrderQuantities,
  setOwnerOrderQuantities,
  setCurrentStage,
}) {
  const handleReopen = () => {
    setCurrentStage("OPEN");
  };
  const handleCloseOrder = () => {
    setCurrentStage("FINALIZED");
  };
  return (
    <>
      <TotalOrderList orders={orders} items={listing.items} />
      <AdjustFinalOrderSection orders={orders} items={listing.items} />

        <div style={{ display: "flex", justifyContent: "space-between", margin: '2rem 0 1rem' }}>
          <Button
            variant="contained"
            color={"secondary"}
            onClick={handleReopen}
          >
            Reopen listing
          </Button>
          <Button variant="contained" onClick={handleCloseOrder}>
            Finalize order
          </Button>
        </div>

    </>
  );
}

export default OwnerMakeOrderSegment;
