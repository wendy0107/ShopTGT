import React, { useRef, useContext } from "react";
import Navbar from "../../components/navbar";
import { useEffect } from "react";
import { listingOwner } from "../../listing-examples";
import { CardMedia, Divider, Typography, Alert } from "@mui/material";
import "./listing-details.css";
import ContactCard from "../../components/contact-card";
import ManageSegment from "../../components/manage-segment/manage-segment";
import OrderSummary from "../../components/order-segment/view-summary-segment/order-summary";
import ClickableCopyCard from "../../components/clickable-copy-card";
// import { useLocation } from "react-router-dom";

function ListingDetailsOwner({ listing, items, userID }) {
  // const location = useLocation();
  // const pathname = location.pathname; // Full path (e.g., "/users/123")
  // const search = location.search; // Query string (e.g., "?sort=name")
  // const fullUrl = `${location.origin}${pathname}${search}`; // Complete URL

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
                image={
                  "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg"
                }
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
                  posted by {listing.owner} on
                  {listing.creation_date}
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

            <ClickableCopyCard text={window.location.href} />

            <ContactCard
              name={listingOwner.name}
              phone={listingOwner.phone}
              email={listingOwner.email}
            />

            <Typography variant="h6" sx={{ margin: "1rem" }}>
              Items and specified quantities
            </Typography>
            <OrderSummary
              items={items}
              orderQuantities={items?.map((item) => item.quantity)}
              toDisplayAll={true}
              excludePrice={true}
              sx={{ margin: "1rem" }}
            />

            <Divider
              gutterBottom
              sx={{ paddingBottom: "2rem", marginBottom: "1rem" }}
            />
            <ManageSegment listing={listing} items={items} userID={userID} />
          </div>
        </>
      ) : (
        <div className="listing-details-err-msg">Cannot find the listing!</div>
      )}
    </div>
  );
}

export default ListingDetailsOwner;
