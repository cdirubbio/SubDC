import React, { useState, useEffect } from "react";
import "./Listings.css";
import ListingCard from "./ListingCard/ListingCard";

export default function Listings() {
    const [listings, setListings] = useState({
        studio: [],
        "1br": [],
        "2br": [],
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredListings, setFilteredListings] = useState({
        studio: [],
        "1br": [],
        "2br": [],
    });

    const handleCardClick = (e) => {
        e.preventDefault();
    };

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
                setFilteredListings(categorizedListings);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        };

        fetchListings();
    }, []);

    useEffect(() => {
        const filterListings = () => {
            const newFilteredListings = {
                studio: listings.studio.filter((listing) =>
                    listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.zip_code?.includes(searchQuery) ||
                    listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.price?.toString().includes(searchQuery)
                ),
                "1br": listings["1br"].filter((listing) =>
                    listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.zip_code?.includes(searchQuery) ||
                    listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.price?.toString().includes(searchQuery)
                ),
                "2br": listings["2br"].filter((listing) =>
                    listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.zip_code?.includes(searchQuery) ||
                    listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.price?.toString().includes(searchQuery)
                ),
            };
            setFilteredListings(newFilteredListings);
        };


        filterListings();
    }, [searchQuery, listings]);

    return (
        <div className="Listings">
            <h2 className="search-heading">EXPLORE</h2>
            <div className="search-bar-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by neighborhood, zip code, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div>
                <h5 className="apartment-type">STUDIO APARTMENTS</h5>
                <div className="grid-container">
                    {filteredListings.studio.map((listing) => (
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
                    {filteredListings["1br"].map((listing) => (
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
                    {filteredListings["2br"].map((listing) => (
                        <ListingCard
                            onClick={handleCardClick}
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
