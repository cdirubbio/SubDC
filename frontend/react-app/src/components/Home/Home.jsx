import React, { useState, useEffect } from "react"
import "./Home.css"
import { Link } from "react-router-dom";
import ListingCard from "../Listings/ListingCard/ListingCard";

export default function Home() {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const requests = [1, 2, 3, 4].map(id =>
          fetch(`${window.BACKEND_URL}/api/listing`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ listing_id: id })
          })
        );
  
        const responses = await Promise.all(requests);
  
        for (const response of responses) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        }
  
        const data = await Promise.all(responses.map(response => response.json()));
  
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };
  
    fetchFeaturedListings();
  }, []);
    return (
      <div className="homepage">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="text-on-image">Find Your Perfect Sublease in Washington DC</h1>
            <p className="text-on-image">Discover affordable sublease options for students in the DC area.</p>
            <Link to="Listings"><button className="cta-button">Start Searching</button></Link>
          </div>
        </section>
        <section className="featured-listings">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Featured Listings</span>
          </h2>
          <div className="listings-container">
            {listings.map(listing => (
        <ListingCard
          key={listing.listing_id}
          // listingImage={listing.image_url}
          listingName={listing.title}
          listingPrice={listing.price}
          listing_id={listing.listing_id}
        />
      ))}
          </div>
        </section>
        <section className="how-it-works">
          <h2 className="font-extrabold">How It Works</h2>
          <p>
            SubDC is designed to simplify the subleasing process for students in Washington DC. Whether you're looking for a temporary place to stay or need someone to take over your lease, SubDC provides a straightforward and secure platform to connect with others. Here’s how it works:
          </p>
          <div className="steps-container">
            <div className="step">
              <h3>Step 1: Create an Account</h3>
              <p>
                To get started, create a free account on SubDC using your student email. This allows us to verify that all users are genuine students, ensuring a safe and trustworthy environment. Once registered, you can start browsing listings or create your own.
              </p>
              <Link to="Authentication"><button className="register-button"><strong>Register Here</strong></button></Link>
            </div>
            <div className="step">
              <h3>Step 2: Browse Listings or Post Your Own</h3>
              <p>
                Use our advanced search filters to find the perfect sublease that matches your needs—filter by neighborhood, price, duration, and more. Alternatively, if you're looking to sublease your apartment, easily create a listing with details like rent, location, and photos to attract potential subtenants.
              </p>
            </div>

            <div className="step">
              <h3>Step 3: Payment + Terms</h3>
              <p>
                After you’ve found an appropriate place to sublet or a person to sublet to, payment is made simple as our platform is integrated with Stripe. The Sublettor then agrees to the terms that the Sublessor has outlined for the period.
              </p>
            </div>
            <div className="step">
              <h3>Step 4: Move In or Sublease Your Apartment</h3>
              <p>
                Once everything is set, all that’s left is to move in and enjoy your new place or hand over the keys to your subtenant. Whether you’re looking for a short-term rental during the summer or need to sublease while studying abroad, SubDC makes the process smooth and hassle-free.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }