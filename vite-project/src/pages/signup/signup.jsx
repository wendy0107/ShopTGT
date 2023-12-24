import React, { useContext, useState, useEffect } from "react";
import { EnvelopeSimple } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./signup.css";

export const SignUp = ({ lastPath }) => {
  const { userID, setUserID, setUserEmail } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      lastPath ? navigate(lastPath) : navigate("/dashboard");
    }
  }, [userID]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (email) {
        setUserEmail(email);
        setUserID(data);
      }
    } catch (error) {
      console.error("Error with backend:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        {/* <div className="text">{action}</div> */}
        <div className="text"> Login </div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <EnvelopeSimple size={30} className="icon" />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="input" onChange={(e) => setPassword(e.target.value)}>
                    <LockSimple size={30} className="icon"/>
                    <input type="password" placeholder="Password"/>
                </div> */}
      </div>
      {/* {action !== "Sign Up" && (
                <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
            )} */}
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
