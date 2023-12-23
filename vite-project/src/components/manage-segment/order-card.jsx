import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OrderSummary from '../order-segment/view-summary-segment/order-summary'

function OrderCard({ buyerEmail, phone, items, orderQuantities }) {
  return (
    <Card sx={{ mt: 2, backgroundColor: '#d4e9ff' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom component="div">
          {buyerEmail}&apos;s order
        </Typography>
        <Typography variant="h6" gutterBottom component="div" sx={{fontSize: '0.8rem'}}>
          contact: {phone}
        </Typography>
        <OrderSummary items={items} orderQuantities={orderQuantities} toDisplayAll={false}/>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
