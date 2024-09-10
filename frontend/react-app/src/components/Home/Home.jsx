import React from "react"
import "./Home.css"
import { Link } from "react-router-dom";
import ListingCard from "../Listings/ListingCard/ListingCard";
// Mocked Images for now
import listingImage1 from '../../images/listing.jpg';
import listingImage3 from '../../images/listing3.jpg';
import listingImage2 from '../../images/listing2.jpg';
import listingImage4 from '../../images/listing4.jpg';


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
      {/* <section className="search-bar-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search by neighborhood, school, or property type..."
        />
        <button className="search-button">Search</button>
      </section> */}
      <section className="featured-listings">
        <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Featured Listings</span>
        </h2>
        <div className="listings-container">
          {/* MOCK LISTINGS FOR NOW */}
          <ListingCard
            listingPrice="2400"
            listingImage={listingImage1}
            listingName="1 Bedroom Apartment in Foggy Bottom"
          />
          <ListingCard
            listingPrice="2000"
            listingImage={listingImage3}
            listingName="Studio Apartment in Foggy Bottom"
          />
          <ListingCard
            listingPrice="4000"
            listingImage={listingImage2}
            listingName="2 Bedroom Apartment in Foggy Bottom"
          />
          <ListingCard
            listingPrice="5500"
            listingImage={listingImage4}
            listingName="2 Bedroom + Den Apartment near GWU"
          />
        </div>
      </section>
      <section className="how-it-works">
      <h2 className="font-extrabold">How It Works</h2>
      <p>
        SubDC is designed to simplify the subleasing process for students in Washington DC. Whether you're looking for a temporary place to stay or need someone to take over your lease, SubDC provides a straightforward and secure platform to connect with others. Here’s how it works:
      </p>

      {/* Step-by-step breakdown */}
      <div className="steps-container">
        {/* Step 1 */}
        <div className="step">
          <h3>Step 1: Create an Account</h3>
          <p>
            To get started, create a free account on SubDC using your student email. This allows us to verify that all users are genuine students, ensuring a safe and trustworthy environment. Once registered, you can start browsing listings or create your own.
          </p>
          <Link to="Authentication"><button className="register-button"><strong>Register Here</strong></button></Link>
        </div>

        {/* Step 2 */}
        <div className="step">
          <h3>Step 2: Browse Listings or Post Your Own</h3>
          <p>
            Use our advanced search filters to find the perfect sublease that matches your needs—filter by neighborhood, price, duration, and more. Alternatively, if you're looking to sublease your apartment, easily create a listing with details like rent, location, and photos to attract potential subtenants.
          </p>
        </div>

        <div className="step">
          <h3>Step 4: Finalize the Agreement</h3>
          <p>
            After you’ve found an appropriate place to sublet or a person to sublet through, payment is made simple with our Stripe Integration
          </p>
        </div>
        <div className="step">
          <h3>Step 5: Move In or Sublease Your Apartment</h3>
          <p>
            Once everything is set, all that’s left is to move in and enjoy your new place or hand over the keys to your subtenant. Whether you’re looking for a short-term rental during the summer or need to sublease while studying abroad, SubDC makes the process smooth and hassle-free.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
}