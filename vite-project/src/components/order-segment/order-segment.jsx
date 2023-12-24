import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ProgressBar from "./progress-bar";
import { Typography } from "@mui/material";
import { listingDetails } from "../../listing-examples";
import MakeOrderSegment from "./make-order-segment/make-order-segment";
import ViewSummarySegment from "./view-summary-segment/view-summary-segment";
import CheckFinalSegment from "./check-final-segment/check-final-segment";
import CollectOrderSegment from "./collect-order-segment/collect-order-segment";

function OrderSegment({ orderDetails, items, listing, userID }) {
  // States
  const [currentStage, setCurrentStage] = useState(0); // Start at the first stage
  const [orderQuantities, setOrderQuantities] = useState(
    items?.map((item) => 0)
  );

  // update current stage based on status of listing
  useEffect(() => {
    const hasOrders = orderDetails?.item_quantities?.some(
      (quantity) => quantity > 0
    );

    // No matter OPEN or CLOSED, as long as an order is made, we go to stage 1.
    // If no order is made, it is okay to be in Stage 0, but NOT Stage 1 or 2. We will disable the order segment with Stage -1.
    if (orderDetails?.item_quantities && hasOrders) {
      setOrderQuantities(orderDetails.item_quantities);
      setCurrentStage(1);
      switch (listing.status) {
        case "FINALISED":
          setCurrentStage(2);
          break;
        case "ARRIVED":
          setCurrentStage(3);
          break;
      }
    } else {
      setOrderQuantities(items?.map((item) => 0));
      switch (listing.status) {
        case "CLOSED":
          setCurrentStage(-1);
          break;
        case "FINALISED":
          setCurrentStage(-1);
          break;
        case "ARRIVED":
          setCurrentStage(-1);
      }
    }
  }, [orderDetails]);

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
            listing={listing}
            orderQuantities={orderQuantities}
            setOrderQuantities={setOrderQuantities}
            setCurrentStage={setCurrentStage}
            items={items}
            userID={userID}
            orderDetails={orderDetails}
          />
        );
        break;
      case 1:
        return (
          <ViewSummarySegment
            listing={listing}
            orderQuantities={orderQuantities}
            setCurrentStage={setCurrentStage}
            items={items}
          />
        );
      case 2:
        return (
          <CheckFinalSegment
            listing={listing}
            orderQuantities={orderQuantities}
            items={items}
            userID={userID}
          />
        );
      case 3:
        return (
          <CollectOrderSegment
            listing={listing}
            items={items}
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
