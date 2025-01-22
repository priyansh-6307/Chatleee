
const mongoose=require("mongoose")


const messageschema= new mongoose.Schema(
    {
   user:Array,
   sender:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"user",
    required:true
   },
    message:{
        type:String,
        required:true
    }
},{timestamp:true})


const message= mongoose.model('Message',messageschema)
module.exports=message