// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/fetchAPI';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Container style for centering and background
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  };

  // Form style for the login card
  const formStyle = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    textAlign: 'center',
    width: '320px'
  };

  // Title and subtitle styles
  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
    color: '#555'
  };

  // Input field style
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  };

  // Button style with hover effect using inline pseudo-styles via transition
  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#6c63ff',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(name, email);
      navigate('/search'); // Navigating to search page upon successful login
    } catch (error) {
      alert('Failed to log in: ' + error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={titleStyle}>Dog Finder</div>
        <div style={subtitleStyle}>Find your new best friend!</div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
}

export default Login;
