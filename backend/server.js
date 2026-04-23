import express from 'express';
import {db} from './config/db.js';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(express.json());


app.use(cors({
    origin:'http://127.0.0.1:5500',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}));

app.post('/api/books',(req,res)=>{

    const {title,author,description,imageSrc} = req.body;


    if(!name || !description || !author || !price || !imageSrc){
        console.log('all fields are requried');
        return res.status(400).json('all fields are requried');
    }
    const query = `INSERT INTO books (name,description,author,price,imageSrc) VALUES (?,?,?,?,?)`
    db.run(query,[name, description ,author , price ,imageSrc],(err) =>{
        if(err){
            return console.log('error adding book',err);
    }else{
        return res.status(201).json({message:'book added successfully'});
    }
  })
    console.log({title,author,description,imageSrc});

    try {
        
        
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
    
})


app.get('/api/books',(req,res) =>{
    const query = `SELECT * FROM books`
    db.all(query,(err,rows) =>{
        if(err){
            console.log('error  in getting books',err);
        }else{
            res.json(rows);
        }
    })
})



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})