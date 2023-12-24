import React, { useContext } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { NavContext } from "../context/navContext";
import { useEffect } from "react";

function Navbar() {
  const { onDashboard } = useContext(NavContext);

  useEffect(() => {
    const elem = document.querySelector(".links>*");
    if (onDashboard) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }
  }, [onDashboard]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>ShopTGT</h1>
      </div>
      <div className="links">
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faUserCircle} style={{visibility: "hidden"}}/>
      </div>
    </nav>
  );
}

export default Navbar;
