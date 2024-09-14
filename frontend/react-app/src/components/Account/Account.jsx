import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useNavigate } from "react-router-dom";
import ListingCard from './../Listings/ListingCard/ListingCard';


const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function Account(user_id) {
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: ''
  });
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    setAuthenticated(false);
    setUserInfo(null);
    navigate("/Authentication");
  };
  const getUserInfo = (id) => {
    fetch(`${window.BACKEND_URL}/api/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: id })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update userInfo state with correct data
      setUserInfo({
        first_name: data.user.first_name || '', // Ensure there's a fallback in case data is missing
        last_name: data.user.last_name || '',   // Same here
        username: data.user.username || '',     // Corrected from first_name to username
        email: data.user.email || '',
        phone_number: data.user.phone_number || ''
      });
    })
    .catch(error => {
      console.error("There was a problem fetching the user's information:", error);
    });
  };  
  getUserInfo(1);


  useEffect(() => {
    if (userInfo?.user_id) {
      getUserListings(userInfo.user_id);
    }

  }, [userInfo, authenticated]);

  const getUserListings = (id) => {
    fetch(`${window.BACKEND_URL}/user/${id}/listings`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserListings(data);
      })
      .catch(error => {
        console.error("There was a problem fetching the user's listings:", error);
      });
  };

  return (
    <div className="account-page">
      <div className="user-info-section">
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {userInfo.first_name} {userInfo.last_name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone_number}</p>
        <button onClick={handleLogout}>Logout</button>
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
