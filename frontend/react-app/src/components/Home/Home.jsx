import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ListingCard from "../Listings/ListingCard/ListingCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const [location, setLocation] = useState("Washington DC");
  const locations = ["the DMV", "Arlington", "Bethesda", "Washington DC"];
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const updateLocation = () => {
      setLocation((prevLocation) => {
        const currentIndex = locations.indexOf(prevLocation);
        const nextIndex = (currentIndex + 1) % locations.length;
        return locations[nextIndex];
      });
    };
    const interval = setInterval(updateLocation, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const requests = [1, 2, 3, 4].map((id) =>
          fetch(`${window.BACKEND_URL}/api/listing/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        );

        const responses = await Promise.all(requests);

        for (const response of responses) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        }

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchFeaturedListings();
  }, []);

  const carouselResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-image">
          <div className="title-text-div">
            <h1 className="text-on-image">
              Find Your Perfect Sublease in{" "}
              <span className="location">{location}</span>
            </h1>
            <p className="text-on-image">
              Discover affordable sublease options for students in the DC area.
            </p>
            <Link to="Explore">
              <button className="cta-button">Start Searching</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-listings">
        <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
          <span className="featured-listings-text">
            <strong>FEATURED LISTINGS</strong>
          </span>
        </h2>
        <div className="listings-container">
          {listings.map((listing) => (
            <ListingCard
              key={listing.listing_id}
              listingImage={listing.image1}
              listingLocation={listing.location}
              listingName={listing.title}
              listingPrice={listing.price}
              listing_id={listing.listing_id}
            />
          ))}
        </div>
      </section>

      <section className="why-choose-us">
        <h2 className="font-extrabold">WHY CHOOSE SUBDC</h2>
        <div className="benefits-container">
          <div className="benefit">
            <h3>Trustworthy and Verified</h3>
            <p>
              Our platform is designed exclusively for students, ensuring all users
              are verified and providing a secure subleasing experience.
            </p>
          </div>
          <div className="benefit">
            <h3>Easy and Accessible</h3>
            <p>
              With user-friendly search filters and a simple interface, finding
              the perfect sublease or posting your listing has never been easier.
            </p>
          </div>
          <div className="benefit">
            <h3>Integrated Payment System</h3>
            <p>
              Securely handle payments through our platform with Stripe integration,
              making transactions smooth and hassle-free.
            </p>
          </div>
          <div className="benefit">
            <h3>Exclusive Student Deals</h3>
            <p>
              Discover affordable subleases tailored to students, with prices and
              options ideal for a college budget.
            </p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2 className="font-extrabold">WHAT STUDENTS ARE SAYING</h2>
        <Carousel
          responsive={carouselResponsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3500}
          showDots={true}
          className="testimonials-carousel"
        >
          <div className="testimonial">
            <p className="quote">
              "SubDC made it so easy to find a sublease for the summer! The process
              was simple and secure, and I found a place in my budget within days."
            </p>
            <p className="author">– Emily, Georgetown University</p>
          </div>
          <div className="testimonial">
            <p className="quote">
              "Thanks to SubDC, I was able to quickly sublease my apartment while I
              studied abroad."
            </p>
            <p className="author">– Michael, George Washington University</p>
          </div>
          <div className="testimonial">
            <p className="quote">
              "I love how user-friendly SubDC is! Finding a subtenant was so easy,
              and I feel secure knowing all users are verified students."
            </p>
            <p className="author">– Sarah, American University</p>
          </div>
        </Carousel>
      </section>
    </div>
  );
}
