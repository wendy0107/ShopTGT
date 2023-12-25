import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material"; // Assuming you're using Material UI
import { Link } from "react-router-dom";

function Listing({ listing, userDetails }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          "&:hover": { boxShadow: "3px 3px 5px grey" },
          "&:active": { filter: "brightness(0.8)" },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={
            "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg"
          } // Assuming you have an imageUrl property in your listing data
          alt={listing.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {listing.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            posted by {userDetails?.email} on {listing.creation_date}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Listing;
