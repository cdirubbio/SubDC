import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css"

export default function Footer() {
  return (

    <footer className="footer">
      <script src="https://kit.fontawesome.com/2c390d95a8.js" crossOrigin="anonymous"></script>

      <div className="footer-container">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Listings">Listings</a></li>
            <li><a href="/CreateListing">Create Listing</a></li>
            <li><a href="/Authentication">Account</a></li>
            <li><a href="https://ipropertymanagement.com/laws/subletting-laws#:~:text=Find%20out%20if%20subletting%20is%20legal%20in%20each">Sublet Policies by State</a></li>
            {/* <li><a href="/AboutUs">About Us</a></li> */}

          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><a href="mailto:support@subdc.co">support@subdc.co</a></p>
          <p><a href="https://maps.google.com/?q=2201%20G%20St%20NW,%20Washington,%20DC%2020052" target="_blank" rel="noreferrer">2201 G St NW, Washington, DC 20052</a></p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">

            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.linkedin.com/company/subdc" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SubDC. All Rights Reserved.</p>
      </div>
    </footer>
  );
}