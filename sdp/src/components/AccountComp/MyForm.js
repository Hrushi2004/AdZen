import React, { useState, useRef } from 'react';
import './MyForm.css';

const MyForm = () => {
  const initialState = {
    title: '',
    preview: '',
    content: '',
    websiteLink: '',
    companyName: '',
    category: '',
  };

  const adCategories = [
    'Electronics',
    'Fashion',
    'Automobile',
    'Home and Garden',
    'Sports',
    'Technology',
    'Business',
    'Education',
    'Fast Food',
    'Electronics',
    'Fashon',
    'Travel',
    'Tech'
    // Add more categories as needed
  ];

  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every((field) => field.trim() !== '');

    if (!isFormValid || !file) {
      alert('Please fill in all the required fields and select an image.');
      return;
    }

    try {
      const formDataWithImage = new FormData();

      // Append all fields except the category
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'category') {
          formDataWithImage.append(key, value);
        }
      });

      // Append the category separately
      formDataWithImage.append('category', formData.category);

      formDataWithImage.append('image', file);

      const response = await fetch('http://localhost:3001/api/saveData', {
        method: 'POST',
        body: formDataWithImage,
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setFormData(initialState);
        fileInputRef.current.value = '';

        // ... (rest of your code remains the same)
      } else {
        console.error('Failed to save data to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div>
      {showSuccessPopup && (
        <div className="popup-container">
          <div className="success-popup">
            <p>Ad successfully submitted!</p>
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([name, value]) => (
          <label key={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}:
            {name === 'category' ? (
              <select name={name} value={value} onChange={handleChange} required>
                <option value="" disabled>
                  Select Category
                </option>
                {adCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <input type="text" name={name} value={value} onChange={handleChange} required />
            )}
          </label>
        ))}
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
