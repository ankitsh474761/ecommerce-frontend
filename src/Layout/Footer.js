import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <h1 className="footer-head">All Rights Reserved &copy; AS</h1>
      <p className="links">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/policy"}>Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer