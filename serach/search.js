const searchText = document.querySelector('.search-title');
const bookContainer = document.querySelector('.book-card');
const API_BASE = 'http://localhost:3000'; // Update as needed

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get('q') || '';
    console.log('Search value:', searchValue);

    if(searchValue){
        searchText.innerText = `Search Results for: ${searchValue}`;
    }
    
    if(searchValue){
        const response = await fetch(`${API_BASE}/api/search/${searchValue}`);
        if(response.ok) {
            const result = await response.json();

            if(result.data && result.data.length > 0) {
                result.data.forEach((book) => {
                    const bookcard = document.createElement('div');
                    const bookImage = document.createElement('img');
                    const bookDescDiv = document.createElement('div');
                    const bookTitle = document.createElement('h2');
                    const author = document.createElement('p');
                    const description = document.createElement('p');

                    bookImage.src = book.image;
                    bookImage.alt = book.name;
                    bookTitle.innerText = book.name;
                    author.innerText = book.author;
                    description.innerText = book.description;

                    bookcard.className = 'book-card';
                    bookDescDiv.className = 'book-desc';
                    bookTitle.className = 'title';
                    author.className = 'author';
                    description.className = 'desc';

                    bookDescDiv.appendChild(bookTitle);
                    bookDescDiv.appendChild(author);
                    bookDescDiv.appendChild(description);
                    bookcard.appendChild(bookImage);
                    bookcard.appendChild(bookDescDiv);
                    bookContainer.appendChild(bookcard);
                });
            } else {
                searchText.innerText = 'No results found';
            }
        } else {
            searchText.innerText = 'No results found';
        }
    }
});


