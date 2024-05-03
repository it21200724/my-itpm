const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const supplierSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    products:{
        type:String,
        required:true
    }
    
})
const Supplier=mongoose.model("Supplier",supplierSchema);
module.exports = Supplier;