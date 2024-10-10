import React, { useState, useEffect } from "react";
import "./Listings.css";
import ListingCard from "./ListingCard/ListingCard";

export default function Listings() {
    const [listings, setListings] = useState({
        studio: [],
        "1br": [],
        "2br": [],
    });

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`${window.BACKEND_URL}/api/listings`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const categorizedListings = {
                    studio: [],
                    "1br": [],
                    "2br": [],
                };
                data.forEach((listing) => {
                    categorizedListings[listing.apt_type].push(listing);
                });
                setListings(categorizedListings);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div className="Listings">
            <h2 className="search-heading">EXPLORE</h2>
            <div className="search-bar-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by neighborhood, price, or apartment type..."
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div>
                <h5 className="apartment-type">STUDIO APARTMENTS</h5>
                <div className="grid-container">
                    {listings["studio"].map((listing) => (
                        <ListingCard
                            key={listing.listing_id}
                            listing_id={listing.listing_id}
                            listingName={listing.title}
                            listingLocation={listing.location}
                            listingPrice={listing.price}
                            listingImage={listing.image1}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h5 className="apartment-type">1 BEDROOM APARTMENTS</h5>
                <div className="grid-container">
                    {listings["1br"].map((listing) => (
                        <ListingCard
                            key={listing.listing_id}
                            listing_id={listing.listing_id}
                            listingName={listing.title}
                            listingLocation={listing.location}
                            listingPrice={listing.price}
                            listingImage={listing.image1}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h5 className="apartment-type">2 BEDROOM APARTMENTS</h5>
                <div className="grid-container">
                    {listings["2br"].map((listing) => (
                        <ListingCard
                            key={listing.listing_id}
                            listing_id={listing.listing_id}
                            listingName={listing.title}
                            listingLocation={listing.location}
                            listingPrice={listing.price}
                            listingImage={listing.image1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
