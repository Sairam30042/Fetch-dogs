import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchDogs() {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetching breeds on component mount
    useEffect(() => {
        setLoading(true);
        axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds')
            .then(response => {
                setBreeds(response.data); // assuming the response data is an array of breeds
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch breeds:', error);
                setError('Failed to fetch breeds');
                setLoading(false);
            });
    }, []);

    // Fetching dogs based on selected breed
    const fetchDogsByBreed = (breed) => {
        setLoading(true);
        axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
            params: { breed: breed, size: 25, from: 0, sort: 'breed:asc' }
        })
        .then(response => {
            setDogs(response.data.resultIds); // Updating based on actual response structure
            setLoading(false);
        })
        .catch(error => {
            console.error(`Failed to fetch dogs for breed ${breed}:`, error);
            setError(`Failed to fetch dogs for breed ${breed}`);
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>Search for Dogs</h1>
            <select
                value={selectedBreed}
                onChange={(e) => {
                    setSelectedBreed(e.target.value);
                    fetchDogsByBreed(e.target.value);
                }}
            >
                <option value="">Select a breed</option>
                {breeds.map((breed, index) => (
                    <option key={index} value={breed}>{breed}</option>
                ))}
            </select>

            {loading ? <p>Loading...</p> : (
                <ul>
                    {dogs.map((dog, index) => (
                        <li key={index}>{dog}</li> // Modifying based on how you want to display dogs
                    ))}
                </ul>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default SearchDogs;
