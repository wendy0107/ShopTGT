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
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  // get listing
  useEffect(() => {
    getListing();
  }, []);

  // check current user id against listing id
  const { userID } = useContext(UserContext);
  const isOwnerListing = userID == listing.owner_id;

  return (
    <>
      {isOwnerListing ? (
        <ListingDetailsOwner listing={listing} items={items} userID={userID}/>
      ) : (
        <ListingDetailsOther listing={listing} items={items} userID={userID}/>
      )}
    </>
  );
}

export default ListingDetails;
