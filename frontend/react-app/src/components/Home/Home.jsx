import React from "react"
import "./Home.css"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="text-on-image">Find Your Perfect Sublease in Washington DC</h1>
          <p className="text-on-image">Discover affordable sublease options for students in the DC area.</p>
          <Link to="Listings"><button className="cta-button">Start Searching</button></Link>
        </div>
      </section>
      <section className="search-bar-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search by neighborhood, school, or property type..."
        />
        <button className="search-button">Search</button>
      </section>
      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="listings-container">
          <div className="listing-card">
            <img src="listing-image.jpg" alt="Listing" className="listing-image" />
            <h3>Studio Apartment in Foggy Bottom</h3>
            <p>$1200/month</p>
            <button className="view-details-button">View Details</button>
          </div>
        </div>
      </section>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>
          SubDC connects students looking for sublease options with those who need to sublease their apartments.
          Create an account, list your property, or find a sublease that suits your needs.
        </p>
      </section>
    </div>
  );
}