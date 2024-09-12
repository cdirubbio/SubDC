import React, { useState } from 'react';
import "./CreateListing.css"

export default function CreateListing() {
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

  const user_id = 1;
  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const listingData = {
      user_id: user_id, 
      title: title,
      description: description,
      apt_type: apt_type,
      price: price,
      address: address,
      zip_code: toString(zipCode),
      availability_start: availability_start,
      availability_end: availability_end
    };

    try {
      const response = await fetch(`${window.BACKEND_URL}/api/createListing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
  
      if (!response.ok) {
        console.log("Response not OK plz fix:", response.status, response.statusText);
      } else {
        console.log('Form submitted successfully. Well done');
        setTitle('');
        setDescription('');
        setApt_type('studio')
        setPrice('');
        setAddress('');
        setZipCode('');
        setAvailability_start('');
        setAvailability_end('');
      }
    } catch (error) {
      console.error("Error submitting form, u fuked up:", error);
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
      image1,
      image2,
    });
  };

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
          <label  htmlFor="address">Address of the Listing</label>
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
        {/* <div className="form-group">
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
        </div> */}
        <button type="submit" className="submit-button">Submit Listing</button>
      </form>
    </div>
  );
};

