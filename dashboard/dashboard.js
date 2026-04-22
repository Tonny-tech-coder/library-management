
const addBook = document.getElementById('add-book')


const API_BASE = 'http://localhost:3000';

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
     Model.style.display = 'none';
     submitForm.reset();
        alert('data sent successfully');

    } catch (error) {
        console.error(error);
    }

}