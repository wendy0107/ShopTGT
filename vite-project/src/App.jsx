import React, { useState, useEffect } from "react";
import Dashboard from "./pages/dashboard/dashboard";
import { SignUp } from "./pages/signup/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingDetails from "./pages/listing-details/listing-details";
import ListingDetailsOwnerView from "./pages/listing-details/listing-details-owner";
import { NavContext } from "./context/navContext";
import { UserContext } from "./context/userContext";
import PrivateRoutes from "./PrivateRoute";

function App() {
  const [onDashboard, setOnDashboard] = useState(false);
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState('');
  const [lastPath, setLastPath] = useState("");
  
  return (
    <div className="App">
      <UserContext.Provider value={{ userID, setUserID, userEmail, setUserEmail }}>
        <NavContext.Provider value={{ onDashboard, setOnDashboard }}>
          <Router>
            <Routes>
              <Route path="/" element={<SignUp lastPath={lastPath}/>} />
              <Route element={<PrivateRoutes setLastPath={setLastPath}/>}>
                <Route
                  path="/dashboard"
                  element={<Dashboard ownerEmail={userEmail} />}
                />
                <Route path="/listing/:listing_id" element={<ListingDetails />} />
                <Route
                  path="/listing-owner"
                  element={<ListingDetailsOwnerView />}
                />
              </Route>
            </Routes>
          </Router>
        </NavContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
