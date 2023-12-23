import React, { useRef } from "react";
import Navbar from "../../components/navbar";
import { useEffect } from "react";
import { orderDetails, listingDetails, listingOwner } from "../../listing-examples";
import { CardMedia, Divider, Typography, Alert } from "@mui/material";
import "./listing-details.css";
import OrderSegment from "../../components/order-segment/order-segment";
import ContactCard from "../../components/contact-card";

function ListingDetails() {
  const listing = useRef();
  listing.current = listingDetails;
  useEffect(() => {
    // Fetch listings data from the API
    // axios.get('/api/listings') // Replace with your actual API endpoint
    //   .then((response) => {
    //     setListings(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching listings:', error);
    //   });
    // Listing : {imageUrl, title, description}
  }, []);

  return (
    <div className="listing-details-page">
      {listing ? (
        <>
          <Navbar />
          <div className="listing-details-container">
            <div style={{display:'flex', gap:'2rem'}}>
            <CardMedia
              component="img"
              height="200"
              image={listing.current.imageUrl} // Assuming you have an imageUrl property in your listing data
              alt={listing.current.title}
              sx={{ boxSizing: "border-box", width: "200px", mb: "1rem" }}
            />
            <div>
            <Typography variant="h4" component="h2">
              {listing.current.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ paddingLeft: "0.3rem", paddingBottom: "0.3rem" }}
            >
              posted by {listing.current.owner} on {listing.current.uploadDate}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{ paddingLeft: "0.3rem" }}
            >
              {listing.current.description}
            </Typography>
            </div>
            </div>
            <Alert severity="info" sx={{ margin: "1rem" }}>
              Collection point: {listing.current.collectionPoint}
            </Alert>
            <ContactCard 
              name={listingOwner.name}
              phone={listingOwner.phone}
              email={listingOwner.email}
            />
            <Divider
              gutterBottom
              sx={{ paddingBottom: "2rem", marginBottom: "1rem" }}
            />
            <OrderSegment orderDetails={orderDetails} />
          </div>
        </>
      ) : (
        <div className="listing-details-err-msg">Cannot find the listing!</div>
      )}
    </div>
  );
}

export default ListingDetails;
