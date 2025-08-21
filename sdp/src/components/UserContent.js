import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './UserContent.css';
import logo from './logo.png';

const Popup = ({ item, onClose }) => (
  <div className="popup">
    <div className="popup-overlay"></div>
    <div className="popup-content">
      <span className="close-btn" onClick={onClose} style={{ cursor: "pointer" }}>
        X
      </span>
      <h2>{item.title}</h2>
      <img
        src={`http://localhost:3001/${item.imagePath}`}
        alt="Item"
        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
      />
      <p>{item.content}</p>
      <p>Company: {item.companyName}</p>
      <p>
        Website Link:{" "}
        {item.websiteLink ? (
          <a href={item.websiteLink} target="_blank" rel="noopener noreferrer">
            {item.websiteLink}
          </a>
        ) : (
          "No website link available"
        )}
      </p>
    </div>
  </div>
);

const DataDisplay = () => {
  const [users, setUsers] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for descending, 'asc' for ascending

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleCardClick = async (item) => {
    try {
      await axios.put(`http://localhost:3001/increaseView/${item._id}`);
      const updatedUsers = await axios.get('http://localhost:3001/getUsers');
      setUsers(updatedUsers.data);
      setSelectedCard(item._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const filteredUsers = users.filter((user) => {
    return selectedCategories.length === 0 || selectedCategories.includes(user.category);
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const orderMultiplier = sortOrder === 'desc' ? -1 : 1;
    return orderMultiplier * (a.views - b.views);
  });

  return (
    <div className={`app-container ${showSettings ? 'settings-open' : ''}`}>
      <div className="top-container">
        <div className="nav-logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="logo-title">AdZen</h1>
        </div>
        <div className="settings" onClick={toggleSettings}>
          <div className="icon">
            <FontAwesomeIcon icon={faCog} />
          </div>
          {showSettings && (
            <div className="dropdown">
              <button>
                <Link to="/account" className="logout-link">
                  Account Info
                </Link>
              </button>
              <button>
                <Link to="/signin" className="logout-link">
                  Logout
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="filter-container">
        <h3>Filter by Category</h3>
        <ul>
          {Array.from(new Set(users.map((user) => user.category))).map((category) => (
            <li key={category}>
              <label className="filter-label">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="scrollable-container">
        <div className="sort-controls">
          <label>
            Sort Order:{' '}
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="desc">Top Viewed</option>
              <option value="asc">Least Viewed</option>
            </select>
          </label>
        </div>
        <div className="cards-container">
          {sortedUsers.map((item) => (
            <div
              key={item._id}
              className={`card ${selectedCard === item._id ? 'selected' : ''}`}
            >
              <div className="card-content">
                <h2>{item.title}</h2>
                <p>{item.preview}</p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <div
                  className="see-more-link"
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  See More
                </div>
                <div className="view-count">
                  <VisibilityIcon fontSize="small" />
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedCard && (
          <Popup item={filteredUsers.find((user) => user._id === selectedCard)} onClose={handleClosePopup} />
        )}
      </div>
    </div>
  );
};

export default DataDisplay;
