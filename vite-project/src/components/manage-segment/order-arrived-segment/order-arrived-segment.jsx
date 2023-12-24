import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
} from "@mui/material";
import OthersOrderSection from "../accept-order-segment/others-order-section";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PayList from "../wait-order-segment/pay-list";

function OrderArrivedSegment({
  listing,
  items,
  ownerOrder,
  otherOrders,
  setCurrentStage,
}) {
    const handleUndoArrival = () => {
    setCurrentStage("FINALISED");
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([...ownerOrder, ...otherOrders]);
  }, [ownerOrder, otherOrders]);

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: "2rem" }}>
        We have informed the other buyers about the arrival!
      </Typography>

      <PayList orders={orders} items={items} />

      <div style={{ textAlign: "left", margin: "2rem 0 2rem" }}>
        <Button
          variant="contained"
          color={"secondary"}
          onClick={handleUndoArrival}
        >
          Undo arrival
        </Button>
      </div>

      <Accordion sx={{ marginTop: "1rem", boxShadow: "0px 0px 5px grey" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Click here to view all orders and contacts!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OthersOrderSection
            orders={ownerOrder}
            items={items}
            titleOverride={"Your order"}
            showFinalOrder={true}
          />
          <Divider sx={{ margin: "1rem 0 1rem 0" }} />
          <OthersOrderSection
            orders={otherOrders}
            items={items}
            showFinalOrder={true}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default OrderArrivedSegment;
