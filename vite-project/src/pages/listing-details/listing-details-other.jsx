import React, { useState, useContext } from "react";
import Navbar from "../../components/navbar";
import { NavContext } from "../../context/navContext";
import { useEffect } from "react";
import { listingOwner } from "../../listing-examples";
import { CardMedia, Divider, Typography, Alert } from "@mui/material";
import "./listing-details.css";
import OrderSegment from "../../components/order-segment/order-segment";
import ContactCard from "../../components/contact-card";

function ListingDetailsOther({ listing, items, userID, ownerDetails }) {
  // const listing = useRef();
  // listing = listingDetails;
  const [orderDetails, setOrderDetails] = useState(null);

  // setting Navbar
  const { setOnDashboard } = useContext(NavContext);
  useEffect(() => {
    setOnDashboard(false);
  }, []);

  // try to retrieve existing order
  const retrieveExistingOrder = async () => {
    // console.log('listing id', listing.id)
    // console.log('user ID', userID)
    try {
      const response = await fetch(
        `http://localhost:3000/orders/${listing.id}/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log('listing-details-other get order', data)
      setOrderDetails(data.order[0]);
      
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  useEffect(() => {
    retrieveExistingOrder();
  }, [listing]);

  return (
    <div className="listing-details-page">
      {listing ? (
        <>
          <Navbar />
          <div className="listing-details-container">
            <div style={{ display: "flex", gap: "2rem" }}>
              <CardMedia
                component="img"
                height="200"
                image={listing.imageUrl} // Assuming you have an imageUrl property in your listing data
                alt={listing.title}
                sx={{ boxSizing: "border-box", width: "200px", mb: "1rem" }}
              />
              <div>
                <Typography variant="h4" component="h2">
                  {listing.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ paddingLeft: "0.3rem", paddingBottom: "0.3rem" }}
                >
                  posted by {ownerDetails?.email} on {listing.creation_date}
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  sx={{ paddingLeft: "0.3rem" }}
                >
                  {listing.description}
                </Typography>
              </div>
            </div>
            <Alert severity="info" sx={{ margin: "1rem" }}>
              Collection point: {listing.collection_point}
            </Alert>
            <ContactCard userDetails={ownerDetails} />
            <Divider
              gutterBottom
              sx={{ paddingBottom: "2rem", marginBottom: "1rem" }}
            />
            <OrderSegment
              orderDetails={orderDetails}
              items={items}
              listing={listing}
              userID={userID}
            />
          </div>
        </>
      ) : (
        <div className="listing-details-err-msg">Cannot find the listing!</div>
      )}
    </div>
  );
}

export default ListingDetailsOther;
