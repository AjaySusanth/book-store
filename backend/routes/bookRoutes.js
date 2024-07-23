import express from 'express'
import { Books } from '../models/bookModel.js'

const router = express.Router()

//handling cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Create new book

router.post('/',async (req,res)=>{
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

router.get('/',async (req,res)=>{
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

router.get('/:id',async (req,res)=>{
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

router.put('/:id',async (req,res)=>{
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

router.delete('/:id',async (req,res)=>{
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
export default router