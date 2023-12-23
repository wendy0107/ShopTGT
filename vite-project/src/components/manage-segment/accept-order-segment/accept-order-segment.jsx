import React, { useState } from "react";
import YourOrderSection from "./your-order-section";
import OthersOrderSection from "./others-order-section";
import { Button, Divider } from "@mui/material";

function AcceptOrderSegment({
  listing,
  orders,
  ownerOrderQuantities,
  setOwnerOrderQuantities,
  setCurrentStage,
}) {
  const handleCloseOrder = () => {
    setCurrentStage("CLOSED");
  };
  return (
    <>
      <YourOrderSection
        listing={listing}
        ownerOrderQuantities={ownerOrderQuantities}
        setOwnerOrderQuantities={setOwnerOrderQuantities}
      />
      <Divider sx={{margin: '2rem'}}/>
      <OthersOrderSection orders={orders} items={listing.items} showFinalOrder={false}/>
      <div style={{textAlign:"right", margin: "1rem"}}>
        <Button variant="contained" onClick={handleCloseOrder}>
          Close order
        </Button>
      </div>
    </>
  );
}

export default AcceptOrderSegment;
