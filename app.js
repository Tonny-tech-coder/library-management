// ============================================
// DOM ELEMENTS & API CONFIGURATION
// ============================================

// Book container where books will be displayed
const bookContainer = document.getElementById("book-container");

// Search input field for searching books
const searchInput = document.getElementById("searchInput");

// Sign-in button
const siginBtn = document.getElementById("signin-btn");

// Sign-up button
const signupBtn = document.getElementById("signup-btn");

// Profile section
const profile = document.getElementById("profile");

// Base API URL for backend requests
const API_BASE = 'http://localhost:3000';

// Book cards collection
const bookcard = document.getElementsByClassName('book-card');

// Navigation links
const navLinks = document.getElementById('navLink');

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

// Event listener for search input - triggers on Enter key
searchInput.addEventListener('keydown', async (event) => {
  if(event.key === 'Enter'){
    event.preventDefault();
    const searchValue = searchInput.value.trim();
    
    if(searchValue){
      // Navigate to search page with query parameter
      window.location.href = './serach/index.html?q=' + encodeURIComponent(searchValue);
    }
  }
});

// ============================================
// FETCH & DISPLAY BOOKS
// ============================================

// Fetch all books from API and display them
const displayBooks = async () => {
  try {
    // Fetch books from backend API
    const response = await fetch(`${API_BASE}/api/books`);
    if(!response.ok) {
      console.error('Failed to fetch books');
      return;
    }
    
    const books = await response.json();

    // Loop through each book and create HTML elements
    books.forEach((book) => {
      // Create book card container
      const bookCard = document.createElement("div");
      const bookImage = document.createElement("img");

      const bookDescDiv = document.createElement("div");
      const bookTitle = document.createElement("h2");
      const author = document.createElement("p");
      const description = document.createElement("p");

      // Set book data to HTML elements
      bookImage.src = `${book.image}`;
      bookImage.alt = `${book.name} cover image`;
      bookTitle.textContent = `${book.name}`;
      author.innerText = `${book.author}`;
      description.innerText = `${book.description}`;

      // Add CSS classes for styling
      bookCard.className = 'book-card'
      bookDescDiv.className = "book-desc"
      bookTitle.className = 'title'
      author.className = 'author'
      description.className = 'desc'
      
      // Build the book card structure
      bookDescDiv.appendChild(bookTitle);
      bookDescDiv.appendChild(author);
      bookDescDiv.appendChild(description);
      bookCard.appendChild(bookImage);
      bookCard.appendChild(bookDescDiv);

      // Add card to page
      bookContainer.appendChild(bookCard);
    });
  } catch(error) {
    console.error('Error loading books:', error);
  }
};

// Load and display books when page loads
displayBooks();
