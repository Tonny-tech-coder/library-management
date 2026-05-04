// ============================================
// DOM ELEMENTS & API CONFIGURATION
// ============================================

// Modal overlay for add/edit form
const modal = document.getElementById("modal");

// Add book button
const addBookBtn = document.getElementById("add-book");

// Close modal button
const closeBtn = document.getElementById("close-modal");

// Form submit button
const submitForm = document.getElementById("submit-form");

// Table body for displaying books
const tableBody = document.getElementById("table-body");

// Books table
const bookTable = document.getElementById("book-table");

// Empty state message (shown when no books)
const emptyState = document.getElementById("empty-state");

// Book name input field
const nameInput = document.getElementById("name");

// Book author input field
const authorInput = document.getElementById("author");

// Book description input field
const descInput = document.getElementById("description");

// Book image file input
const imageInput = document.getElementById("image");

// Base API URL for books endpoint
const API_BASE = "http://localhost:3000/api/books";

// Track current book being edited (null if adding new)
let currentBookId = null;

// Track current book image URL
let currentImageUrl = null;

// ============================================
// MODAL FUNCTIONS - OPEN & CLOSE
// ============================================

// Add book button click - open modal for new book
addBookBtn.addEventListener("click", () => {
    currentBookId = null;
    currentImageUrl = null;
    submitForm.reset();
    openModal("Add New Book");
});

// Close button click handler
closeBtn.addEventListener("click", closeModal);

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Open modal with title
function openModal(title) {
    modal.style.display = "flex";
    document.getElementById("h23").textContent = title;
}

// Close modal and reset form
function closeModal() {
    modal.style.display = "none";
    submitForm.reset();
    imageInput.value = "";
    currentBookId = null;
    currentImageUrl = null;
}

// ============================================
// EMPTY STATE - SHOW/HIDE
// ============================================

// Show empty state message when no books exist
function showEmptyState() {
    emptyState.style.display = "block";
    bookTable.style.display = "none";
}

// Hide empty state message
function hideEmptyState() {
    emptyState.style.display = "none";
    bookTable.style.display = "table";
}

// ============================================
// IMAGE CONVERSION - BASE64 ENCODING
// ============================================

// Convert file to base64 string for storage
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

// ============================================
// LOAD BOOKS FROM API
// ============================================

// Fetch all books from backend
async function loadBooks() {
    try {
        const res = await fetch(API_BASE);
        const books = await res.json();

        displayBooks(books);
    } catch (err) {
        console.log(err);
        showEmptyState();
    }
}

// ============================================
// DISPLAY BOOKS IN TABLE
// ============================================

// Create table rows for each book
function displayBooks(books) {
    tableBody.innerHTML = "";

    // Check if books exist
    if (!books || books.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    
    // Create table row for each book
    books.forEach((book, index) => {
        const row = document.createElement("tr");

        const image = book.image || "https://via.placeholder.com/50";

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.description}</td>
            <td>
                <img src="${image}" width="50" height="50" style="object-fit:cover; border-radius:4px;">
            </td>
            <td>
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// ============================================
// FORM SUBMISSION - ADD & UPDATE BOOK
// ============================================

// Handle form submit for adding or updating books
submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const saveBookBtn = document.getElementById("save-book");

    const name = nameInput.value.trim();
    const author = authorInput.value.trim();
    const description = descInput.value.trim();

    // Validate inputs
    if (!name || !author || !description) {
        alert("Fill all fields");
        return;
    }

    // Set button to loading state
    saveBookBtn.disabled = true;
    saveBookBtn.textContent = currentBookId ? "Updating..." : "Saving...";

    let imageValue = currentImageUrl || "";

    // Convert new image if uploaded
    if (imageInput.files && imageInput.files[0]) {
        imageValue = await toBase64(imageInput.files[0]);
    }

    const bookData = {
        name,
        author,
        description,
        image: imageValue
    };

    try {
        let res;

        // Update existing book or create new one
        if (currentBookId) {
            res = await fetch(`${API_BASE}/${currentBookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });
        } else {
            res = await fetch(API_BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });
        }

        if (res.ok) {
            alert(currentBookId ? "Book updated!" : "Book added!");
            closeModal();
            loadBooks();
        } else {
            alert("Failed to save book");
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    } finally {
        // Reset button state
        saveBookBtn.disabled = false;
        saveBookBtn.textContent = "Submit";
    }
});

// ============================================
// EDIT BOOK
// ============================================

// Load book data and open edit modal
async function editBook(id) {
    try {
        const res = await fetch(`${API_BASE}/${id}`);
        const book = await res.json();

        // Populate form with book data
        nameInput.value = book.name;
        authorInput.value = book.author;
        descInput.value = book.description;

        currentBookId = id;
        currentImageUrl = book.image;

        openModal("Edit Book");

    } catch (err) {
        console.log(err);
        alert("Failed to load book");
    }
}

// ============================================
// DELETE BOOK
// ============================================

// Delete book after confirmation
async function deleteBook(id) {
    if (!confirm("Delete this book?")) return;

    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("Deleted successfully");
            loadBooks();
        } else {
            alert("Delete failed");
        }

    } catch (err) {
        console.log(err);
    }
}

// ============================================
// GLOBAL FUNCTION EXPORTS
// ============================================

// Make functions available globally for onclick handlers
window.editBook = editBook;
window.deleteBook = deleteBook;

// ============================================
// INITIALIZATION
// ============================================

// Load books when page loads
document.addEventListener("DOMContentLoaded", loadBooks);