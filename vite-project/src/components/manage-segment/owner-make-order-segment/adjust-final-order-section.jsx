import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditableOrderCard from "./editable-order-card";
import { Alert } from "@mui/material";

function AdjustFinalOrderSection({ orders, items }) {
  return (
    <>
      <Alert severity="info" sx={{marginTop: "2rem"}}>
        Can&apos;t get everything on the order list? Adjust the final order list
        below! <br /> Note: You can only reduce the number of orders!
      </Alert>

      <Accordion sx={{marginTop: "2rem"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{fontWeight: 'bold'}}>Adjust final order</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orders.map((order, index) => {
            return (
              <EditableOrderCard
                key={index}
                buyerEmail={"dummy@gmail.com"}
                items={items}
                orderQuantities={order.orderQuantities}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AdjustFinalOrderSection;
