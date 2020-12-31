import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-socials-wrapper">
        <Socials />
      </div>
      <div className="footer-links-wrapper">
        <Links />
      </div>
    </div>
  );
}

function Socials() {
  return (
    <div className="footer-socials-container">
      <SocialButton iconSrc="./img/twitter.png" href="#" />
      <SocialButton iconSrc="./img/youtube.png" href="#" />
      <SocialButton iconSrc="./img/in.png" href="#" />
    </div>
  );
}

function SocialButton({ iconSrc, href }) {
  return (
    <button className="footer-social-btn">
      <img src={iconSrc} className="footer-social-icon" alt="" />
    </button>
  );
}

function Links() {
  return (
    <div>

    </div>
  );
}