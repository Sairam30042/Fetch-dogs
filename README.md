# Dog Finder

Dog Finder is a React-based front-end application designed to help dog enthusiasts browse a database of shelter dogs. Users can log in with their name and email, search for dogs by breed, sort and paginate the results, and select favorites to generate a match based on their selections.

> **Note:** This project is not deployed and is intended for local use only.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Future Improvements](#future-improvements)
  
## Features

- **User Authentication:**  
  Log in using your name and email. The app authenticates via an API and manages session cookies.

- **Search & Filter:**  
  Search for dogs by breed. The results are sorted alphabetically by breed by default and can be toggled between ascending and descending order. The search results are paginated.

- **Favorites & Match Generation:**  
  Mark dogs as favorites. Generate a match based on your favorites, and view detailed information about the matched dog.

- **Responsive & Interactive UI:**  
  Enjoy a colorful, modern design with interactive dog cards, smooth transitions, and hover effects.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Sairam30042/Fetch-dogs.git
   cd dog-finder

- **2.Install Dependencies:**  


Use npm:

npm install

- **Usage:**  

Start the Application Locally:

npm start

Access the Application:

Open your browser and navigate to http://localhost:3000.

Login and Explore:

On the login page, enter your name and email, then click Login.
On the search page, select a dog breed, adjust the sort order if desired, navigate through the results, and mark your favorites.
Click Generate Match from Favorites to see the matched dog's details.

- **Testing:**  

The project uses Jest and React Testing Library for testing.

To run tests, execute:

npm test

Tests simulate user interactions (login, search, favoriting, and match generation) and use mocked API calls to verify component behavior.

- **Project Structure:**  

A brief overview of the main folders and files:

src/
api/
fetchAPI.js – Contains functions to interact with the backend API (login, search, match generation, etc.).
pages/
Login.js – The login page component.
Search.js – The search page component with filtering, sorting, pagination, and match generation.
components/
(Additional UI components, if any.)
App.js – Main application component that sets up routing.
setupTests.js – Configuration for testing.

- **API Reference:**  

The backend API endpoints used in the project include:

POST /auth/login
Request body: { name: string, email: string }
Sets an authentication cookie on success.

POST /auth/logout
Logs out the user and invalidates the session.

GET /dogs/breeds
Returns an array of available dog breeds.

GET /dogs/search
Query parameters:

breeds: Array of breed names.
size: Number of results per page.
from: Offset for pagination.
sort: Format breed:asc or breed:desc.
Returns an object with dog IDs and pagination info.

POST /dogs
Request body: Array of dog IDs.
Returns detailed dog objects.

POST /dogs/match
Request body: Array of favorite dog IDs.
Returns an object with the matched dog’s ID.

Future Improvements
Enhanced Error Handling:
Integrate error boundaries and provide user-friendly error messages.


User Profile Management:
Enable users to view and manage their favorite dogs and search history.

UI Enhancements:
Further improve design and responsiveness for different devices.

