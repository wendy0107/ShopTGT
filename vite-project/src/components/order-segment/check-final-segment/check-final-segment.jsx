import React, { useState, useEffect } from "react";
import OrderSummary from "../view-summary-segment/order-summary";
import {
  Accordion,
  Alert,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CheckFinalSegment({ listing, items, userID }) {

  const [orderDetails, setOrderDetails] = useState(null)

  // try to retrieve existing order
  const retrieveExistingOrder = async () => {
    // console.log('listing id', listing.id)
    // console.log('user ID', userID)
    try {
      const response = await fetch(
        `http://localhost:3000/orders/${listing.id}/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log('check final', data)
      setOrderDetails(data.order[0]);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  useEffect(() => {
    retrieveExistingOrder();
  }, [listing]);

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: "2rem" }}>
        The owner has made the order! Kindly wait for the order to arrive :>
      </Typography>

      <Alert severity="warning" sx={{ mt: 5 }} sx={{ margin: "1rem" }}>
        Note that the final order might be less than your initial order.
      </Alert>

      <OrderSummary
        items={items}
        orderQuantities={orderDetails?.finalised_quantities}
        toDisplayAll={false}
      />

      <Accordion sx={{ bgcolor: "#d4e9ff", marginTop: "1rem" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }}>
            View your original order
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrderSummary
            items={items}
            orderQuantities={orderDetails?.item_quantities}
            toDisplayAll={true}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default CheckFinalSegment;
