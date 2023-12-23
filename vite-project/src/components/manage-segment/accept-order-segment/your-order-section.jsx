import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Modal, Button, Box } from "@mui/material";
import OrderCard from "../order-card";
import OrderTable from "../../order-segment/make-order-segment/order-table";
import { exampleOwner } from "../../../listing-examples";
import AlertModal from "../../order-segment/make-order-segment/alert-modal";

function YourOrderSection({
  listing,
  ownerOrderQuantities,
  setOwnerOrderQuantities,
}) {
  const hasOrders = ownerOrderQuantities.some((quantity) => quantity > 0);
  const [isOwnerOrderAdded, setIsOwnerOrderAdded] = useState(hasOrders);
  const [openMakeOrderModal, setOpenMakeOrderModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const handleOpenMakeOrderModal = () => {
    setOpenMakeOrderModal(true);
  };

  const handleCloseMakeOrderModal = () => {
    setOpenMakeOrderModal(false);
  };

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here (e.g., send to backend)
    handleCloseMakeOrderModal(); // Close the modal

    const hasOrders = ownerOrderQuantities.some((quantity) => quantity > 0);
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
        <Tooltip title="Click here to add order">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpenMakeOrderModal}
          >
            +
          </Button>
        </Tooltip>
      </div>
      <Modal open={openMakeOrderModal} onClose={handleCloseMakeOrderModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Key in your order here
          </Typography>
          <OrderTable
            items={listing.items}
            orderQuantities={ownerOrderQuantities}
            setOrderQuantities={setOwnerOrderQuantities}
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
          buyerEmail={exampleOwner.email}
          items={listing.items}
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
