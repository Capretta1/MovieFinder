document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("movieForm");
  const movieResults = document.getElementById("movieResults");

  movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const movieName = document.getElementById("movieInput").value;
    await searchMovies(movieName);
  });

  async function searchMovies(movieName) {
    try {
      movieResults.innerHTML = '<div class="loading">Searching movies...</div>';

      const response = await fetch(
        `http://www.omdbapi.com/?s=${movieName}&apikey=[your_api_key]`
      );
      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "No movies found");
      }

      displayMovies(data.Search);
    } catch (error) {
      movieResults.innerHTML = `
                    <div class="error-message">
                        ${
                          error.message ||
                          "Error searching movies. Please try again."
                        }
                    </div>
                `;
    }
  }

  function displayMovies(movies) {
    movieResults.innerHTML = `
                <div class="movies-grid">
                    ${movies
                      .map(
                        (movie) => `
                        <div class="movie-card">
                            <img 
                                src="${
                                  movie.Poster !== "N/A"
                                    ? movie.Poster
                                    : "https://via.placeholder.com/300x450?text=No+Poster"
                                }" 
                                alt="${movie.Title}"
                                class="movie-poster"
                               
                            >
                            <div class="movie-info">
                                <h3 class="movie-title">${movie.Title}</h3>
                                <div class="movie-year">${movie.Year}</div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
  }
});
// This script handles the movie search functionality
// It fetches movie data from the OMDB API and displays it in a grid format
// The search results are displayed with movie posters, titles, and years
// Error handling is included to manage API errors and display appropriate messages
// The script uses async/await for asynchronous operations
// The DOMContentLoaded event ensures the script runs after the HTML is fully loaded
// The movie form submission is handled to prevent default behavior and trigger the search function
// The searchMovies function fetches data from the OMDB API and handles errors
// The displayMovies function formats and displays the movie data in a grid layout
// The movie results are dynamically updated based on the search input
// The loading state is shown while the API request is in progress
// The movie poster uses a placeholder image if no poster is available
// The movie cards are styled with CSS for a better user experience
// The movie title and year are displayed below the poster in each movie card
// The script is designed to be modular and easy to maintain
// The API key is included in the fetch request for authentication
// The script is compatible with modern browsers that support fetch and async/await
// The movie search functionality can be easily extended or modified
// The script is lightweight and does not rely on external libraries
// The movie search feature enhances the user experience by providing quick access to movie information
