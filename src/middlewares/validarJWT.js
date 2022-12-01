
const jwt = require("jsonwebtoken")
const User = require("../models/USER")

const validarJWT = async (req, res, next) => {
    
    let token = req.headers.authorization;

    // VERIFICAR SI EXISTE EL TOKEN EN LA PETICIÓN
    if (!token) {
        return res.status(400).json({
            msg: "No existe el token en la petición"
        })
    };


    try {
        //COMPROBAR QUE EL TOKEN SEA VÁLIDO
        //SI ES VÁLIDO, DE OBTIENE EL ID DEL USUARIO

        const { uid } = await jwt.verify(token, process.env.SECRET)
        
        //BUSCAR EL USUARIO EN LA BASE DE DATOS
        const usuario = await User.findById(uid)

        if (!usuario) {
            return res.status(400).json({
                msg: "El token no es válido. Este usuario no existe en la base de datos"
            });
        }

        // VERIFICAR SI EL USUARIO ESTÁ ACTIVO
        if (!usuario.isActive) {
            return res.status(400).json({
                msg: "El token no es válido. Este usuario no está activo"
            });
        }

        //AGREGAR LA INFO DEL USUARIO AL REQ PARA QUE SE LA PUEDA UTILIZAR EN LOS DEMÁS MIDDLEWARES
        req.user = usuario;

        //SE CONTINÚA LA EJECUCIÓN DE LA PETICIÓN
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "El token no es válido"
        })
    }
}

module.exports = validarJWT