// ============================================
// IMPORTS & DOM ELEMENTS
// ============================================

// Import API base URL from lib
import { API_BASE } from "../../lib/index.js";

// Book name display element
const bookName = document.getElementById('book-name')

// Book description display element
const bookDesc = document.getElementById('book-des')

// Book author display element
const author = document.getElementById('author')

// ============================================
// EXTRACT BOOK ID FROM URL
// ============================================

// Get book ID from URL parameters (e.g., ?1)
const params = window.location.href.split('?')
const id = params[1]
console.log(id);

// ============================================
// LOAD BOOK DETAILS
// ============================================

// Fetch and display book details by ID
const loadBooks = async () => {
  try {
    // Fetch book data from API
    const response = await fetch(`${API_BASE}/books/${id}`);
    if (!response.ok) {
      console.log("error in getting data");
      return;
    }

    // Parse response and update page elements
    const book = await response.json();
    bookName.innerText = book.name
    bookDesc.innerText = book.description
    author.innerText = book.author
    
  } catch (error) {
    console.log(error);
  }

  console.log('here');
};

// ============================================
// INITIALIZATION
// ============================================

// Load book details when DOM is ready
document.addEventListener("DOMContentLoaded", loadBooks);
