import React, { useState } from 'react';
import "./CreateListing.css"

export default function CreateListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [listingType, setListingType] = useState(null);
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a form data object to handle images
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('listingType', listingType);
    formData.append('price', price);
    formData.append('address', address);
    formData.append('zipCode', zipCode);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);

    // TODO: Add your API call here to submit the form data
    console.log('Form submitted:', {
      title,
      description,
      price,
      address,
      zipCode,
      image1,
      image2,
    });

    // Clear the form after submission
    setTitle('');
    setDescription('')
    setPrice('');
    setAddress('');
    setZipCode('');
    setImage1('');
    setImage2('');
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
          <label htmlFor="listingType">Apartment Type</label>
          <select name="cars" id="cars" 
          onChange={(e) => setListingType(e.target.value)} required>
            <option value="studio">Studio Apartment</option>
            <option value="1BR">1-Bedroom Apartment</option>
            <option value="2BR">2-Bedroom Apartment</option>        
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
          <label htmlFor="image1">Main Image of Listing</label>
          <input
            type="file"
            id="image1"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
            required
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

