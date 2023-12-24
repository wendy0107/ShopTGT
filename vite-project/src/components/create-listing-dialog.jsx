import React, { useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
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
} from "@mui/material";
import { UserContext } from "../context/userContext";

function CreateListingDialog({ open, setOpen, getOwnerListings }) {
  const formData = {
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
  };

  // get user id
  const { userID } = useContext(UserContext);

  // handlers
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCancel = (event) => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);

    const [listing_data, items_data] = preprocess_listing_and_items();

    try {
      const response_create_listing = await fetch(
        `http://localhost:3000/listings/${userID}/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...listing_data }),
        }
      );
      const listing_id = await response_create_listing.json();
      // console.log(data);

      for (const item of items_data) {
        if (allValuesAreNonEmpty(item)) {
          const response_create_item = await fetch(
            `http://localhost:3000/items/${listing_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...item }),
            }
          );
        }
      }

      // reload listing on dashboard
      getOwnerListings();
    } catch (error) {
      console.error("Error with backend:", error);
    }
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

  // helper
  // process and create listing
  const allValuesAreNonEmpty = (obj) => {
    return Object.values(obj).every((value) => {
      return value && value.trim() !== ""; // Check for both empty string and undefined/null
    });
  };
  const preprocess_listing_and_items = () => {
    const form = document.querySelector("#create-listing-form");
    const formData = new FormData(form);
    const formDataEntries = formData.entries();

    const listing_data = {};
    const items_data = [];
    let item_data = {};

    let isItemData = false;
    for (let [key, value] of formDataEntries) {
      if (key == "item_title") {
        isItemData = true;
        key = "title";
      }

      if (!isItemData) {
        listing_data[key] = value;
        console.log();
      } else {
        item_data[key] = value;
      }

      if (key == "quantity") {
        item_data["remaining_quantity"] = value;
        items_data.push(item_data);
        item_data = {};
      }
    }
    return [listing_data, items_data];
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
            yourself!
          </Alert>
          <Grid container spacing={2}>
            {formData.items.map((item, index) => (
              <Grid item xs={12} key={index}>
                <h4>
                  Item {index == 0 ? index + 1 : `${index + 1} (optional)`}
                </h4>
                <TextField
                  label="Name"
                  name={`item_title`}
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
                  name={`quantity`}
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
