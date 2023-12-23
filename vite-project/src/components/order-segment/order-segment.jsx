import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ProgressBar from "./progress-bar";
import { Typography } from "@mui/material";
import { listingDetails } from "../../listing-examples";
import MakeOrderSegment from "./make-order-segment/make-order-segment";
import ViewSummarySegment from "./view-summary-segment/view-summary-segment";
import CheckFinalSegment from "./check-final-segment/check-final-segment";
import CollectOrderSegment from "./collect-order-segment/collect-order-segment";

function OrderSegment({ orderDetails }) {
  // References
  const listing = useRef(); // useRef instead of useState because we dont want a change in remainingQty (when we update it later) to rerender this component
  listing.current = listingDetails; // STUB USED

  // States
  const [currentStage, setCurrentStage] = useState(0); // Start at the first stage
  const [orderQuantities, setOrderQuantities] = useState(
    listing.current.items.map((item) => 0)
  );

  // update current stage based on status of listing
  useEffect(() => {
    const hasOrders = orderDetails.orderQuantities.some(
      (quantity) => quantity > 0
    );

    // No matter OPEN or CLOSED, as long as an order is made, we go to stage 1.
    // If no order is made, it is okay to be in Stage 0, but NOT Stage 1 or 2. We will disable the order segment with Stage -1.
    if (orderDetails.orderQuantities && hasOrders) {
      setOrderQuantities(orderDetails.orderQuantities);
      setCurrentStage(1);
      switch (listing.current.status) {
        case "FINALIZED":
          setCurrentStage(2);
          break;
        case "ARRIVED":
          setCurrentStage(3);
          break;
      }
    } else {
      switch (listing.current.status) {
        case "CLOSED":
          setCurrentStage(-1);
          break;
        case "FINALIZED":
          setCurrentStage(-1);
          break;
        case "ARRIVED":
          setCurrentStage(-1);
      }
    }
  }, []);

  // Helper functions
  const renderContent = () => {
    switch (currentStage) {
      case -1:
        return (
          <Typography variant="h6" sx={{ fontSize: "1rem", padding: "1rem" }}>
            This listing is no longer available for joining.
          </Typography>
        );
        break;
      case 0:
        return (
          <MakeOrderSegment
            listing={listing.current}
            orderQuantities={orderQuantities}
            setOrderQuantities={setOrderQuantities}
            setCurrentStage={setCurrentStage}
          />
        );
        break;
      case 1:
        return (
          <ViewSummarySegment
            listing={listing.current}
            orderQuantities={orderQuantities}
            setCurrentStage={setCurrentStage}
          />
        );
      case 2:
        return (
          <CheckFinalSegment
            listing={listing.current}
            orderQuantities={orderQuantities}
            orderDetails={orderDetails}
          />
        );
      case 3:
        return (
          <CollectOrderSegment
            listing={listing.current}
            orderQuantities={orderQuantities}
            orderDetails={orderDetails}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "600" }} gutterBottom>
        Join order
      </Typography>
      <ProgressBar
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        disabled={currentStage == -1}
      />
      {renderContent()}
    </>
  );
}

export default OrderSegment;
