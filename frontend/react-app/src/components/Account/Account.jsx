import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserListings } from './Account';
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
  const [user_id, setUser_Id] = useState(localStorage.getItem('user_id'));
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: ''
  });

  const resetUserInfo = () => {
    setUserInfo({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      phone_number: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    localStorage.removeItem('user_id');
    setAuthenticated(false);
    resetUserInfo();
    setUser_Id('');
    setUserListings([]);
    navigate('/Authentication');
  };

  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    checkAuthentication(token, setLoading, setAuthenticated);
  }, []);

  useEffect(() => {
    if (authenticated && user_id) {
      getUserInfo(user_id, setUserInfo);
      getUserListings(user_id, setUserListings);
    }
  }, [authenticated, user_id]);

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
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>You have no listings.</p>
        )}
      </div>
    </div>
  );
}
