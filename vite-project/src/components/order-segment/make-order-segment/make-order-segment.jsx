import React, { useState } from "react";
import OrderTable from "./order-table";
import AlertModal from "./alert-modal";
import { Button } from "@mui/material";

function MakeOrderSegment({
  orderQuantities,
  setOrderQuantities,
  setCurrentStage,
  listing,
  items,
  userID,
  orderDetails,
}) {
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const handleSubmitOrder = async () => {
    const hasOrders = orderQuantities?.some((quantity) => quantity > 0);
    if (!hasOrders) {
      // delete order from backend if there is an order
      if (orderDetails) {
        // delete api here
      }

      // console.log(orderQuantities);
      setOpenAlertModal(true); // Trigger the modal if all quantities are 0
    } else {
      // need to also update/save order quantities to backend (orderDetails)

      try {
        const response = await fetch(
          `http://localhost:3000/orders/${listing.id}/${userID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ item_quantities: orderQuantities }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          const response_1 = await fetch(
            `http://localhost:3000/listings/${listing.id}/${userID}/finalise-order`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                finalised_quantities: orderQuantities,
              }),
            }
          );
          const data_1 = await response_1.json();
        }

        // const response_2 = await fetch(
        //   `http://localhost:3000/listings/${listing.id}/${userID}/order`,
        //     {
        //       method: "PUT",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         item_quantities: orderQuantities,
        //       }),
        //     }
        //   );
        //   const data_2 = await response_2.json();

      } catch (error) {
        console.error("Error with backend:", error);
      }

      // need to update listing details remainingQty
      setCurrentStage((prevStage) => Math.min(prevStage + 1, 3)); // Limit to max stage
    }
  };

  return (
    <div>
      <OrderTable
        items={items}
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
