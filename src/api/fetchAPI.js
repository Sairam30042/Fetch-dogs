import axios from 'axios';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

// Ensuring cookies are included with every request
axios.defaults.withCredentials = true;

export const login = async (name, email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { name, email });
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('Logout API error:', error);
    throw error;
  }
};

// Fetching multiple dog details by passing an array of dog IDs
export const fetchDogsByIds = async (dogIDs) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dogs`, dogIDs);
    return response.data; // Expected to return an array of Dog objects
  } catch (error) {
    console.error('Failed to fetch dog details:', error);
    throw error;
  }
};

// Searching for dogs based on filters (which include pagination and sort info)
// Returning an object: { dogs, total, next, prev }
export const searchDogs = async (filters = {}) => {
  try {
    const searchResponse = await axios.get(`${API_BASE_URL}/dogs/search`, { params: filters });
    if (searchResponse.data && Array.isArray(searchResponse.data.resultIds)) {
      const { resultIds, total, next, prev } = searchResponse.data;
      const dogs = await fetchDogsByIds(resultIds);
      return { dogs, total, next, prev };
    }
    return { dogs: [], total: 0, next: null, prev: null };
  } catch (error) {
    console.error('Search API error:', error);
    return { dogs: [], total: 0, next: null, prev: null };
  }
};

// Generating a match based on the favorited dog IDs
// Expecting favoriteIds to be an array of dog IDs.
export const generateMatch = async (favoriteIds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dogs/match`, favoriteIds);
    return response.data; // Expected to be an object with a property `match`
  } catch (error) {
    console.error('Match generation error:', error);
    throw error;
  }
};
