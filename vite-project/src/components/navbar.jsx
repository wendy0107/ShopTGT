import React, { useContext } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { NavContext } from "./navContext";
import { useState } from "react";

function Navbar() {
    const [activeLink, setActiveLink] = useState("link-home");
//   const { activeLink, setActiveLink } = useContext(NavContext);

  useEffect(() => {
    // Remove active state from all links:
    const allLinks = document.querySelectorAll(".links > *");
    if (allLinks) {
      allLinks.forEach((link) => {
        link.classList.remove("active");
      });
    }

    const activeLinkElem = document.querySelector("." + activeLink);
    // Set the clicked link to active:
    activeLinkElem?.classList.add("active");
  }, [activeLink]);

  const handleLinkClick = (className) => {
    console.log(className);
    setActiveLink(className);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>ShopTGT</h1>
      </div>
      <div className="links">
        <Link
          to="/user/home"
          className="link-home"
          onClick={(e) => handleLinkClick(e.target.className)}
        >
          Home
        </Link>
        <Link
          to="/user/home"
          className="link-dummy"
          onClick={(e) => handleLinkClick(e.target.className)}
        >
          Dummy
        </Link>
      </div>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
    </nav>
  );
}

export default Navbar;
