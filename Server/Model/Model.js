import mongoose from 'mongoose'

const BookSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },

    Author:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Rating:{
        type:Number,
        required:true,
    }
});

const Book=new mongoose.model("Book",BookSchema);

export default Book;