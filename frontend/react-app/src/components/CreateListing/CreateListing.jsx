import React, { useState } from 'react';
import "./CreateListing.css"

export default function CreateListing() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a form data object to handle images
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('location', location);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);

    // TODO: Add your API call here to submit the form data
    console.log('Form submitted:', {
      title,
      price,
      location,
      image1,
      image2,
    });

    // Clear the form after submission
    setTitle('');
    setPrice('');
    setLocation('');
    setImage1(null);
    setImage2(null);
  };

  return (
    <div className="create-listing">
      <h2 className="font-extrabold" id="create-listing">Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title of the Listing:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Monthly Price of the Listing:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location of the Listing:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image1">Image 1 of the Listing:</label>
          <input
            type="file"
            id="image1"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image2">Image 2 of the Listing:</label>
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

