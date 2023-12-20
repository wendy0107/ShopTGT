import React, {useState} from "react"
import {LockSimple, User} from "phosphor-react"
import './signup.css'

export const SignUp = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <User size={30} className="icon" />
                    <input type="text" placeholder="Username" />
                </div>
                <div className="input">
                    <LockSimple size={30} className="icon"/>
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action !== "Sign Up" && (
                <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
            )}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up </div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}> Login </div>
            </div>
        </div>
        );
};