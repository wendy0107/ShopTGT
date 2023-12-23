import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

function ContactCard({ name, email, phone }) {
  return (
    <Card sx={{ mt: 3, ml: "1rem", mr: "1rem", backgroundColor:"#d4e9ff" }}>
      <CardHeader title="Owner's contact card" sx={{pb: "0rem"}} titleTypographyProps={{
    fontSize: 16,
  }}/>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">{email}</Typography>
        <Typography variant="body1">{phone}</Typography>
      </CardContent>
    </Card>
  );
}

export default ContactCard;