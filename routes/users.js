const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/testingdataa").then(function(){
  console.log("database connected")
})


const userSchema = mongoose.Schema({
    username: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            posts: [{
               type:mongoose.Schema.Types.ObjectId,
               ref:'Post'
            }],
            dp: String, // Assuming dp is for profile picture
            email: {
                type: String,
                required: true,
                unique: true
            },
            fullName: {
                type: String,
                required: true
            }
})
userSchema.plugin(plm);

module.exports = mongoose.model("user",userSchema)

