import React, { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditableOrderCard from "./editable-order-card";
import { Alert } from "@mui/material";

function AdjustFinalOrderSection({ orders, items, userDetails }) {
  function allItemQuantitiesPositive(orders) {
    return orders.every((order) => {
      return order?.item_quantities.every((quantity) => quantity > 0);
    });
  }

  return (
    <>
      <Alert severity="info" sx={{ marginTop: "2rem" }}>
        Can&apos;t get everything on the order list? Adjust the final order list
        below! <br /> Note: You can only reduce the number of orders!
      </Alert>

      <Accordion sx={{ marginTop: "2rem" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>
            Adjust final order
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orders && orders.length > 0 && allItemQuantitiesPositive(orders) ? (
            orders.map((order, index) => {
              return (
                <EditableOrderCard
                  key={index}
                  buyerEmail={userDetails?.[index]?.email}
                  items={items}
                  order={order}
                />
              );
            })
          ) : (
            <Typography variant="body1" sx={{ marginTop: "0rem" }}>
              No orders were made.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AdjustFinalOrderSection;
