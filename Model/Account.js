const Mongoose = require('mongoose');
const User = Mongoose.Schema({
        email : {
                type : String,
                require :true,
                unique: true
        },
        password : {
                type: String,
                require : true,
        },
        profile_path:{
                type : String,
                default:''
        }
},{timestamps:true})

module.exports = Mongoose.model("Accounts",User);