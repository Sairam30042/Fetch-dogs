import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DogDetails() {
    const [dogDetails, setDogDetails] = useState([]);

    useEffect(() => {
        const dogIDs = ["VXGFTIcBOvEgQ5OCx40W", "V3GFTIcBOvEgQ5OCx40W", /* more IDs */];
        const fetchDogInfo = async () => {
            const promises = dogIDs.map(id => 
                axios.get(`https://frontend-take-home-service.fetch.com/dogs/${id}`)
            );
            try {
                const dogResults = await Promise.all(promises);
                setDogDetails(dogResults.map(res => res.data));
            } catch (error) {
                console.error('Error fetching dog details:', error);
            }
        };

        fetchDogInfo();
    }, []);

    return (
        <div>
            <h1>Dog Details</h1>
            {dogDetails.map((dog, index) => (
                <div key={index}>
                    <p>Name: {dog.name}</p>
                    <p>Breed: {dog.breed}</p>
                    <p>Age: {dog.age}</p>
                    {/* displaying other dog details as needed */}
                </div>
            ))}
        </div>
    );
}

export default DogDetails;
