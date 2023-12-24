import React, { useState } from "react";
import OrderSummary from "../view-summary-segment/order-summary";
import {
  Accordion,
  Alert,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CollectOrderSegment({ listing, items, orderDetails }) {
  const [isCollected, setIsCollected] = useState(false);

  const handleClick = () => {
    setIsCollected(!isCollected);
  };

  const buttonText = isCollected ? "Undo collect" : "Mark as Collected";
  const buttonColor = isCollected ? "secondary" : "primary";
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: "2rem" }}>
        Your order has arrived!
      </Typography>

      <Alert severity="info" sx={{ mt: 5 }} sx={{ margin: "1rem" }}>
        {listing.collection_point
          ? `Please collect it from: ${listing.collection_point}.`
          : "The owner will contact you for more delivery arrangements."}
      </Alert>

      <OrderSummary
        items={items}
        orderQuantities={orderDetails.finalised_quantities}
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
            orderQuantities={orderDetails.item_quantities}
            toDisplayAll={true}
          />
        </AccordionDetails>
      </Accordion>
      <div style={{ textAlign: "right", margin: "1rem" }}>
        <Button variant="contained" color={buttonColor} onClick={handleClick}>
          {buttonText}
        </Button>
      </div>
    </>
  );
}

export default CollectOrderSegment;
