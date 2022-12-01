const User =require("../models/USER")

const generarJWT=require("../helpers/generarJWT")
const bcrypt=require('bcrypt')

const CtrlAuth={}

CtrlAuth.iniciarSesion=async(req,res)=>{
const {username,password}=req.body

try {
    const user =await User.findOne({username});

    if (!user){
        return res.status(400).json({
            ok:false,
            msg:"Error de autenticación. Usuario no encontrado"
        })
    }
//VERIFICAR LA CONTRASEÑA
const validPassword=bcrypt.compareSync(password,user.password)

if (!validPassword){
    return res.status(400).json({
        msg:"Error de autenticación. Contraseña incorrecta"
    })
}


//GENERAR EL TOKEN
const token = await generarJWT({uid:user._id})


return res.status(200).json({
    token
})

} catch (error) {
    return res.json({
        message:"Error al iniciar sesion",
        error:error.message
    })
}

}



module.exports=CtrlAuth