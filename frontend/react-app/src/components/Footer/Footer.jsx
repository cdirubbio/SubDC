import React from "react"
import "./Footer.css"

export default function Authentication() {
    return (
        <footer className="footer">
      {/* Container for content in the footer */}
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Listings">Listings</a></li>
            <li><a href="/CreateListing">Create Listing</a></li>
            <li><a href="/AboutUs">About Us</a></li>

          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><a href="mailto:support@subdc.com">Email: support@subdc.com</a></p>
          <p><a href="https://maps.google.com/?q=2201%20G%20St%20NW,%20Washington,%20DC%2020052">2201 G St NW, Washington, DC 20052</a></p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
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