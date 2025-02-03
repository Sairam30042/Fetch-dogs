// Search.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchDogs, generateMatch, fetchDogsByIds, logout } from '../api/fetchAPI';
import axios from 'axios';

function Search() {
  const navigate = useNavigate();

  // Filter and pagination states
  const [breed, setBreed] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // "asc" or "desc"
  const [pageFrom, setPageFrom] = useState(0); // cursor/page offset
  const pageSize = 25;

  // Data and UI states
  const [dogDetails, setDogDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextQuery, setNextQuery] = useState(null);
  const [prevQuery, setPrevQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Favorites and match state
  const [favorites, setFavorites] = useState([]);
  const [matchResult, setMatchResult] = useState(null);
  const [matchedDog, setMatchedDog] = useState(null); // full details of matched dog

  // Inline styles for a colorful, interactive UI
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    color: '#333'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold'
  };

  const logoutButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const cardStyle = {
    background: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer'
  };

  const cardHoverStyle = {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
  };

  const cardImageStyle = {
    maxWidth: '100%',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const buttonStyle = {
    padding: '0.8rem 1.5rem',
    margin: '0.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#f76c6c',
    color: '#fff',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, transform 0.3s'
  };

  const buttonHoverStyle = {
    backgroundColor: '#e85a5a',
    transform: 'scale(1.05)'
  };

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Fetch available breeds on component mount
  useEffect(() => {
    axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds')
      .then(response => {
        setBreeds(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch breeds:', error);
        setError('Failed to fetch breeds. Please try again.');
      });
  }, []);

  // Fetch dogs whenever breed, pageFrom, or sortOrder changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    // Build filters: always include sort, size, and from.
    // If a breed is selected, include it; otherwise, fetch all dogs sorted.
    const filters = { 
      size: pageSize, 
      from: pageFrom, 
      sort: `breed:${sortOrder}` 
    };
    if (breed) {
      filters.breeds = [breed];
    }
    searchDogs(filters)
      .then(({ dogs, total, next, prev }) => {
        setDogDetails(dogs);
        setTotal(total);
        setNextQuery(next);
        setPrevQuery(prev);
        setLoading(false);
      })
      .catch(err => {
        console.error(`Failed to fetch dogs:`, err);
        setError(`Failed to fetch dogs. Please try again.`);
        setLoading(false);
      });
  }, [breed, pageFrom, sortOrder]);

  // Handle favorite toggling for a dog
  const toggleFavorite = (dogId) => {
    setFavorites(prev => 
      prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
    );
  };

  // Generate match based on favorited dog IDs
  const handleGenerateMatch = () => {
    if (favorites.length === 0) {
      alert('Please select at least one favorite dog.');
      return;
    }
    generateMatch(favorites)
      .then(data => {
        setMatchResult(data.match);
        // Now fetch full details for the matched dog
        return fetchDogsByIds([data.match]);
      })
      .then(matchedDogs => {
        if (matchedDogs && matchedDogs.length > 0) {
          setMatchedDog(matchedDogs[0]);
        }
      })
      .catch(err => {
        console.error('Failed to generate match or fetch matched dog details:', err);
        setError('Failed to generate match. Please try again.');
      });
  };

  // Logout handler
  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/'); // Redirect to login page
      })
      .catch(err => {
        console.error('Logout failed:', err);
        setError('Logout failed. Please try again.');
      });
  };

  // Pagination handlers
  const handleNextPage = () => {
    setPageFrom(pageFrom + pageSize);
  };

  const handlePrevPage = () => {
    setPageFrom(Math.max(0, pageFrom - pageSize));
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={titleStyle}>Dog Finder</div>
        <button 
          style={logoutButtonStyle} 
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <label>
          <strong>Select Breed: </strong>
          <select 
            value={breed} 
            onChange={e => { setBreed(e.target.value); setPageFrom(0); }}
            style={{ padding: '0.5rem', borderRadius: '4px', marginRight: '1rem' }}
          >
            <option value="">Select a breed</option>
            {breeds.map((b, index) => (
              <option key={index} value={b}>{b}</option>
            ))}
          </select>
        </label>
        <label>
          <strong>Sort by Breed: </strong>
          <select 
            value={sortOrder} 
            onChange={e => { setSortOrder(e.target.value); setPageFrom(0); }}
            style={{ padding: '0.5rem', borderRadius: '4px' }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      {(!loading && dogDetails.length > 0) && (
        <>
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Total Results: {total}</p>
          <div style={cardsContainerStyle}>
            {dogDetails.map((dog) => (
              <div 
                key={dog.id} 
                style={{
                  ...cardStyle,
                  ...(hoveredCard === dog.id ? cardHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredCard(dog.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {dog.img && <img src={dog.img} alt={dog.name} style={cardImageStyle} />}
                <p><strong>Name:</strong> {dog.name}</p>
                <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>Age:</strong> {dog.age}</p>
                <p><strong>ZIP Code:</strong> {dog.zip_code}</p>
                <label style={{ marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={favorites.includes(dog.id)}
                    onChange={() => toggleFavorite(dog.id)}
                  />{' '}
                  Favorite
                </label>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', margin: '1rem' }}>
            <button
              style={{
                ...buttonStyle,
                ...(hoveredButton === 'prev' ? buttonHoverStyle : {})
              }}
              onMouseEnter={() => setHoveredButton('prev')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={handlePrevPage}
              disabled={pageFrom === 0}
            >
              Previous
            </button>
            <button
              style={{
                ...buttonStyle,
                ...(hoveredButton === 'next' ? buttonHoverStyle : {})
              }}
              onMouseEnter={() => setHoveredButton('next')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={handleNextPage}
              disabled={!nextQuery && (pageFrom + pageSize >= total)}
            >
              Next
            </button>
          </div>
        </>
      )}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          style={{
            ...buttonStyle,
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#6c63ff'
          }}
          onClick={handleGenerateMatch}
        >
          Generate Match from Favorites
        </button>
        {matchResult && !matchedDog && (
          <div style={{ marginTop: '1rem' }}>
            <h2>Your Match</h2>
            <p>Matched Dog ID: {matchResult}</p>
            <p>Loading matched dog details...</p>
          </div>
        )}
        {matchedDog && (
          <div style={{ 
              marginTop: '1rem', 
              border: '3px solid #6c63ff', 
              padding: '1rem', 
              borderRadius: '12px', 
              display: 'inline-block',
              backgroundColor: '#fff'
            }}
          >
            <h2>Your Match</h2>
            {matchedDog.img && <img src={matchedDog.img} alt={matchedDog.name} style={{ maxWidth: '200px', borderRadius: '8px' }} />}
            <p><strong>Name:</strong> {matchedDog.name}</p>
            <p><strong>Breed:</strong> {matchedDog.breed}</p>
            <p><strong>Age:</strong> {matchedDog.age}</p>
            <p><strong>ZIP Code:</strong> {matchedDog.zip_code}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
