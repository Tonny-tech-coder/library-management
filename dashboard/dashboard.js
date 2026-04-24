const model = document.getElementById("model");
const addBookbtn = document.getElementById("add-book-btn");
const closebtn = document.getElementById("close-model ");
const savebooksbtn =document.getElementById("add-book") 


const API_BASE = 'http://localhost:3000';

// ui events
addBookbtn.addEventListener('click',()=>{
    model.style.display = "flex";
})

closebtn.addEventListener('click', ()=>{
    model.style.display = "none";
})      


//display books
const displayBooks = async () => {
    try {

        const response = await fetch(`${API_BASE}/books`);
} catch (error) {
        console.error('Error in getting data:', error);
        return;
    }
     const books = await response.json();
     console.log({books});
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


        savebooksbtn.addEventListener('click', handleBookSubmit);

        document.addEventListener('DOMContentLoaded',displayBooks);

    } catch (error) {
        console.error(error);
    }

}