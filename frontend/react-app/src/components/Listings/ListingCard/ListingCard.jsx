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
        <div className="ListingCard " onClick={handleViewDetails}>
            <img src={props.listingImage} alt="Listing" className="listing-image" />
            <h2><strong>{props.listingName}</strong></h2>
            <h3>{props.listingLocation}</h3>
            <p><strong>${props.listingPrice}</strong>/month</p>
        </div>
    );
}
