// AccountInfo.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountInfo.css';

import PersonalDetails from './AccountComp/PersonalDetails';
import ChangePassword from './AccountComp/ChangePassword';
import BillingInformation from './AccountComp/BillingInformation';
import Analytics from './AccountComp/Analytics';
import PostAds from './AccountComp/PostAds';
import Settings from './AccountComp/Settings';

const AccountInfo = () => {
  const [selectedPage, setSelectedPage] = useState('post-ads');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear user session, reset state, etc.
    // Then navigate to the signin page
    navigate('/signin');
  };

  const handleGoBack = () => {
    // Add logic to navigate to the desired page
    navigate('/'); // Redirect to the home page in this example
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'change-password':
        return <ChangePassword />;
      case 'billing-information':
        return <BillingInformation />;
      case 'settings':
        return <Settings />;
      case 'personal-details':
        return <PersonalDetails />;
      case 'analytics':
        return <Analytics />;
      default:
        return <PostAds />;
       
    }
  };

  return (
    <div className="account-info-container">
      <div className="sidebar">
        
        <Link to="/account/post-ads" className="sidebar-item" onClick={() => setSelectedPage('post-ads')}>
          Post Ads
        </Link>
        <Link to="/account/personal-details" className="sidebar-item" onClick={() => setSelectedPage('personal-details')}>
          Personal Details
        </Link>
        <Link to="/account/analytics" className="sidebar-item" onClick={() => setSelectedPage('analytics')}>
          Analytics
        </Link>
        <Link to="/account/billing-information" className="sidebar-item" onClick={() => setSelectedPage('billing-information')}>
          Billing Information
        </Link>
        <Link to="/account/change-password" className="sidebar-item" onClick={() => setSelectedPage('change-password')}>
          Change Password
        </Link>
        <Link to="/signin" className="sidebar-item" onClick={handleLogout}>
          Logout
        </Link>
        {/* Back button styled as a link */}
        <Link to="/user-content" className="sidebar-item back-button" onClick={handleGoBack}>
          Back
        </Link>
      </div>
      <div className="content-container">
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
