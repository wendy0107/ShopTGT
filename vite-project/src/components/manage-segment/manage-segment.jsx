import React, { useState, useRef, useEffect } from "react";
import ProgressBarOwner from "./progress-bar-owner";
import { Divider, Typography } from "@mui/material";
import { listingDetails, orderDetailsArr } from "../../listing-examples";
import AcceptOrderSegment from "./accept-order-segment/accept-order-segment";
import OwnerMakeOrderSegment from "./owner-make-order-segment/owner-make-order-segment";
import WaitOrderSegment from "./wait-order-segment/wait-order-segment";
import OrderArrivedSegment from "./order-arrived-segment/order-arrived-segment";
import DeleteListingSection from "./delete-listing-section";

function ManageSegment() {
  // References (variables you want to persist but don't want them to rerender the page)
  const listing = useRef();
  listing.current = listingDetails; // STUB we constantly fetch new listing value every time so that rem qty refreshes

  const orders = useRef();
  orders.current = orderDetailsArr; // STUB

  // States
  const [currentStage, setCurrentStage] = useState("OPEN");
  const [ownerOrderQuantities, setOwnerOrderQuantities] = useState(
    listing.current.items.map((item) => 0)
  );

  // Update state for the first time
  useEffect(() => {
    const hasOrders = listing.current.ownerOrderQuantities.some(
      (quantity) => quantity > 0
    );
    setCurrentStage(listing.current.status);
    if (hasOrders) {
      setOwnerOrderQuantities(listing.current.ownerOrderQuantities);
    }
  }, []);
  const renderContent = () => {
    switch (currentStage) {
      case "OPEN":
        return (
          <AcceptOrderSegment
            listing={listing.current}
            orders={orders.current}
            ownerOrderQuantities={ownerOrderQuantities}
            setOwnerOrderQuantities={setOwnerOrderQuantities}
            setCurrentStage={setCurrentStage}
          />
        );
        break;
      case "CLOSED":
        return (
          <OwnerMakeOrderSegment
            listing={listing.current}
            orders={orders.current}
            ownerOrderQuantities={ownerOrderQuantities}
            setOwnerOrderQuantities={setOwnerOrderQuantities}
            setCurrentStage={setCurrentStage}
          />
        );
        break;
      case "FINALIZED":
        return (
          <WaitOrderSegment
            listing={listing.current}
            orders={orders.current}
            ownerOrderQuantities={ownerOrderQuantities}
            setOwnerOrderQuantities={setOwnerOrderQuantities}
            setCurrentStage={setCurrentStage}
          />
        );
        break;
      case "ARRIVED":
        return (
          <OrderArrivedSegment
            listing={listing.current}
            orders={orders.current}
            ownerOrderQuantities={ownerOrderQuantities}
            setOwnerOrderQuantities={setOwnerOrderQuantities}
            setCurrentStage={setCurrentStage}
          />
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "600" }} gutterBottom>
        Join order
      </Typography>
      <ProgressBarOwner currentStage={currentStage} />
      {renderContent()}
      <Divider sx={{margin:"2rem"}}/>
      <DeleteListingSection listingId={listing.id} />
    </>
  );
}

export default ManageSegment;
