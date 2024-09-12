import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListingPage.css';


export default function ListingPage() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the listing data from the backend API
        fetch(`${window.BACKEND_URL}/api/listing/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setListing(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    function apartmentTypeConverter(apt_type) {
        if (apt_type == "studio") {
            return "Studio";
        }
        else if (apt_type == "1br") {
            return "1-Bedroom Apartment"
        }
        else if (apt_type == "2br") {
            return "2-Bedroom Apartment"
        }
    }


    return (
        <div className="listing-container">
             <h1 className="listing-title">{listing.title}</h1>
             <h6 className="listing-id">#{listing.listing_id}</h6>
            <div className="listing-details">
                <p><strong>Description:</strong> {listing.description}</p>
                <p><strong>Type:</strong> {apartmentTypeConverter(listing.apt_type)}</p>
                <p><strong>Price:</strong> ${listing.price}</p>
                <p><strong>Available from:</strong> {listing.availability_start}</p>
                <p><strong>Available until:</strong> {listing.availability_end}</p>
                <p><strong>Location:</strong> {listing.location}</p>
            </div>
        </div>
    );
}