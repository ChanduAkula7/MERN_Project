import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import Book from './Model/Model.js';
// import { json } from 'body-parser';

const app=express();
app.use(cors());
app.use(express.json());

const url="mongodb+srv://chandufulstack:chandufulstack123@cluster0.0scj5v1.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));

//Routes..

app.get('/books',async(req,res)=>{
    const data=await Book.find();
    // console.log(json(data))
    res.send(data);
})

app.post('/books/new',(req,res)=>{
    // console.log(req.body);
    const data=req.body;
    const newbook=new Book(data);
    newbook.save();
    res.status(200).send(newbook);
})

app.get('/books/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        // console.log(id);
        const data=await Book.findById(id);
        // console.log(data);
        res.send(data);;
    }
    catch(e){
        res.send(e);
    }
})

app.patch('/books/update/:id',async(req,res)=>{
    // console.log("enteriing");
    try{
        const id=req.params.id;
        const rdata=req.body;
        console.log(rdata);
        const data= await Book.findByIdAndUpdate({_id:id},{$set:rdata});
        console.log(data)
        // console.log(id);
        res.json(data);
    }
    catch(e){
        res.send(e);
    }
})

app.delete('/books/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await Book.findByIdAndDelete(id);
        res.send(data);
    }
    catch(e){
        res.send(e);
    }
})


const PORT=5000;
app.listen(PORT,()=>{
    console.log("Port is connected..");
})
