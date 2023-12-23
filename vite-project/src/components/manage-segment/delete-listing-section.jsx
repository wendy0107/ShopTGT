import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ExpandMore from "@mui/icons-material/ExpandMore";

function DeleteListingSection({ listingId }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmDelete = () => {
    // Handle API call to delete listing
    handleClose();
  };

  return (
    <Accordion sx={{ backgroundColor: "#fce4e4", textAlign: "center" }}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="danger-zone">
        <Typography variant="h6" sx={{fontSize: '1rem'}}>
          <span style={{ fontWeight: "bold" }}>DANGER ZONE!</span> - Click to
          delete listing 
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button variant="contained" color="error" onClick={handleOpen}>
          Delete this listing
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-listing-modal-title"
          aria-describedby="delete-listing-modal-description"
        >
          <Box sx={{ width: "500px" }}>
            <Box sx={{ textAlign: "center" }}>
              <h2 id="delete-listing-modal-title">Delete Listing</h2>
              <p id="delete-listing-modal-description">
                Are you sure you want to delete this listing?
              </p>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}
            >
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </AccordionDetails>
    </Accordion>
  );
}

export default DeleteListingSection;
