const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book");
const closeBtn = document.getElementById("close-modal");
const submitForm = document.getElementById("submit-form");

const tableBody = document.getElementById("table-body");
const bookTable = document.getElementById("book-table");
const emptyState = document.getElementById("empty-state");

const nameInput = document.getElementById("name");
const authorInput = document.getElementById("author");
const descInput = document.getElementById("description");
const imageInput = document.getElementById("image");

const API_BASE = "http://localhost:3000/api/books";

let currentBookId = null;
let currentImageUrl = null;

/* ---------------- MODAL ------------------ */

addBookBtn.addEventListener("click", () => {
    currentBookId = null;
    currentImageUrl = null;
    submitForm.reset();
    openModal("Add New Book");
});

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function openModal(title) {
    modal.style.display = "flex";
    document.getElementById("h23").textContent = title;
}

function closeModal() {
    modal.style.display = "none";
    submitForm.reset();
    imageInput.value = "";
    currentBookId = null;
    currentImageUrl = null;
}

/* ---------------- EMPTY STATE ---------------- */

function showEmptyState() {
    emptyState.style.display = "block";
    bookTable.style.display = "none";
}

function hideEmptyState() {
    emptyState.style.display = "none";
    bookTable.style.display = "table";
}

/* ---------------- IMAGE CONVERTER ---------------- */

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

/* ---------------- LOAD BOOKS ---------------- */

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

/* ---------------- DISPLAY ---------------- */

function displayBooks(books) {
    tableBody.innerHTML = "";

    if (!books || books.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
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

/* ---------------- SUBMIT (ADD + UPDATE) ---------------- */

submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const saveBookBtn = document.getElementById("save-book");

    const name = nameInput.value.trim();
    const author = authorInput.value.trim();
    const description = descInput.value.trim();

    if (!name || !author || !description) {
        alert("Fill all fields");
        return;
    }

    // 🔥 loading state
    saveBookBtn.disabled = true;
    saveBookBtn.textContent = currentBookId ? "Updating..." : "Saving...";

    let imageValue = currentImageUrl || "";

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
        // reset button
        saveBookBtn.disabled = false;
        saveBookBtn.textContent = "Submit";
    }
});

/* ---------------- EDIT ---------------- */

async function editBook(id) {
    try {
        const res = await fetch(`${API_BASE}/${id}`);
        const book = await res.json();

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

/* ---------------- DELETE ---------------- */

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

/* ---------------- GLOBAL ---------------- */

window.editBook = editBook;
window.deleteBook = deleteBook;

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", loadBooks);