import React, { useContext, useEffect, useState } from "react";
import { listingExamples } from "../../listing-examples";
import { Typography, Divider, Button } from "@mui/material";
import Listing from "../../components/listing";
import "./dashboard.css";
import Navbar from "../../components/navbar";
import { NavContext } from "../../context/navContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CreateListingDialog from "../../components/create-listing-dialog";
import { UserContext } from "../../context/userContext";

function Dashboard({ ownerEmail }) {

  const { userID } = useContext(UserContext);
  const [ownerListings, setOwnerListings] = useState([]);
  const [joinedListings, setJoinedListings] = useState([]);

  console.log('dashboard', userID)

  // Data loading
  const getOwnerListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/listings/${userID}/all-listings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setOwnerListings(data.listings);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  const getJoinedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setJoinedListings(data.listings);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  // load listings
  useEffect(() => {
    getOwnerListings();
    getJoinedListings();
  }, []);

  // setting Navbar
  const { setOnDashboard } = useContext(NavContext);
  useEffect(() => {
    setOnDashboard(true);
  }, []);

  // Theme for Button
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "0.8rem",
            padding: "0 1rem 0 1rem",
            maxHeight: "2rem",
          },
        },
      },
    },
  });

  // States
  const [dialogOpen, setDialogOpen] = useState(false);

  // Handler
  const handleCreateListing = () => {
    setDialogOpen(true);
  };

  // Helper functions
  const renderOwnerListings = () => {
    return ownerListings.length > 0 ? (
      <div className="owner-listings">
        {ownerListings.map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </div>
    ) : (
      <p className="no-listing-text">There are no listings right now.</p>
    );
  };

  const renderJoinedListings = () => {
    return joinedListings.length > 0 ? (
      <div className="joined-listings">
        {joinedListings.map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </div>
    ) : (
      <p className="no-listing-text">There are no listings right now.</p>
    );
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Typography
          variant="h5"
          sx={{ fontSize: "1.5rem", marginBottom: "1rem" }}
        >
          Hello, {ownerEmail}!
        </Typography>
        <div className="your-listing-header">
          <Typography variant="h6" sx={{ mb: "1rem", fontWeight: "bold" }}>
            Your listings
          </Typography>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleCreateListing}
            >
              Create new listing
            </Button>
          </ThemeProvider>
        </div>
        <CreateListingDialog setOpen={setDialogOpen} open={dialogOpen} getOwnerListings={getOwnerListings}/>
        {renderOwnerListings()}
        <Divider sx={{ margin: "2rem" }} />
        <Typography variant="h6" sx={{ mb: "1rem", fontWeight: "bold" }}>
          Joined listings
        </Typography>
        {renderJoinedListings()}
      </div>
    </div>
  );
}

export default Dashboard;
