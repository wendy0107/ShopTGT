import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

function AlertModal({ open, onClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #FFF",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: "30vw" }}>
        <Typography variant="h7" align="center">
          Your previous order has been removed. 
        </Typography>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ fontSize: "1rem", padding: "0.5Frem" }}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
}

export default AlertModal;
