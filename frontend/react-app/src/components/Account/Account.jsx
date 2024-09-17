import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserListings, getUserFavorites } from './Account';
import { checkAuthentication } from '../Authentication/Authentication';
import ListingCard from './../Listings/ListingCard/ListingCard';
import "./Account.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function Account() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: ''
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
    navigate('/Authentication');
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
      getUserFavorites(token, setUserFavorites)
    }
  }, [authenticated, userInfo.user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      <div className="user-info-section">
        <h2>Your Profile</h2>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Name:</strong> {userInfo.first_name} {userInfo.last_name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone_number}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="user-listings-section">
        <h2>Your Listings</h2>
        {userListings.length > 0 ? (
          <Carousel responsive={responsive} infinite={true}>
            {userListings.map(listing => (
              <div key={listing.listing_id}>
                <ListingCard
                  listing_id={listing.listing_id}
                  listingName={listing.title}
                  listingPrice={listing.price}
                  listingImage={listing.image1}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>You have no listings.</p>
        )}
      </div>
      <div className="user-favorites-section">
        <h2>Your Favorite Listings</h2>
        {userFavorites.length > 0 ? (
          <Carousel responsive={responsive} infinite={true}>
            {userFavorites.map(favorite => (
              <div key={favorite.listing_id}>
                <ListingCard
                  listing_id={favorite.listing_id}
                  listingName={favorite.title}
                  listingPrice={favorite.price}
                  listingImage={favorite.image1}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>You have no favorite listings.</p>
        )}
      </div>
    </div>
  );
}
