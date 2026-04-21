import express from 'express';


const app = express();
const PORT = 3000;
app.use(express.json());

app.post('/api/books',(req,res)=>{

    const {title,author,description,imageSrc} = req.body;
    console.log({title,author,description,imageSrc});

    try {
        
        
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
    
})



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})