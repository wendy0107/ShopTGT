import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TotalOrderList from "./total-order-list";
import AdjustFinalOrderSection from "./adjust-final-order-section";

function OwnerMakeOrderSegment({
  listing,
  ownerOrder,
  otherOrders,
  items,
  setCurrentStage,
  ownerDetails,
  buyerDetails
}) {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    setOrders([...ownerOrder, ...otherOrders]);
    setUserDetails([ownerDetails, ...buyerDetails])
  }, [ownerOrder, otherOrders]);

  const handleReopen = () => {
    setCurrentStage("OPEN");
  };
  const handleCloseOrder = () => {
    setCurrentStage("FINALISED");
  };

  return (
    <>
      <TotalOrderList orders={orders} items={items} />
      <AdjustFinalOrderSection orders={orders} items={items} userDetails={userDetails}/>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 0 1rem",
        }}
      >
        <Button variant="contained" color={"secondary"} onClick={handleReopen}>
          Reopen listing
        </Button>
        <Button variant="contained" onClick={handleCloseOrder}>
          Finalize order
        </Button>
      </div>
    </>
  );
}

export default OwnerMakeOrderSegment;
