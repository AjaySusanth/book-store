import { PORT,mongodbUrl } from './config.js'
import express from 'express'
import mongoose from 'mongoose'

import { Books } from './models/bookModel.js'

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(234).send('Testing')
})


// Create new book
app.post('/books',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            res.status(400).send({message:'Send all required fields'})
        }
        else{
            const newBook = {
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear,
            }
            const book = await Books.create(newBook)
            res.status(201).send(book)
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

// Fetch all books

app.get('/books',async (req,res)=>{
    try{
        const books = await Books.find({})

        res.status(200).send({
            count:books.length,
            data:books
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

// Fetch book by id

app.get('/books/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const book = await Books.findById(id)

        res.status(200).send(book)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

// Update book by id

app.put('/books/:id',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            res.status(400).send({message:'Send all required fields'})
        }
        else{
            const {id} = req.params
            const result = await Books.findByIdAndUpdate(id,req.body)
            if (!result){
                res.status(404).send({message:"Book not found"})
            }
            else{
                res.status(201).send({message:'Update successful'})
            }

        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})


// delete by id 

app.delete('/books/:id',async (req,res)=>{
    try{
            const {id} = req.params
            const result = await Books.findByIdAndDelete(id,req.body)
            if (!result){
                res.status(404).send({message:"Book not found"})
            }
            else{
                res.status(201).send({message:'Delete successful'})
            }
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})




mongoose.connect(mongodbUrl)
.then(()=>{
    console.log('Connected to db')
    app.listen(PORT,()=>{
        console.log('Server running')
    })
})
.catch((err)=>{
    console.log(err)
})




