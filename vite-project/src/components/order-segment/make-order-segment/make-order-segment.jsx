import React, { useState } from "react";
import OrderTable from "./order-table";
import AlertModal from "./alert-modal";
import { Button } from "@mui/material";

function MakeOrderSegment({
  orderQuantities,
  setOrderQuantities,
  setCurrentStage,
  listing,
}) {
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const handleSubmitOrder = () => {
    const hasOrders = orderQuantities.some((quantity) => quantity > 0);
    if (!hasOrders) {
      // delete order from backend
      console.log(orderQuantities);
      setOpenAlertModal(true); // Trigger the modal if all quantities are 0
    } else {
      // need to also update/save order quantities to backend (orderDetails)
      // need to update listing details remainingQty
      setCurrentStage((prevStage) => Math.min(prevStage + 1, 3)); // Limit to max stage
    }
  };

  return (
    <div>
      <OrderTable
        items={listing.items}
        orderQuantities={orderQuantities}
        setOrderQuantities={setOrderQuantities}
      />
      <AlertModal
        open={openAlertModal}
        onClose={() => setOpenAlertModal(false)}
      />
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          onClick={handleSubmitOrder}
          sx={{ fontSize: "1rem", fontWeight: "600", margin: "1.2rem 0" }}
        >
          Confirm order
        </Button>
      </div>
    </div>
  );
}

export default MakeOrderSegment;
