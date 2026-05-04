const bookContainer = document.getElementById("book-container");
const searchInput = document.getElementById("searchInput");
const siginBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");
const profile = document.getElementById("profile");
const API_BASE = 'http://localhost:3000';
const bookcard = document.getElementsByClassName('book-card');
const navLinks = document.getElementById('navLink');

/* ---------------- FETCH BOOKS ---------------- */


/* ------searchinput------*/
searchInput.addEventListener('keydown', async (event) => {
  if(event.key === 'Enter'){
    event.preventDefault();
    const searchValue = searchInput.value.trim();
    
    if(searchValue){
      window.location.href = './serach/index.html?q=' + encodeURIComponent(searchValue);
    }
  }
});
  

const displayBooks = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/books`);
    if(!response.ok) {
      console.error('Failed to fetch books');
      return;
    }
    
    const books = await response.json();

    books.forEach((book) => {
      // create html element 
      const bookCard = document.createElement("div");
      const bookImage = document.createElement("img");

      const bookDescDiv = document.createElement("div");
      const bookTitle = document.createElement("h2");
      const author = document.createElement("p");
      const description = document.createElement("p");

      // insert data
      bookImage.src = `${book.image}`;
      bookImage.alt = `${book.name} cover image`;
      bookTitle.textContent = `${book.name}`;
      author.innerText = `${book.author}`;
      description.innerText = `${book.description}`;

      // add a css class 
      bookCard.className = 'book-card'
      bookDescDiv.className = "book-desc"
      bookTitle.className = 'title'
      author.className = 'author'
      description.className = 'desc'
      
      //display in html
      bookDescDiv.appendChild(bookTitle);
      bookDescDiv.appendChild(author);
      bookDescDiv.appendChild(description);
      bookCard.appendChild(bookImage);
      bookCard.appendChild(bookDescDiv);

      bookContainer.appendChild(bookCard);
    });
  } catch(error) {
    console.error('Error loading books:', error);
  }
};

displayBooks();
