import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function CreateListingDialog({open, setOpen}) {
  
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

  console.log('rerendered')

  const handleCloseDialog = () => setOpen(false);

//   const handleChange = (event) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [event.target.name]: event.target.value,
//     }));
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  return (
      <Dialog open={open} onClose={handleCloseDialog}>
        <Box sx={{ width: 600, p: 4, bgcolor: "background.paper", overflow: 'auto' }}>
          <h2>Create Listing</h2>
          <form onSubmit={handleSubmit}>
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
              name="collectionPoint"
              margin="normal"
              fullWidth
              required
            />
            <h3>Items</h3>
            <Grid container spacing={2}>
              {formData.items.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <h4>Item {index + 1}</h4>
                  <TextField
                    label="Name"
                    name={`items[${index}].name`}
                    fullWidth
                    required={index === 0} // Only require first item
                  />
                  <TextField
                    label="Price"
                    type="number"
                    name={`items[${index}].price`}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Quantity Available"
                    type="number"
                    name={`items[${index}].quantityAvailable`}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
          </form>
        </Box>
      </Dialog>
  );
}

export default CreateListingDialog