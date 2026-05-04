// ============================================
// DOM ELEMENTS & API CONFIGURATION
// ============================================

// Search title element
const searchText = document.querySelector('.search-title');

// Book container where results will be displayed
const bookContainer = document.querySelector('.book-card');

// Base API URL
const API_BASE = 'http://localhost:3000';

// ============================================
// LOAD SEARCH RESULTS ON PAGE LOAD
// ============================================

// Fetch and display search results when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Extract search query from URL parameters
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get('q') || '';
    console.log('Search value:', searchValue);

    // Update page title with search term
    if(searchValue){
        searchText.innerText = `Search Results for: ${searchValue}`;
    }
    
    // Fetch search results from API
    if(searchValue){
        const response = await fetch(`${API_BASE}/api/search/${searchValue}`);
        if(response.ok) {
            const result = await response.json();

            // Check if results exist and display them
            if(result.data && result.data.length > 0) {
                // Loop through each book result
                result.data.forEach((book) => {
                    // Create book card elements
                    const bookcard = document.createElement('div');
                    const bookImage = document.createElement('img');
                    const bookDescDiv = document.createElement('div');
                    const bookTitle = document.createElement('h2');
                    const author = document.createElement('p');
                    const description = document.createElement('p');

                    // Set book data to elements
                    bookImage.src = book.image;
                    bookImage.alt = book.name;
                    bookTitle.innerText = book.name;
                    author.innerText = book.author;
                    description.innerText = book.description;

                    // Add CSS classes for styling
                    bookcard.className = 'book-card';
                    bookDescDiv.className = 'book-desc';
                    bookTitle.className = 'title';
                    author.className = 'author';
                    description.className = 'desc';

                    // Build book card structure
                    bookDescDiv.appendChild(bookTitle);
                    bookDescDiv.appendChild(author);
                    bookDescDiv.appendChild(description);
                    bookcard.appendChild(bookImage);
                    bookcard.appendChild(bookDescDiv);
                    
                    // Add to page
                    bookContainer.appendChild(bookcard);
                });
            } else {
                // No results found
                searchText.innerText = 'No results found';
            }
        } else {
            // API error
            searchText.innerText = 'No results found';
        }
    }
});


