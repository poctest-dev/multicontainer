const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
     name :{
         type: String ,
         required: true
     },
     email :{
        type: String ,
        required: true
    },
    password :{
        type: String ,
        required: true
    },

    confirmpassword: {
        type: String ,
        required: true
    }

})


//now we need to create collection

const Register = new mongoose.model('Register', userschema)

module.exports = Register