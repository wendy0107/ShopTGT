import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
} from "@mui/material";
import OthersOrderSection from "../accept-order-segment/others-order-section";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function WaitOrderSegment({ listing, orders, setCurrentStage }) {
  const handleUndoFinalize = () => {
    setCurrentStage("CLOSED");
  };
  const handleNotifyArrival = () => {
    setCurrentStage("ARRIVED");
  };
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: "2rem" }}>
        We have informed the other buyers about the final order!
      </Typography>

      <Alert severity="info" sx={{ margin: "1rem" }}>
        Click on &quot;ORDER HAS ARRIVED&quot; button when you receive the order to notify the other buyers.
      </Alert>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 0 2rem",
        }}
      >
        <Button
          variant="contained"
          color={"secondary"}
          onClick={handleUndoFinalize}
        >
          Undo finalize
        </Button>
        <Button variant="contained" onClick={handleNotifyArrival}>
          Order has arrived
        </Button>
      </div>

      <Accordion sx={{ marginTop: "1rem", boxShadow: "0px 0px 5px grey" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Click here to view all orders and contacts!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OthersOrderSection
            orders={orders}
            items={listing.items}
            showFinalOrder={true}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default WaitOrderSegment;
