import React, { useState, useEffect } from "react"
import "./Listings.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ListingCard from "./ListingCard/ListingCard";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


export default function Listings() {

    const [listings, setListings] = useState({
        studio: [],
        '1br': [],
        '2br': []
    });

    useEffect(() => {
        
        const fetchListings = async () => {
            try {
                const response = await fetch(`${window.BACKEND_URL}/api/listings`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const categorizedListings = {
                    studio: [],
                    '1br': [],
                    '2br': []
                };
                data.forEach(listing => {
                    categorizedListings[listing.apt_type].push(listing);
                });
                setListings(categorizedListings);
            } catch (error) {
                console.error('Failed to fetch listings:', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div className="Listings">
            <h2 className="search-heading mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">Explore Listings</h2>
            {/* <section className="search-bar-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by neighborhood, school, or property type..."
                />
                <button className="search-button">Search</button>
            </section> */}
            <div>
                <h5 className="apartment-type mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Studio Apartments
                </h5>
                <Carousel responsive={responsive} infinite={true}>
                    {listings.studio.map(listing => (
                        <div key={listing.listing_id}>
                            <ListingCard
                                listing_id={listing.listing_id}
                                listingImage={listing.image1}
                                listingName={listing.title}
                                listingPrice={listing.price}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div>
                <h5 className="apartment-type mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    1-Bedroom Apartments
                </h5>
                <Carousel responsive={responsive} infinite={true}>
                    {listings['1br'].map(listing => (
                        <div key={listing.listing_id}>
                            <ListingCard
                                listing_id={listing.listing_id}
                                listingImage={listing.image1} 
                                listingName={listing.title}
                                listingPrice={listing.price}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div>
                <h5 className="apartment-type mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    2-Bedroom Apartments
                </h5>
                <Carousel responsive={responsive} infinite={true}>
                    {listings['2br'].map(listing => (
                        <div key={listing.listing_id}>
                            <ListingCard
                                listingImage={listing.image1} 
                                listing_id={listing.listing_id}
                                listingName={listing.title}
                                listingPrice={listing.price}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
