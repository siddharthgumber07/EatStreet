import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="footer-logo" src={assets.logo1} alt="" />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores impedit quidem quasi dolore similique dolor error adipisci perferendis ducimus? Vitae eaque placeat tenetur? Necessitatibus aliquam dolor odit iste a ducimus fugiat, quia magni veritatis explicabo? Expedita vero officia magnam deleniti consectetur odit facere odio, maxime excepturi fugit dignissimos assumenda!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-8537393624</li>
            <li>contact@eatstreet.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © EatStreet.com - All Right Reserved</p>

    </div>
  )
}

export default Footer
