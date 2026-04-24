

const model = document.getElementById("modal");
const addBookbtn = document.getElementById("add-book");
const closeBtn = document.getElementById("close-model");
const saveBookbtn = document.getElementById("add-book"); 
const submitForm = document.getElementById("submit-form"); 
const bookTable = document.getElementById("book-table") ;
const tableBody = document.getElementById("table-body") ;
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
addBookbtn.addEventListener('click',()=>{
    model.style.display = "flex";
})

closeBtn.addEventListener('click', ()=>{
    model.style.display = "none";
})      

// edit book
async function editbook (bookid) {
    
}

//deleteing funtion
async function deleteBook(id){
    if (!bookid)
    return console.log('missing bookid');

try {
    const response = await fetch(`${API_BASE}/books/${booksId}`,{
        method: 'DELETE',
    });
    if (!response.ok){
        console.log('error in deleting book');
    } else{
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
        
 if(!response.ok){ 
    console.log('Error in getting data:',);
        return;
}

     const books = await response.json();
     displayBooks({books});
} catch(error){
     emptyState()
    console.log('error');
}
}
const displaybooks = ({books}) =>{
    tableBody.innerHTML = ''

    if (!books) {
        console.log('No books found');
        return
        emptyState.classList.add('show');
    }

    books.forEach((bookTable,i) => {
      const row = createHtmlRow(book);


    });
}



const createHtmlrow = (book,index) => {
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
}
// submit zone
async function handleBookSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('name').value;
    const authorInput = document.getElementById('author').value;
    const descInput = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const priceInput = document.getElementById('price').value;

    if (! nameInput.value || ! authorInput.value || ! descInput.value || ! image.value || ! priceInput.value){
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/books`, {
           method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: nameInput,
                author: authorInput,
                description: descInput,
                imageSrc: image,
                price: priceInput,
              })
        });
    if (!response.ok) {
            console.log('something went wrong');
        }

     const data = response.json();
     Model.style.display = "none";
     submitForm.reset();
        alert('data saved successfully');

    } catch (error) {
        console.error(error);
    }

}


        saveBookbtn.addEventListener('click', handleBookSubmit);

        document.addEventListener('DOMContentLoaded',loadBooks);