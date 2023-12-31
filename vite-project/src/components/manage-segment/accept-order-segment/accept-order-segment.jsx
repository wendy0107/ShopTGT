import React, { useState, useEffect } from "react";
import YourOrderSection from "./your-order-section";
import OthersOrderSection from "./others-order-section";
import { Button, Divider } from "@mui/material";

function AcceptOrderSegment({
  listing,
  ownerOrder,
  otherOrders,
  items,
  buyerDetails,
  ownerDetails,
  // ownerOrderQuantities,
  // setOwnerOrderQuantities,
  setCurrentStage
}) {
  const [ownerOrderQuantities, setOwnerOrderQuantities] = useState(
    items.map((item) => 0)
  );

  // update owner order quantity when loaded
  useEffect(() => {
    const hasOrders = ownerOrder[0]?.item_quantities?.some(
      (quantity) => quantity > 0
    );
    if (hasOrders) {
      setOwnerOrderQuantities(ownerOrder[0].item_quantities);
    }
  }, [ownerOrder]);

  const handleCloseOrder = () => {
    setCurrentStage("CLOSED");
  };
  return (
    <>
      <YourOrderSection
        listing={listing}
        items={items}
        ownerOrderQuantities={ownerOrderQuantities}
        ownerDetails={ownerDetails}
        setOwnerOrderQuantities={setOwnerOrderQuantities}
        userID={listing.owner_id}
      />
      <Divider sx={{ margin: "2rem" }} />
      <OthersOrderSection
        orders={otherOrders}
        items={items}
        showFinalOrder={false}
        buyerDetails={buyerDetails}
      />
      <div style={{ textAlign: "right", margin: "1rem" }}>
        <Button variant="contained" onClick={handleCloseOrder}>
          Close order
        </Button>
      </div>
    </>
  );
}

export default AcceptOrderSegment;
