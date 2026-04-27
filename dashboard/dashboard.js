const model = document.getElementById("modal");
const addBookbtn = document.getElementById("add-book");
const closeBtn = document.getElementById("close-model");
const saveBookbtn = document.getElementById("save-book");
const submitForm = document.getElementById("submit-form");
const bookTable = document.getElementById("book-table");
const tableBody = document.getElementById("table-body");
const emptyState = document.getElementById("empty-state");

// Get input elements
const nameInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const descInput = document.getElementById('description');
const imgSrcInput = document.getElementById('image');

const API_BASE = 'http://localhost:3000/api';

let currentBookId = null;

// Empty state functions
function showEmptyState() {
    emptyState.style.display = 'block';
    bookTable.style.display = 'none';
}

function hideEmptyState() {
    emptyState.style.display = 'none';
    bookTable.style.display = 'table';
}

// UI events
addBookbtn.addEventListener('click', () => {
    model.style.display = "flex";
    currentBookId = null;
    submitForm.reset();
    document.querySelector('#h23').textContent = 'Add New Book';
});

closeBtn.addEventListener('click', () => {
    model.style.display = "none";
    submitForm.reset();
    currentBookId = null;
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === model) {
        model.style.display = "none";
        submitForm.reset();
        currentBookId = null;
    }
});

// Create HTML row for book
const createHtmlRow = (book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.description}</td>
    <td><img src="${book.image}" alt="${book.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" onerror="this.src='https://via.placeholder.com/50'"></td>
    <td>
        <div class='action-cell' style="display: flex; gap: 8px;">
            <button class='edit-action' style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;" onclick='viewBook("${book.id}")'>View</button>
            <button class='edit-action' style="background-color: #2196F3; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;" onclick='editBook("${book.id}")'>Edit</button>
            <button class='edit-action' style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;" onclick='deleteBook("${book.id}")'>Delete</button>
        </div>
    </td>
    `;
    return row;
};

// Display books in table
const displayBooks = (books) => {
    tableBody.innerHTML = '';

    if (!books || books.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    books.forEach((book, i) => {
        const row = createHtmlRow(book, i);
        tableBody.appendChild(row);
    });
};

// Load books from API
const loadBooks = async () => {
    try {
        const response = await fetch(`${API_BASE}/books`);

        if (!response.ok) {
            console.log('Error in getting data');
            showEmptyState();
            return;
        }

        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.log(error);
        showEmptyState();
    }
};

// View book details
function viewBook(bookId) {
    fetch(`${API_BASE}/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            alert(`Book Details:\n\nTitle: ${book.name}\nAuthor: ${book.author}\nDescription: ${book.description}\nImage: ${book.image}`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Could not fetch book details');
        });
}

// Edit book function
async function editBook(bookId) {
    model.style.display = "flex";
    currentBookId = bookId;
    document.querySelector('#h23').textContent = 'Edit Book';

    try {
        const response = await fetch(`${API_BASE}/books/${bookId}`);

        if (response.ok) {
            const existingBook = await response.json();

            nameInput.value = existingBook.name;
            authorInput.value = existingBook.author;
            descInput.value = existingBook.description;
            imgSrcInput.value = existingBook.image;
        } else {
            console.log('Error fetching book details');
            alert('Could not fetch book details');
        }
    } catch (error) {
        console.log(error);
        alert('Something went wrong while fetching book details');
    }
}

// Delete book function
async function deleteBook(bookId) {
    if (!bookId) {
        console.log('missing bookid');
        return;
    }

    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/books/${bookId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.log('Error in deleting book');
            alert('Failed to delete book');
        } else {
            alert('Book deleted successfully');
            loadBooks();
        }
    } catch (error) {
        console.log(error);
        alert('Something went wrong in deleting book');
    }
}

// Handle book submit (Create or Update)
async function handleBookSubmit(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const author = authorInput.value.trim();
    const description = descInput.value.trim();
    const image = imgSrcInput.value.trim();

    if (!name || !author || !description || !image) {
        alert('Please fill in all fields');
        return;
    }

    try {
        let response;
        
        if (currentBookId) {
            // Update existing book
            response = await fetch(`${API_BASE}/books/${currentBookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    author: author,
                    description: description,
                    image: image
                })
            });
        } else {
            // Create new book
            response = await fetch(`${API_BASE}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    author: author,
                    description: description,
                    image: image
                })
            });
        }

        if (!response.ok) {
            const errorData = await response.text();
            console.log('Error response:', errorData);
            alert('Failed to save data');
            return;
        }

        alert(currentBookId ? 'Book updated successfully!' : 'Book saved successfully!');
        submitForm.reset();
        model.style.display = "none";
        currentBookId = null;
        loadBooks();

    } catch (error) {
        console.error(error);
        alert('Something went wrong while saving. Make sure the backend server is running on port 3000');
    }
}

// Save button event
saveBookbtn.addEventListener('click', handleBookSubmit);

// Load books when page loads
document.addEventListener('DOMContentLoaded', loadBooks);