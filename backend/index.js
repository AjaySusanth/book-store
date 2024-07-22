import { PORT,mongodbUrl } from './config.js'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js'
import { Books } from './models/bookModel.js'

const app = express()
app.use(express.json())

app.use('/books',bookRoutes)

/*
app.use(cors({
    origin:'http://localhost:5555/',
    method:['GET','POST','PUT','DELETE'],
    allowHeaders:['Content-Type']
}))
    */

app.get('/',(req,res)=>{
    res.status(234).send('Testing')
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