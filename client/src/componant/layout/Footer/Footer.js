import React from "react";
import playStore from "../../../image/playstore.png";
import appStore from "../../../image/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeHarshitverma</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/harshitverma0511/" target="_blank" rel="noreferrer" >Instagram</a>
        <a href="https://github.com/Harshitver0511" target="_blank" rel="noreferrer" >GitHub</a>
        <a href="https://www.linkedin.com/in/harshit-verma-5ba1a828a/" target="_blank" rel="noreferrer" >Linkedin</a>
      </div>
    </footer>
  );
};

export default Footer;