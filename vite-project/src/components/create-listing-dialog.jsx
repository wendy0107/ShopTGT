import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import {
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Alert,
  Input,
} from "@mui/material";

function CreateListingDialog({ open, setOpen }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collectionPoint: "",
    items: [
      { name: "", price: "", quantityAvailable: "" },
      { name: "", price: "", quantityAvailable: "" },
      { name: "", price: "", quantityAvailable: "" },
      { name: "", price: "", quantityAvailable: "" },
      { name: "", price: "", quantityAvailable: "" },
    ],
  });

  const handleCloseDialog = () => setOpen(false);

  const handleCancel = (event) => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);

    const form = document.querySelector("#create-listing-form");
    const formData = new FormData(form);

    const body = {};
    for (const pair of formData.entries()) {
      body[pair[0]] = pair[1];
      console.log("key: %s", String(pair[0]));
      console.log("value: %s", String(pair[1]));
    }

    // // Send API request to create listing
    // try {
    //   const response = await fetch("/api/listings", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     handleClose();
    //     // Handle successful creation (e.g., display success message)
    //   } else {
    //     // Handle error
    //   }
    // } catch (error) {
    //   // Handle network error
    // }
  };

  const [priceValidities, setPriceValidities] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  const handlePriceChange = (index) => (event) => {
    const newValidities = [...priceValidities];
    newValidities[index] = /^\d+(\.\d{1,2})?$/.test(event.target.value);
    setPriceValidities(newValidities);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="lg">
      <DialogTitle>Create Listing</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="create-listing-form">
          <Typography variant="h5">Basic info</Typography>
          <TextField
            label="Title"
            name="title"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Collection Point"
            name="collection_point"
            margin="normal"
            fullWidth
            required
          />

          <Divider sx={{ m: "2rem 0 2rem 0" }} />
          <Typography variant="h5">Items</Typography>
          <Alert severity="info">
            Quantity for items can include the quantity you are ordering for
            yourself!{" "}
          </Alert>
          <Grid container spacing={2}>
            {formData.items.map((item, index) => (
              <Grid item xs={12} key={index}>
                <h4>
                  Item {index == 0 ? index + 1 : `${index + 1} (optional)`}
                </h4>
                <TextField
                  label="Name"
                  name={`name`}
                  fullWidth
                  required={index === 0} // Only require first item
                />
                <TextField
                  label="Price"
                  type="text"
                  name={`price`}
                  margin="normal"
                  fullWidth
                  required={index === 0}
                  error={!priceValidities[index]}
                  helperText={
                    priceValidities[index] ||
                    "Price must be a number with two decimal points. E.g. 99.99."
                  }
                  onChange={handlePriceChange(index)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  // ...other props as needed
                />
                <TextField
                  label="Quantity Available"
                  type="number"
                  name={`remaining_quantity`}
                  margin="normal"
                  fullWidth
                  InputProps={{ inputProps: { min: 1, max: 9999 } }}
                  placeholder="Max quantity 9999"
                  required={index === 0}
                />
              </Grid>
            ))}
          </Grid>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" form="create-listing-form">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateListingDialog;
