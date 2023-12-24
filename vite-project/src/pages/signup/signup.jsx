import React, { useContext, useState, useEffect } from "react";
import { EnvelopeSimple, Phone } from "phosphor-react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./signup.css";

export const SignUp = ({ lastPath }) => {
  const { userID, setUserID, setUserEmail } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      lastPath ? navigate(lastPath) : navigate("/dashboard");
    }
  }, [userID]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://47.128.228.140:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });
      const data = await response.json();
      if (email) {
        setUserEmail(email);
        setUserID(data);
      }
      console.log("User id", userID);
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Login </div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <EnvelopeSimple size={30} className="icon" />
          <TextField
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> */}
        </div>
        <div className="input">
          <Phone size={30} className="icon" />
          <TextField
            type="tel"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
          {/* <input type="text" placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} /> */}
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={(e) => handleLogin(e)}>
          {" "}
          Login{" "}
        </div>
        {/* <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up </div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}> Login </div> */}
      </div>
    </div>
  );
};
