import React, { useState, useEffect } from "react";
import Listing from "../../components/listing"; // Import the Listing component
import Navbar from "../../components/navbar";
import "./home.css";
import { listingExamples } from "../../listing-examples";
// import axios from 'axios'; // Assuming you're using axios for API calls

function Home() {
  const [listings, setListings] = useState([]);

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
    setListings(listingExamples);
  }, []);

  return (
    <div className="home-container">
      <Navbar /> {/* Render Navbar before other content */}
      <div className="home-content">
        <div className="listings-container">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <Listing key={listing.id} listing={listing} />
            ))
          ) : (
            <p className="no-listing-text">There are no listings right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
