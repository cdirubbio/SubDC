import React from "react"
import "./Home.css"
import { Link } from "react-router-dom";
import ListingCard from "../Listings/ListingCard/ListingCard";

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
        <h2 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Featured Listings</span>
        </h2>
        <div className="listings-container">
          <ListingCard
            listingPrice="2400"
            listingImage="./../../images/listing.jpg"
            listingName="1 Bedroom Apartment in Foggy Bottom"
          />
          <ListingCard
            listingPrice="2000"
            listingImage="./../../images/listing3.jpg"
            listingName="Studio Apartment in Foggy Bottom"
          />
          <ListingCard
            listingPrice="4000"
            listingImage="./../../images/listing2.jpg"
            listingName="2 Bedroom Apartment in Foggy Bottom"
          />
          <ListingCard
            listingPrice="5500"
            listingImage="./../../images/listing4.jpeg"
            listingName="2 Bedroom + Den Apartment near GWU"
          />
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