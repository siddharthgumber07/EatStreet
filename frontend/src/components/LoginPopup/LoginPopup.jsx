import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState]=useState(" LogIn")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="LogIn"?<></>:<input type="text" placeholder='Your Name' required />}
            <input type="email" placeholder='Your Email' required />
            <input type="password" placeholder='Password' required />
        </div>
        <button>{currState==="Sign Up"?"Create Account":"LogIn"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="LogIn"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("LogIn")}>Login here</span></p>}
        
      </form>
    </div>
  )
}

export default LoginPopup
