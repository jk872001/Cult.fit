const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/registerationcult")
.then(()=>console.log("connection successful"))
.catch((err)=>console.log(err));

