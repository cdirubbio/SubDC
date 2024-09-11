import React from "react"
import "./ListingCard.css"
import { Link } from "react-router-dom";
import "./../../../images/listing.jpg"

export default function ListingCard(props) {
    const link = "/listing/" + props.listing_id;
    return (
        <div className="ListingCard ">
            <img src="./../../images/listing.jpg" alt="Listing" className="listing-image" />
            {/* <img src={props.listingImage} alt="Listing" className="listing-image" /> */}
            <h3>{props.listingName}</h3>
            <p><strong>${props.listingPrice}</strong>/month</p>
            <Link to={link}><button className="view-details-button">View Details</button></Link>
        </div>
    );
}