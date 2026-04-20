const bookContainer = document.getElementById("book-container");

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age.",
    image: "./image/cover.jpg",
  },
  {
    id: 2,
    title: "The Great ",
    author: "F. Scott ",
    description: "The great book",
    image: "./image/cover.jpg",
  },
  {
    id: 3,
    title: "Gatsby",
    author: "Fitzgerald",
    description: "novel set in the Jazz Age.",
    image: "./image/cover.jpg",
  },
];

// function displayBooks() {}

{
  /* <div class="book-card">
                    <img src="./image/cover.jpg" alt="">
                    <div class="book-desc">
                        <h2 class="title">Book Title</h2>
                        <p class="author">Author: John Doe</p>
                        <!-- <p>Genre: Fiction</p> -->
                        <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat blanditiis aspernatur aut facilis animi alias corrupti assumenda nam vero, fugit, esse corporis dolores natus, praesentium dolorem consequatur qui repellendus suscipit.</p>
                    </div>
                </div> */
}

const displayBooks = () => {
  books.map((book, i) => {

    // create html element 
    const bookCard = document.createElement("div");
    const bookImage = document.createElement("img");

    const bookDescDiv = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const author = document.createElement("p");
    const description = document.createElement("p");

    // insert data
    bookImage.src = `${book.image}`;
    bookImage.alt = `${book.title} cover image`;
    bookTitle.textContent = `${book.title}`;
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
};

displayBooks();
