import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Modal, Button, Box } from "@mui/material";
import OrderCard from "../order-card";
import OrderTable from "../../order-segment/make-order-segment/order-table";
import { exampleOwner } from "../../../listing-examples";
import AlertModal from "../../order-segment/make-order-segment/alert-modal";

function YourOrderSection({
  listing,
  items,
  ownerOrderQuantities,
  setOwnerOrderQuantities,
  userID,
  ownerDetails,
}) {
  // const hasOrders = ownerOrderQuantities.some((quantity) => quantity > 0);
  const [isOwnerOrderAdded, setIsOwnerOrderAdded] = useState(false);
  const [openMakeOrderModal, setOpenMakeOrderModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  // const [remainingQuantity, setRemainingQuantity] = useState([]);

  // useEffect(() => {
  //   setRemainingQuantity(items.map(item => item.remaining_quantity))
  // }, [items])

  useEffect(() => {
    const hasOrders = ownerOrderQuantities.some((quantity) => quantity > 0);
    setIsOwnerOrderAdded(hasOrders);
  }, [ownerOrderQuantities]);

  const handleOpenMakeOrderModal = () => {
    setOpenMakeOrderModal(true);
  };

  const handleCloseMakeOrderModal = () => {
    setOpenMakeOrderModal(false);
  };

  const handleConfirmOrder = async () => {
    // Handle order confirmation logic here (e.g., send to backend)
    handleCloseMakeOrderModal(); // Close the modal
    try {
      const response = await fetch(
        `http://localhost:3000/orders/${listing.id}/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_quantities: ownerOrderQuantities }),
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
              finalised_quantities: ownerOrderQuantities,
            }),
          }
        );
        const data_1 = await response_1.json();
      }

      // for (let index in items) {
      //   // console.log(ownerOrderQuantities[index])
      //   const response_2 = await fetch(
      //     `http://localhost:3000/items/${items[index].id}/update_remaining_quantity`,
      //     {
      //       method: "PUT",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ remaining_quantity:re[index]}),
      //     }
      //   );
      //   const data_2 = await response_2.json();
      // }
    } catch (error) {
      console.error("Error with backend:", error);
    }

    const hasOrders = ownerOrderQuantities.some((quantity) => quantity > 0);
    // console.log('(your-order-section) check owner order quantities', ownerOrderQuantities)
    if (!hasOrders) {
      setOpenAlertModal(true); // Trigger the modal if all quantities are 0
      setIsOwnerOrderAdded(false);
    } else {
      setIsOwnerOrderAdded(true); // Trigger OrderCard rendering
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: "2rem",
          paddingBottom: "1.2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginTop: "0rem", marginRight: "1rem", fontSize: "1.3rem" }}
        >
          Your Orders
        </Typography>
        <Tooltip title="Click here to add/edit order">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpenMakeOrderModal}
          >
            Add/Edit
          </Button>
        </Tooltip>
      </div>
      <Modal open={openMakeOrderModal} onClose={handleCloseMakeOrderModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Key in your order here
          </Typography>
          <OrderTable
            listing={listing}
            items={items}
            buyerID={userID}
            orderQuantities={ownerOrderQuantities}
            setOrderQuantities={setOwnerOrderQuantities}
            // setRemainingQuantity={setRemainingQuantity}
          />
          <div style={{ textAlign: "right", padding: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleConfirmOrder}
            >
              Confirm order
            </Button>
          </div>
        </Box>
      </Modal>
      <AlertModal
        open={openAlertModal}
        onClose={() => setOpenAlertModal(false)}
      />

      {isOwnerOrderAdded ? (
        <OrderCard
          buyerEmail={ownerDetails?.email}
          phone={ownerDetails?.phone}
          items={items}
          orderQuantities={ownerOrderQuantities}
        />
      ) : (
        <Typography variant="body1">
          You haven&apos;t added an order yet.
        </Typography>
      )}
    </>
  );
}

export default YourOrderSection;
