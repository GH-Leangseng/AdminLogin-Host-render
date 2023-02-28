const Accounts = require('../Model/Account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccountController = {
        register : async (req,res)=>{
                const {email , password , profile_path} = req.body;
                try {
                        const salt = await bcrypt.genSalt();
                        const hashPw = await bcrypt.hash(password,salt);
                        const data = {email,password:hashPw , profile_path}
                        const userRegister = new Accounts(data);
                        await userRegister.save(); //for include to database
                        res.json({userRegister,"default " :password});
                } catch (error) {
                        return res.json(error.message);
                }
        },
        allUser: async (req,res)=>{
                const alluser = await Accounts.find();
                return res.json(alluser);
        },
        login: async (req,res)=>{
                const { email , password }  = req.body;
                try {
                        const LoginAccount = await Accounts.find({email});
                        const token = createToken(LoginAccount);
                        if(!LoginAccount) return res.json({message : "email invalid data ..."});
                        const compare = bcrypt.compare(password , LoginAccount.password);
                        if(!compare) return res.status(401).json({message : "Password not incorrect 😢 "});
                        return res.status(200).json({
                                LoginAccount,
                                token,
                                message: "Login success "
                        })
                } catch (error) {
                      return res.status(401).json({message:"email invalid data ..."});  
                }
        },
        searchByid : async (req,res)=>{
                const id = req.params.id;
                try {
                        const searchById = await Accounts.findById(id);
                        if(!searchById.status == 200){
                                return res.status(401).json({message : "Erorr"})
                        }
                        res.status(200).json(searchById);
                } catch (error) {
                        return res.json(error.message);
                }

        },
        deleteUser: async(req,res)=>{
                const id = req.params.id;
                try {
                        const searchById = await Accounts.findByIdAndRemove(id);
                        if(!searchById.status == 200){
                                return res.status(401).json({message : "Erorr"})
                        }
                        res.status(200).json({message : "Remove data succes in database : " + id});
                } catch (error) {
                        return res.json(error.message);
                }
        },
        updateUser:async(req,res)=>{
                const id = req.params.id;
                const {email, password} = req.body;
                const data = {
                        email,password
                }

                try {
                        await Accounts.findByIdAndUpdate({_id : id},data);
                        const update = await Accounts.findById(id);
                        res.json(update);
                } catch (error) {
                        return res.json(error.message);
                }
        }
}

function createToken(user){
        return jwt.sign({
                data: user
        },process.env.SCRIPT_TOKEN,{expiresIn : '24H'})
}

module.exports = AccountController;