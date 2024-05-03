const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
})
const User=mongoose.model("User",userSchema);
module.exports = User;