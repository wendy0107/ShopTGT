import React, { useState } from "react";
import Home from "./pages/home/home";
// import { Login } from "./pages/login";
import { SignUp } from "./pages/signup/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavContext } from "./components/navContext";

function App() {
  // const [activeLink, setActiveLink] = useState("link-home");

  return (
    <div className="App">
      {/* <NavContext.Provider value={{ activeLink, setActiveLink }}> */}
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/user/home" element={<Home />} />
          </Routes>
        </Router>
      {/* </NavContext.Provider> */}
    </div>
  );
}

export default App;
