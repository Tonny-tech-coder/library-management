import express from 'express';
import { db } from './config/db.js';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(express.json());


app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.post('/api/books', (req, res) => {

    const { name, author, description, image } = req.body;


    if (!name || !author || !description || !image) {
        console.log('all fields are requried');
        return res.status(400).json('all fields are requried');
    }


    try {
        const query = `INSERT INTO books(name,author,description,image) VALUES (?,?,?,?)`;
        db.run(query, [name, author, description, image], (err) => {
            if (err) {
                return console.log('error adding book', err);
            } else {

                return res.status(201).json({ message: 'book added successfully' });
                alert("added seccufully")
            }
        })
        console.log({ name, author, description, image });

    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }

})


app.get('/api/books', (req, res) => {
    const query = `SELECT * FROM books`
    db.all(query, (err, rows) => {
        if (err) {
            console.log('error  in getting books', err);
            return res.status(500).json(rows);
        } else {
            return res.status(200).json(rows);
        }
    });


})



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);

})