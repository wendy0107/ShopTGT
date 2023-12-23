import React, { useState } from "react";
import Dashboard from "./pages/dashboard/dashboard";
import { SignUp } from "./pages/signup/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingDetails from "./pages/listing-details/listing-details";
import ListingDetailsOwnerView from "./pages/listing-details/listing-details-owner";
import { NavContext } from "./context/navContext";

function App() {
  const [onDashboard, setOnDashboard] = useState(false);

  return (
    <div className="App">
      <NavContext.Provider value={{ onDashboard, setOnDashboard }}>
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard ownerEmail={'hngshanhern@gmail.com'}/>} />
            <Route path="/user/listing" element={<ListingDetails />} />
            <Route path="/user/listing-owner" element={<ListingDetailsOwnerView />} />
          </Routes>
        </Router>
      </NavContext.Provider>
    </div>
  );
}

export default App;
