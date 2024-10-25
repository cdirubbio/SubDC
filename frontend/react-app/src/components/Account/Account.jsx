import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getUserInfo, getUserListings, getUserFavorites, updateUserInfo, getUserNotifications } from './Account';
import { checkAuthentication } from '../Authentication/Authentication';
import ListingCard from './../Listings/ListingCard/ListingCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Account.css";

export default function Account() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    username: userInfo.username,
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    email: userInfo.email,
    phone_number: userInfo.phone_number,
  });

  const resetUserInfo = () => {
    setUserInfo({
      user_id: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      phone_number: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    setAuthenticated(false);
    resetUserInfo();
    setUserListings([]);
    setUserFavorites([]);
    setUserNotifications([]);
    navigate('/Authentication');
  };

  const handleModalOpen = () => {
    setUpdatedInfo(userInfo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    let token = localStorage.getItem('jsonwebtoken');
    updateUserInfo(token, updatedInfo);
    setUserInfo(updatedInfo);
    handleModalClose();
    alert("Please log back in to see the changes made to your Account");
    handleLogout();
  };

  const handleRemoveNotification = async (notificationId) => {
    let token = localStorage.getItem('jsonwebtoken');
    try {
      const response = await fetch(`${window.BACKEND_URL}/api/user/notifications/remove`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ notification_id: notificationId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.status == "200") {
        setUserNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.notification_id !== notificationId)
        );
      }
    } catch (error) {
      console.error("Error Toggling Favorite: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    checkAuthentication(token, setLoading, setAuthenticated, setUserInfo);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    if (authenticated && token) {
      getUserInfo(token, setUserInfo);
      getUserListings(token, setUserListings);
      getUserFavorites(token, setUserFavorites);
      getUserNotifications(token, setUserNotifications);
    }
  }, [authenticated, userInfo.user_id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div> 
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="sections-div">
        <div className="user-info-section">
          <h2 className='account-page-title'>PROFILE</h2>
          <button className="editor" onClick={handleModalOpen}>EDIT</button>

          <table className="user-info-table">
            <tbody>
              <tr>
                <th>Username:</th>
                <td>{userInfo.username}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>{userInfo.first_name} {userInfo.last_name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{userInfo.phone_number}</td>
              </tr>
            </tbody>
          </table>

          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <div className="user-notifications-section user-info-section">
          <h2 className="h2-titles account-page-title">NOTIFICATIONS</h2>

          <table className="user-notification-table">
            <tbody>
              {userNotifications.length > 0 ? (
                [...userNotifications].reverse().map((notification) => (
                  <tr key={notification.notification_id}>
                    <td className="notification-text">
                      <NavLink to={`/listing/${notification.listing_id}`}><strong>{`${notification.username} ${notification.listing_action}d`} {`${notification.title}`}</strong></NavLink>
                    </td>
                    <td className="notification-remove">
                      <button
                        className="remove-notif"
                        onClick={() => handleRemoveNotification(notification.notification_id)}
                      >
                        <strong>X</strong>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="no-notifications">No notifications available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Your Info</h3>
            <label>Username: <input name="username" value={updatedInfo.username} onChange={(e) => setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })} /></label>
            <label>First Name: <input name="first_name" value={updatedInfo.first_name} onChange={(e) => setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })} /></label>
            <label>Last Name: <input name="last_name" value={updatedInfo.last_name} onChange={(e) => setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })} /></label>
            <label>Phone Number: <input name="phone_number" value={updatedInfo.phone_number} onChange={(e) => setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })} /></label>
            <button className="save-edits-button" onClick={handleSave}>Save</button>
            <button className="cancel-edits-button" onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}

      <div className="user-listings-section">
        <h2 className="h2-titles account-page-title">YOUR LISTINGS</h2>
        {userListings.length > 0 ? (
          <div className="grid-container">
            {userListings.map(listing => (
              <ListingCard
                key={listing.listing_id}
                listing_id={listing.listing_id}
                listingName={listing.title}
                listingLocation={listing.location}
                listingPrice={listing.price}
                listingImage={listing.image1}
              />
            ))}
          </div>
        ) : (
          <p>You have no listings.</p>
        )}
      </div>

      <div className="user-favorites-section">
        <h2 className="h2-titles account-page-title">YOUR FAVORITES</h2>
        {userFavorites.length > 0 ? (
          <div className="grid-container">
            {userFavorites.map(favorite => (
              <ListingCard
                key={favorite.listing_id}
                listing_id={favorite.listing_id}
                listingName={favorite.title}
                listingLocation={favorite.location}
                listingPrice={favorite.price}
                listingImage={favorite.image1}
              />
            ))}
          </div>
        ) : (
          <p>You have no favorite listings.</p>
        )}
      </div>
    </div>
  );
}
