import { initBasketUI, redirectToCheckout } from "../../basket/basket.js";

/* Toast message pop up - added to cart */ 
function showToastMessage(message) {
    const toast = document.getElementById("toast");
    if(!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    initBasketUI();
    const checkoutBtn = document.getElementById("checkout-btn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", redirectToCheckout);
    }

    const apiUrl = "https://v2.api.noroff.dev/square-eyes";
    const apiMovieContainer = document.getElementById("api-movie-container");

    let allMovies = [];

// Display Api- Movies //
function displayMovies(movies) {
    const apiMovieContainer = document.getElementById("api-movie-container");
    apiMovieContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
          <div class="movie-wrapper">
               <a href="movie-details/index.html?id=${movie.id}">
                 <img src="${movie.image.url}" alt="${movie.image.alt}" class="movie-image">
               </a>
               <div class="cart-hover-icon" 
                     data-id="${movie.id}"
                     data-title="${movie.title}"
                     data-image="${movie.image.url}"
                     data-price="${movie.price}"
                     title="Add to cart">
                     <i class="fa-solid fa-basket-shopping"></i>
               </div>
          </div>
        `;
        apiMovieContainer.appendChild(movieElement);

        const cartIcon = movieElement.querySelector(".cart-hover-icon");
            cartIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();

                const target = e.currentTarget;

                const { id, title, image, price } = cartIcon.dataset;
                window.addToBasket(id, title, image, price );
                showToastMessage(`${title} was added to your basket.`);
            });
    });
}

// Genre Filter //
const genreButtons = document.querySelectorAll (".genre-btn");

genreButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedGenre = button.dataset.genre;

        genreButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        if (selectedGenre === "all") {
            displayMovies(allMovies);
        } else {
            const filtered = allMovies.filter(movie =>
                movie.genre && movie.genre.toLowerCase() === selectedGenre.toLowerCase()
            );
            displayMovies(filtered);
        }
    });
});

// Fetch Api- Movies //
async function fetchMovies() {
    const apiMovieContainer = document.getElementById("api-movie-container");
    apiMovieContainer.innerHTML = `<div class="loading-spinner"></div>`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        allMovies = data.data || data;
        displayMovies(allMovies);
    } catch (error) {
        apiMovieContainer.innerHTML = "<p class='error-message'>Failed to load movies. Please try again</p>";
        alert("Something went wrong while fetching movies");
    }
}

fetchMovies();

});
