import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleUserFavorite, fetchListingDetails, apartmentTypeConverter, updateListingInformation, formatDateToReadable, deleteListing } from './ListingPage';
import './ListingPage.css';

export default function ListingPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jsonwebtoken');
    const { id: listing_id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [user_id, setUser_id] = useState('');
    const [listing, setListing] = useState(null);
    const [listing_user_id, setListing_user_id] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedListing, setUpdatedListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleModalOpen = () => {
        setUpdatedListing(listing);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        let token = localStorage.getItem('jsonwebtoken');
        setListing(updatedListing);
        updateListingInformation(token, listing_id, updatedListing);
        handleModalClose();
    };

    const handleListingDelete = () => {
        let token = localStorage.getItem('jsonwebtoken');
        deleteListing(token, listing_id);

        navigate('/listings');
    }

    useEffect(() => {
        fetchListingDetails(token, listing_id, setListing, setIsFavorite, setLoading, setError, setUser_id, setListing_user_id);
    }, [listing_id, token]);

    if (loading) {
        return (
          <div className="spinner-container">
            <div className="spinner"></div> {/* Spinner */}
          </div>
        ); // show spinner
      }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="listingPage-container">
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Listing Information</h3>
                        <label>
                            Title:
                            <input
                                name="title"
                                value={updatedListing.title}
                                onChange={(e) => setUpdatedListing({ ...updatedListing, [e.target.name]: e.target.value })}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={updatedListing.description}
                                onChange={(e) => setUpdatedListing({ ...updatedListing, [e.target.name]: e.target.value })}
                                className="description-textarea "
                            />
                        </label>
                        <label htmlFor="apt_type">Listing Type: </label>
                        <select className="modal_input"
                            name="apt_type"
                            id="apt_type"
                            value={updatedListing.apt_type}
                            onChange={(e) => setUpdatedListing({ ...updatedListing, apt_type: e.target.value })}
                            required
                        >
                            <option value="studio">Studio Apartment</option>
                            <option value="1br">1-Bedroom Apartment</option>
                            <option value="2br">2-Bedroom Apartment</option>
                        </select>
                        <label>
                            Price:
                            <input
                                name="price"
                                value={updatedListing.price}
                                onChange={(e) => setUpdatedListing({ ...updatedListing, [e.target.name]: e.target.value })}
                            />
                        </label>
                        <label>
                            Availability from:
                            <input
                                type="date"
                                name="availability_start"
                                value={updatedListing.availability_start.split("T")[0]}
                                onChange={(e) => setUpdatedListing({ ...updatedListing, [e.target.name]: e.target.value })}
                            />
                        </label>
                        <label>
                            Availability until:
                            <input
                                type="date"
                                name="availability_end"
                                value={updatedListing.availability_end.split("T")[0]}
                                onChange={(e) => setUpdatedListing({ ...updatedListing, [e.target.name]: e.target.value })}
                            />
                        </label>
                        <div className='modal-footer'>
                            <button className="save-edits-button" onClick={handleSave}>Save</button>
                            <button className="cancel-edits-button" onClick={handleModalClose}>Cancel</button>
                            <button className="delete-edits-button" onClick={handleListingDelete}>Delete</button>
                        </div>

                    </div>
                </div>
            )}

            <div className="listing-container">
                <div className="listing-header">
                    <h1 className="listing-title">{listing.title}</h1>
                    {user_id === listing_user_id && (
                        <button className="editor" onClick={handleModalOpen}>
                            EDIT
                        </button>
                    )}
                </div>
                <h6 className="listing-id">#{listing_id}</h6>
                <div className="listing-details">
                    <p><strong>Description:</strong> {listing.description}</p>
                    <p><strong>Type:</strong> {apartmentTypeConverter(listing.apt_type)}</p>
                    <p><strong>Price:</strong> ${listing.price}</p>
                    <p><strong>Available from:</strong> {formatDateToReadable(listing.availability_start)}</p>
                    <p><strong>Available until:</strong> {formatDateToReadable(listing.availability_end)}</p>
                    <p><strong>Location:</strong> {listing.location}</p>
                </div>
                {user_id && user_id !== listing_user_id && (
                    <div
                        className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
                        onClick={() => toggleUserFavorite(token, listing_id, setIsFavorite)}
                    >
                        <i className={`fas fa-heart ${isFavorite ? 'favorited' : ''}`}></i>
                    </div>
                )}
            </div>

            <div className="listing-image-container">
                <img src={listing.image1} alt="Image1" className="listing-image" />
                <img src={listing.image2} alt="Image2" className="listing-image" />
            </div>
        </div>
    );
}
