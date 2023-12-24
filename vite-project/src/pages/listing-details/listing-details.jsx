import React, { useContext, useState } from "react";
import { NavContext } from "../../context/navContext";
import { useEffect } from "react";
import "./listing-details.css";
import { useParams } from "react-router";
import { UserContext } from "../../context/userContext";
import ListingDetailsOther from "./listing-details-other";
import ListingDetailsOwner from "./listing-details-owner";

function ListingDetails() {
  const { listing_id } = useParams();
  const [listing, setListing] = useState({});
  const [items, setItems] = useState([]);

  // setting Navbar
  const { setOnDashboard } = useContext(NavContext);
  useEffect(() => {
    setOnDashboard(false);
  }, []);

  const getListing = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/listings/${listing_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setItems(data.items);
      setListing(data.listing[0]);
      console.log(data.listing[0])
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  const [ownerDetails, setOwnerDetails] = useState(null);

  const getOwnerDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${listing.owner_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("contact details", data);
      setOwnerDetails(data.user_details[0]);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };
  useEffect(() => {
    getOwnerDetails();
  }, [listing]);

  // get listing
  useEffect(() => {
    getListing();
  }, []);

  // check current user id against listing id
  const { userID } = useContext(UserContext);
  const isOwnerListing = userID == listing.owner_id;
  // console.log('user ID', userID)
  // console.log('listing id', listing)
  return (
    <>
      {isOwnerListing ? (
        <ListingDetailsOwner listing={listing} items={items} userID={userID} ownerDetails={ownerDetails}/>
      ) : (
        <ListingDetailsOther listing={listing} items={items} userID={userID} ownerDetails={ownerDetails}/>
      )}
    </>
  );
}

export default ListingDetails;
