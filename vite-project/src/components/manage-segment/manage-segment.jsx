import React, { useState, useRef, useEffect } from "react";
import ProgressBarOwner from "./progress-bar-owner";
import { Divider, Typography } from "@mui/material";
import AcceptOrderSegment from "./accept-order-segment/accept-order-segment";
import OwnerMakeOrderSegment from "./owner-make-order-segment/owner-make-order-segment";
import WaitOrderSegment from "./wait-order-segment/wait-order-segment";
import OrderArrivedSegment from "./order-arrived-segment/order-arrived-segment";
import DeleteListingSection from "./delete-listing-section";

function ManageSegment({ listing, items, userID }) {
  // States
  const [currentStage, setCurrentStage] = useState("OPEN");
  const [ownerOrder, setOwnerOrder] = useState([]);
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [otherOrders, setOtherOrders] = useState([]);
  const [otherBuyerDetails, setOtherBuyerDetails] = useState([]);

  // Update current stage upon loading page
  useEffect(() => {
    setCurrentStage(listing.status);
  }, [listing]);

  const getOwnerOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/${listing.id}/${userID}/owner`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("owner order", data);
      setOwnerOrder(data.order);

      const response_1 = await fetch(`http://localhost:3000/user/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data_1 = await response_1.json();
      // console.log("owner order details", data_1);
      setOwnerDetails(data_1.user_details[0]);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  const getOtherOrders = async () => {
    try {
      const response = await fetch(
        // `http://localhost:3000/orders/${listing.id}/buyers`,
        `http://localhost:3000/orders/${listing.id}/buyers-details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log('other order', data)
      setOtherOrders(data.orders);
      setOtherBuyerDetails(
        data.buyers.map((buyer) => {
          return { email: buyer.buyer_email, phone: buyer.buyer_phone };
        })
      );
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  // Get latest order for everyone every time the status changes
  useEffect(() => {
    getOwnerOrder();
    getOtherOrders();
  }, [currentStage]);

  // Wrap setCurrentStage in function that updates listing status
  const updateListingStatus = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/listings/${listing.id}/update-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      // console.log('update status', data)
      setCurrentStage(status);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  const renderContent = () => {
    switch (currentStage) {
      case "OPEN":
        return (
          <AcceptOrderSegment
            listing={listing}
            ownerOrder={ownerOrder}
            ownerDetails={ownerDetails}
            otherOrders={otherOrders}
            buyerDetails={otherBuyerDetails}
            items={items}
            setCurrentStage={updateListingStatus}
          />
        );
        break;
      case "CLOSED":
        return (
          <OwnerMakeOrderSegment
            listing={listing}
            ownerOrder={ownerOrder}
            ownerDetails={ownerDetails}
            otherOrders={otherOrders}
            buyerDetails={otherBuyerDetails}
            items={items}
            setCurrentStage={updateListingStatus}
          />
        );
        break;
      case "FINALISED":
        return (
          <WaitOrderSegment
            listing={listing}
            ownerOrder={ownerOrder}
            ownerDetails={ownerDetails}
            otherOrders={otherOrders}
            buyerDetails={otherBuyerDetails}
            items={items}
            setCurrentStage={updateListingStatus}
          />
        );
        break;
      case "ARRIVED":
        return (
          <OrderArrivedSegment
            listing={listing}
            items={items}
            ownerOrder={ownerOrder}
            ownerDetails={ownerDetails}
            otherOrders={otherOrders}
            buyerDetails={otherBuyerDetails}
            setCurrentStage={updateListingStatus}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "600" }} gutterBottom>
        Join order
      </Typography>
      <ProgressBarOwner currentStage={currentStage} />
      {renderContent()}
      <Divider sx={{ margin: "2rem" }} />
      <DeleteListingSection listingId={listing.id} />
    </>
  );
}

export default ManageSegment;
