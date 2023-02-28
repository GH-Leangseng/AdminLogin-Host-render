const express = require('express');
const App = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const path = require('path')
App.use(express.static(path.join(__dirname,'../Uploads'))) //use with satic is mean we can access in browser
App.use(bodyParser.json());
App.use(express.json());
App.use(cors());
require('../dbConnect/ConnectMG')
const AuthAccount  = require('../Route/AuthAccount')
dotenv.config();
App.listen(process.env.PORT , ()=>{
        console.log("Now we Open port 9000")
})

App.use('/auth',AuthAccount);