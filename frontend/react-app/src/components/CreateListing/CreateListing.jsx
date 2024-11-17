import React, { useState, useEffect } from 'react';
import "./CreateListing.css"
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [user_id, setUser_id] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apt_type, setApt_type] = useState('studio');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [availability_start, setAvailability_start] = useState('');
  const [availability_end, setAvailability_end] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const JSONWebToken = localStorage.getItem('jsonwebtoken');

  const validateInput = () => {
    const newErrors = {};
    
    if (title.length < 5 || title.length > 100) {
      newErrors.title = "Title must be between 5 and 100 characters.";
    }
    if (description.length < 10 || description.length > 1000) {
      newErrors.description = "Description must be between 10 and 1000 characters.";
    }
    if (price <= 0 || price > 10000) {
      newErrors.price = "Price must be between $1 and $10,000.";
    }
    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
      newErrors.zipCode = "Zip Code must be a valid US zip code.";
    }
    if (address.length < 10 || address.length > 200) {
      newErrors.address = "Address must be between 10 and 200 characters.";
    }
    if (availability_start && availability_end && new Date(availability_start) > new Date(availability_end)) {
      newErrors.availability = "Start date cannot be after the end date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkAuthentication = async (token) => {
    if (!token) {
      console.warn('No JSONWebToken found in localStorage');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${window.BACKEND_URL}/api/jwt/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        console.error("checkAuth not OK:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setUser_id(data.user_id);

    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('apt_type', apt_type);
    formData.append('price', price);
    formData.append('address', address);
    formData.append('zip_code', zipCode);
    formData.append('availability_start', availability_start);
    formData.append('availability_end', availability_end);
    formData.append('image1', image1);
    formData.append('image2', image2);

    try {
      const response = await fetch(`${window.BACKEND_URL}/api/listing/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSONWebToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.log("Response not OK, please fix:", response.status, response.statusText);
        alert('Error submitting Listing. Please try again');
      } else {
        console.log('Listing submitted successfully.');
        alert('Listing submitted successfully.');
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form, something went wrong:", error);
      alert('Error submitting Listing. Please try again');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setApt_type('studio');
    setPrice('');
    setAddress('');
    setZipCode('');
    setAvailability_start('');
    setAvailability_end('');
    setImage1(null);
    setImage2(null);
    setErrors({});
  };

  useEffect(() => {
    checkAuthentication(JSONWebToken);
  }, [JSONWebToken]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div> {/* Spinner */}
      </div>
    );
  }

  if (!user_id) {
    return (
      <div className="container">
        <div className="login-message">
          <p>Please log in to continue</p>
          <button onClick={() => navigate('/authentication')} className="login-button">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-listing">
      <h2 className="font-extrabold" id="create-listing">CREATE NEW LISTING</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title of the Listing</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description of the Listing</label>
          <textarea
            rows="4" cols="50"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Monthly Price of the Listing</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address of the Listing</label>
          <input
            autoComplete="street-address"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <p className="error-text">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code of the Listing</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
          {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}
        </div>
        <div className="form-group">
          <div className="availabilities">
            <label htmlFor="availability_start">Availability Start</label>
            <input
              type="date"
              id="availability_start"
              className="calendar"
              value={availability_start}
              onChange={(e) => setAvailability_start(e.target.value)}
              min="2024-09-01"
              max="2099-12-31"
              required
            />
            <label htmlFor="availability_end">Availability End</label>
            <input
              type="date"
              className="calendar"
              id="availability_end"
              value={availability_end}
              onChange={(e) => setAvailability_end(e.target.value)}
              min={availability_start}
              max="2099-12-31"
              required
            />
          </div>
          {errors.availability && <p className="error-text">{errors.availability}</p>}
        </div>
        <button type="submit" className="submit-button">Submit Listing</button>
      </form>
    </div>
  );
};
