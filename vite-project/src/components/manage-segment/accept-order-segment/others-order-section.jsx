import React from "react";
import OrderCard from "../order-card";
import { Typography } from "@mui/material";

function OthersOrderSection({ orders, items, showFinalOrder, titleOverride }) {
  return (
    <div>
      <Typography variant="h5" sx={{ marginRight: "1rem", fontSize: "1.3rem" }}>
        {titleOverride ? titleOverride :"Other's orders"}
      </Typography>
      {(orders && orders.length > 0) ? (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            buyerEmail={"dummy@mailinator.com"}
            phone={"0123413556"}
            items={items}
            orderQuantities={
              showFinalOrder ? order.finalised_quantities : order.item_quantities
            }
          />
        ))
      ) : (
        <Typography variant="body1" sx={{marginTop:'1rem'}}>
          No orders yet.
        </Typography>
      )}
    </div>
  );
}

export default OthersOrderSection;
