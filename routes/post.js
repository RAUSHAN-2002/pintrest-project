const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the post
const postSchema = new Schema({
    imageText: {
        type: String,
        required: true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    image:{
     type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

// Create the Post model using the schema
module.exports = mongoose.model('Post', postSchema);

// const mongoose = require("mongoose");
// const plm = require("passport-local-mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/testingdata").then(function(){
//   console.log("database connected")
// })


// const userSchema = mongoose.Schema({
//   username:String,
//   password:String,
//   secret:String
// })
// userSchema.plugin(plm);

// module.exports = mongoose.model("user",userSchema)




// users database.
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const plm = require("passport-local-mongoose")

// mongoose.connect("mongodb://127.0.0:27017/pintrestdatauser").then(function(){
//     console.log("database connected")
// });


// // Define the schema for the user
// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     posts: [{
//        type:mongoose.Schema.Types.ObjectId,
//        ref:'Post'
//     }],
//     dp: String, // Assuming dp is for profile picture
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     fullName: {
//         type: String,
//         required: true
//     }
// });

//     userSchema.plugin(plm);
// // Create the User model using the schema
// module.exports = mongoose.model('user',userSchema)

 