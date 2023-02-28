const express = require('express');
const Route = express.Router();
const AccountController = require('../Controller/AccountController')
const MiddleWare = require('../Middleware/MiddleWare');
const multer = require('multer')

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'Uploads')
        },
        filename: function (req, file, cb) {
          const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
          req.body.profile_path = filename
          cb(null, filename)
        }
})
      
const upload = multer({ storage: storage })

Route.post('/register',upload.single('image'),AccountController.register);
Route.get('/alluser',MiddleWare,AccountController.allUser);
Route.post('/login',MiddleWare,AccountController.login);
Route.get('/getuser/:id',MiddleWare,AccountController.searchByid);
Route.delete('/deleteuser/:id',MiddleWare,AccountController.deleteUser);
Route.put('/updateuser/:id',MiddleWare,AccountController.updateUser);

module.exports = Route;