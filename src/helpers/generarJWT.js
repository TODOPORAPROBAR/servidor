const jwt = require("jsonwebtoken");

const generarJWT = (uid)=>{
    
    return new Promise((resolve, reject) => {
        // GENERAR EL TOKEN CON EL ID DEL USUARIO Y EL SECRET
        jwt.sign(uid,process.env.SECRET,{
            expiresIn: "24h"
        }, (err, token) =>{
            console.log(process.env.SECRET)
            if(err){
                reject("Error al generar el token");
            }

            resolve(token);
        })
    })
    
}




module.exports = generarJWT;