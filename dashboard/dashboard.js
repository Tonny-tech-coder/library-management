

const model = document.getElementById("modal");
const addBookbtn = document.getElementById("add-book");
const closeBtn = document.getElementById("close-model");
const saveBookbtn = document.getElementById("save-book");
const submitForm = document.getElementById("submit-form");
const bookTable = document.getElementById("book-table");
const tableBody = document.getElementById("table-body");
const emptyState = document.getElementById("empty-state")


const API_BASE = 'http://localhost:3000/api';



// empty state
function showEmptyState() {
    emptyState.classList.remove('show');
    tableBody.style.display = 'none';
}
// hide empty state
function hideEmptyState() {
    emptyState.classList.add('show');
    tableBody.style.display = 'table';
};

// ui events
addBookbtn.addEventListener('click', () => {
    model.style.display = "flex";
})

closeBtn.addEventListener('click', () => {
    model.style.display = "none";
})

// edit book
async function editbook(bookid) {

}

//deleteing funtion
async function deleteBook(id) {
    if (!bookid)
        return console.log('missing bookid');

    try {
        const response = await fetch(`${API_BASE}/books/${booksId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.log('error in deleting book');
        } else {
            alert('book deleted successfully');
            loadBooks()
        }
    } catch (error) {
        console.log(error);
        alert('somthing went wrong in deleting book');
    }

}
//display books
const loadBooks = async () => {
    try {

        const response = await fetch(`${API_BASE}/books`);

        if (!response.ok) {
            console.log('Error in getting data:',);
            return;
        }

        const books = await response.json();
        displaybooks({ books });
    } catch (error) {
        showEmptyState()
        console.log(error);
    }
}
const displaybooks = ({ books }) => {
    tableBody.innerHTML = ''

    if (!books) {
        console.log('No books found');
        return
        emptyState.classList.add('show');
    }

    books.forEach((bookTable, i) => {
        const row = createHtmlRow(book);


    });
}



/*const createHtmlrow = (book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><stronge>${index + 1}<stronge></td>
    <td><stronge>${book.name}<stronge></td>
    <td class = 'truncate'>${book.author}</td>
    <td class = 'truncate'>${book.description}</td>
    
    <td class = 'truncate'>
    <img class = 'table-image' src="${book.imgSrc}" alt="${book.name}">
    </td>
    <td class = 'truncate'>${book.price}</td>
    div class = 'action-cell'>
    <button class = 'edit-action'>view</button>
    <button class = 'edit-action'>Edit</button>
    <button class = 'edit-action'>delete</button>
    </div>
    </td>
    `
}*/
// submit zone
async function handleBookSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;


    if (!name || !author || !description || !image) {
        console.log({name,author,description,image});
        //alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                author:author,
                description:description,
                image:image,

            })
        });
        if (!response.ok) {
            console.log('something went wrong');
            alert('Failed to save data');
        }
        else{
            alert('data saved successfully');

        }

        const data = await response.json();
        model.style.display = "none";
        submitForm.reset();

    } catch (error) {
        console.error(error);
    }

}


saveBookbtn.addEventListener('click', handleBookSubmit);

document.addEventListener('DOMContentLoaded', loadBooks);



// my funtion
window.onload = function () {
    loadBooks();
};

function loadbooks() {
    fetch("http://localhost:3000/api/books")
    .then(res => res.json())
    .then(data => {
        let rows = "";
        data.forEach(book => {
            rows += `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${author}</td>
            <td>${description}</td>
            <td>${image}</td>
            `
        });
        document.getElementById("tableBody").innerHTML = rows;
    })
    .catch(err => console.log("error:",err));
}