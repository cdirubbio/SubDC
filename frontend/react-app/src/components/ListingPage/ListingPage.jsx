import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleUserFavorite, fetchListingDetails, apartmentTypeConverter, updateListingInformation, formatDateToReadable, deleteListing, reserveListing } from './ListingPage';
import './ListingPage.css';


export default function ListingPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jsonwebtoken');
    const { id: listing_id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isReserved, setIsReserved] = useState(false);
    const [permissions, setPermissions] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
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

        navigate('/Explore');
    }

    const handleReservation = () => {
        let token = localStorage.getItem('jsonwebtoken');
        reserveListing(token, listing_id, setIsReserved);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchListingDetails(token, listing_id, setListing, setIsFavorite, setLoading, setError, setUser_id, setListing_user_id, setIsReserved, setPermissions, setShowAddress);
    }, [listing_id, token]);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div> {/* Spinner */}
            </div>
        ); // show spinner
    }

    if (!permissions) {
        return (
            <div className="no-access-container">
                <div className="no-access-message">
                    <h2>Access Denied</h2>
                    <p>Sorry, you do not have permission to view this listing. Please contact the listing owner or log in with the appropriate account.</p>
                </div>
            </div>
        );
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
                        <button className="edit-button" onClick={handleModalOpen}>
                            <i className="fas fa-edit"></i> EDIT
                        </button>
                    )}
                </div>

                <div className="listing-meta">

                    {user_id && user_id !== listing_user_id && (
                        <div
                            className={`reserve-button ${isReserved ? 'reserved' : ''}`}
                            onClick={handleReservation}
                        >
                            {isReserved ? 'Reserved' : 'Reserve'}
                            <i className={`fas fa-star ${isReserved ? 'reserved' : ''}`}></i>
                        </div>
                    )}
                    {user_id && user_id !== listing_user_id && (
                        <div
                            className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
                            onClick={() => toggleUserFavorite(token, listing_id, setIsFavorite)}
                        >
                            {isFavorite ? 'Favorited' : 'Favorite'}
                            <i className={`fas fa-heart ${isFavorite ? 'favorited' : ''}`}></i>
                        </div>

                    )}
                </div>

                <div className="listing-content">
                    <div className="listing-details">
                        <div className="detail-row">
                            <span className="description">{listing.description}</span>
                        </div>
                        <div className="detail-row">
                            <i className="fas fa-building"></i>
                            <span><strong>Type:</strong> {apartmentTypeConverter(listing.apt_type)}</span>
                        </div>
                        <div className="detail-row">
                            <i className="fas fa-dollar-sign"></i>
                            <span><strong>Price:</strong> ${listing.price}</span>
                        </div>
                        <div className="detail-row">
                            <i className="fas fa-calendar-alt"></i>
                            <span><strong>Available from:</strong> {formatDateToReadable(listing.availability_start)}</span>
                        </div>
                        <div className="detail-row">
                            <i className="fas fa-calendar-check"></i>
                            <span><strong>Available until:</strong> {formatDateToReadable(listing.availability_end)}</span>
                        </div>
                        {!showAddress && (
                            <div className="detail-row">
                                <i className="fas fa-map-marker-alt"></i>
                                <span><strong>Location:</strong> {listing.location}</span>
                            </div>
                        )}
                        {user_id && showAddress && (
                            <div className="detail-row">
                                <i className="fas fa-map-marker-alt"></i>
                                <span><strong>Address:</strong> {listing.address}, {listing.zip_code}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="listing-image-container">
                <img src={listing.image1} alt="Image1" className="listing-page-image" />
                <img src={listing.image2} alt="Image2" className="listing-page-image" />
            </div>
        </div>
    );
}
