import React from "react"
import "./ListingCard.css"
import { useNavigate } from "react-router-dom";
import "./../../../images/listing.jpg"

export default function ListingCard(props) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate("/Listing", { state: { listing_id: props.listing_id } });
    };
    return (
        <div className="ListingCard ">
            <img src={props.listingImage} alt="Listing" className="listing-image" />
            <h3>{props.listingName}</h3>
            <p><strong>${props.listingPrice}</strong>/month</p>
            <button className="view-details-button" onClick={handleViewDetails}>
                View Details
            </button>
        </div>
    );
}