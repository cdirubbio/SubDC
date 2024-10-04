import React from "react"
import "./ListingCard.css"
import { useNavigate } from "react-router-dom";
import "./../../../images/listing.jpg"

export default function ListingCard(props) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        const link = `/listing/${props.listing_id}`
        navigate(link);
    };
    return (
        <div className="ListingCard ">
            <img src={props.listingImage} alt="Listing" className="listing-image" />
            <h3><strong>{props.listingName}</strong></h3>
            <p><strong>${props.listingPrice}</strong>/month</p>
            <button className="view-details-button" onClick={handleViewDetails}>
                View Details
            </button>
        </div>
    );
}