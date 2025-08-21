const mongoose = require("mongoose")

const Userschema = mongoose.Schema({
    fname : {
        type: String,
        require: true
    },
    lname : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    }
})

const User = mongoose.model("User", Userschema)
module.exports = User
