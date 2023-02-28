const mongoose = require('mongoose'); 
require('dotenv').config(); //use it becuase we use process.env.URL_DB under
mongoose.set('strictQuery',true);
mongoose.connect(
        process.env.URL_DB
).then(()=>{
        console.log("=======> connect db succes ! 😘 😘 😘")
}).catch((e)=>{
        console.log(e.message)
})

module.exports = mongoose;