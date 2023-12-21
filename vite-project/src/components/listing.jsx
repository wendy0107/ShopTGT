import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material'; // Assuming you're using Material UI

function Listing({ listing }) {
  return (
    <Card sx={{ '&:hover': {boxShadow: '3px 3px 5px grey'}, '&:active': {filter: 'brightness(0.8)'} }}>
      <CardMedia
        component="img"
        height="200"
        image={listing.imageUrl} // Assuming you have an imageUrl property in your listing data
        alt={listing.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {listing.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {listing.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Listing;