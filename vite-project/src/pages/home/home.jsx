import React, { useState, useEffect } from "react";
import Listing from "../../components/listing"; // Import the Listing component
import Navbar from "../../components/navbar";
import "./home.css";
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
    setListings([
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
      {
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
        title: "Test 1",
        description: "Just a sample",
      },
    ]);
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
