const jwt = require('jsonwebtoken');
const checkVerifyToken = (req,res,next)=>{
        const header = req.headers['authorization'];
        const token  = header && header.split(" ")[1];
        if(!token){
                return res.status(401).json({message:"please input token "});
        }
        jwt.verify(token,process.env.SCRIPT_TOKEN,(err,user)=>{
                if(err) return res.status(401);
                req.user = user.data
                next();
        })

}

module.exports = checkVerifyToken;