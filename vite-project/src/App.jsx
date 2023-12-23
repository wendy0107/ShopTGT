import React, { useState } from "react";
import Dashboard from "./pages/dashboard/dashboard";
import { SignUp } from "./pages/signup/signup";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import ListingDetails from "./pages/listing-details/listing-details";
import ListingDetailsOwnerView from "./pages/listing-details/listing-details-owner";
import { NavContext } from "./context/navContext";
import { UserContext } from "./context/userContext";


function App() {
  const [ onDashboard, setOnDashboard ] = useState(false);
  const [ userID, setUserID ] = useState("");

  return (
    <div className="App">
      <UserContext.Provider value={{ userID, setUserID }}>
        <NavContext.Provider value={{ onDashboard, setOnDashboard }}>
          <Router>
          <Switch>
            {/* <Routes> */}
              <Route path="/" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard ownerEmail={'hngshanhern@gmail.com'}/>} />
              <Route path="/user/listing" element={<ListingDetails />} />
              <Route path="/user/listing-owner" element={<ListingDetailsOwnerView />} />
            {/* </Routes> */}
            </Switch>
          </Router>
        </NavContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
