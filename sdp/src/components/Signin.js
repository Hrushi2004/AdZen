import React, { useState } from 'react';
import img from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css'
const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
 navigate('/user-content');
    try {
      const result = await fetch(
        'http://localhost:5000/login', {
        method: "POST",
        body: JSON.stringify({
          email, password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      if (result.ok) {
        navigate('/user-content');
      } else if (result.status === 400) {
        // User already exists, show an alert
        //alert('Incorrect Credentials');
      } else if (result.status === 401) {
        //alert('Invalid email, please register !!');
      } else {
        //alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
    setEmail("");
    setPassword("");
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="class">
     
     <div className="logo-container">
    <img src={img} alt="Logo" />
  </div>
        <div className='signin'>
          <form onSubmit={handleSubmit}>
            <br />
            <label>
              Email:
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email} // Use value instead of onChange
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </label>
            <label>
              <span>Password:</span>
              <br />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                required
                value={password} // Use value instead of onChange
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <span
                style={{ cursor: 'pointer', marginLeft: '-15%' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🔓' : '🔒'}
              </span>
            </label>
            <Link to="/forgotpassword">Forgot Password?</Link> {/* Use Link for navigation */}
            <br />
            <button type="submit" className="register-button">
              Login
            </button>
          </form>
          <br />
          <p>
            <div className='rg'>
            New here? <Link to="/signup">Register now</Link> {/* Use Link for navigation */}
            </div>
          </p>
        </div>
      </div>
   
  );
};

export default Home;