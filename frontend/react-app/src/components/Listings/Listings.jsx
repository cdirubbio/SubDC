import React from "react"
import "./Listings.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ListingCard from "./ListingCard/ListingCard";
// Mocked Images for now
import listingImage1 from '../../images/listing.jpg';
import listingImage3 from '../../images/listing3.jpg';
import listingImage2 from '../../images/listing2.jpg';
import listingImage4 from '../../images/listing4.jpg';


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
    return (
        <div className="Listings">
            <h2 className="search-heading mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">Search for a Listing Below</h2>
            <section className="search-bar-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by neighborhood, school, or property type..."
                />
                <button className="search-button">Search</button>
            </section>
            <div>
            <h5 className="apartment-type mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                Studio Apartments
            </h5>
                <Carousel responsive={responsive}>
                    <div>
                        <ListingCard
                            listingPrice="2000"
                            listingImage={listingImage3}
                            listingName="Studio Apartment in Foggy Bottom"
                        />
                    </div>
                </Carousel>
            </div>
            <div>
            <h5 className="apartment-type mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                1-Bedroom Apartments
                </h5>
                <Carousel responsive={responsive}>
                    <div>
                        <ListingCard
                            listingPrice="2400"
                            listingImage={listingImage1}
                            listingName="1 Bedroom Apartment in Foggy Bottom"
                        />
                    </div>
                    <div>
                        <ListingCard
                            listingPrice="2400"
                            listingImage={listingImage1}
                            listingName="1 Bedroom Apartment in Foggy Bottom"
                        />
                    </div>
                    <div>
                        <ListingCard
                            listingPrice="2400"
                            listingImage={listingImage1}
                            listingName="1 Bedroom Apartment in Foggy Bottom"
                        />
                    </div>
                </Carousel>
            </div>
            <div>
            <h5 className="apartment-type mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                2-Bedroom Apartments
                </h5>
                <Carousel responsive={responsive} infinite={true}>
                    <div>
                        <ListingCard
                            listingPrice="4000"
                            listingImage={listingImage2}
                            listingName="2 Bedroom Apartment in Foggy Bottom"
                        />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                    <div>
                        <ListingCard
                        listingPrice="5500"
                        listingImage={listingImage4}
                        listingName="2 Bedroom + Den Apartment near GWU"
                    />
                    </div>
                </Carousel>;
            </div>
        </div>
    );
}




// https://www.npmjs.com/package/react-multi-carousel