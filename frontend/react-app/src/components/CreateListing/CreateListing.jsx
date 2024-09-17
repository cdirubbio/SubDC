import React, { useState, useEffect } from 'react';
import "./CreateListing.css"

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


  const [loading, setLoading] = useState(true);
  const JSONWebToken = localStorage.getItem('jsonwebtoken');

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
      const response = await fetch(`${window.BACKEND_URL}/api/createListing`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        console.log("Response not OK, please fix:", response.status, response.statusText);
        alert('Error submitting Listing. Please try again');
      } else {
        console.log('Listing submitted successfully.');
        alert('Listing submitted successfully.');
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
      }
    } catch (error) {
      console.error("Error submitting form, something went wrong:", error);
      alert('Error submitting Listing. Please try again');
    }
  
    console.log('Form data:', {
      user_id,
      title,
      description,
      apt_type,
      price,
      address,
      zipCode,
      availability_start,
      availability_end,
    });
  };
  

  useEffect(() => {
    checkAuthentication(JSONWebToken);
  }, [JSONWebToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user_id) {
    return <div>Please log in</div>;
  }

  return (
    <div className="create-listing">
      <h2 className="font-extrabold" id="create-listing">Create a New Listing</h2>
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
        </div>
        <div className="form-group">
          <label htmlFor="apt_type">Apartment Type</label>
          <select defaultValue="studio" name="apt_type" id="apt_type"
            onChange={(e) => setApt_type(e.target.value)} required>
            <option value="studio">Studio Apartment</option>\
            <option value="1br">1-Bedroom Apartment</option>
            <option value="2br">2-Bedroom Apartment</option>
          </select>
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
        </div>
        <div className="form-group">
          <label htmlFor="image1">Main Image of Listing</label>
          <input
            type="file"
            id="image1"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image2">Secondary Image of Listing</label>
          <input
            type="file"
            id="image2"
            accept="image/*"
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Submit Listing</button>
      </form>
    </div>
  );
};

