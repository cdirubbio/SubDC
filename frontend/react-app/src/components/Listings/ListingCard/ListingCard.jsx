import React from "react"
import "./ListingCard.css"

export default function ListingCard(props) {
    return (
        <div className="ListingCard ">
            <img src={props.listingImage} alt="Listing" className="listing-image" />
            <h3>{props.listingName}</h3>
            <p><strong>${props.listingPrice}</strong>/month</p>
            <button className="view-details-button">View Details</button>
        </div>
    );
}