import React from "react";
import {Link} from "react-router-dom";
import {User} from "phosphor-react";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="HomeLink">
                <Link to="/"> ShopTGT </Link>
                <Link to="/user/home">
                    <User size={32}/>
                </Link>
            </div>
        </div>
        );
};