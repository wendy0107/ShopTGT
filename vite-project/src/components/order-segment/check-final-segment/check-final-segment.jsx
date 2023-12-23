import React, { useState } from "react";
import OrderSummary from "../view-summary-segment/order-summary";
import {
  Accordion,
  Alert,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CheckFinalSegment({ listing, orderQuantities, orderDetails }) {
  //   const [open, setOpen] = useState(false);

  //   const handleOpen = () => setOpen(true);

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: "2rem" }}>
        The owner has made the order! Kindly wait for the order to arrive :> 
      </Typography>

      <Alert severity="warning" sx={{ mt: 5 }} sx={{ margin: "1rem" }}>
        Note that the final order might be less than your initial order.
      </Alert>

      <OrderSummary
        items={listing.items}
        orderQuantities={orderDetails.finalQuantities}
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
            items={listing.items}
            orderQuantities={orderQuantities}
            toDisplayAll={true}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default CheckFinalSegment;
