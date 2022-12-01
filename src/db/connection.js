const mongoose = require("mongoose")

const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Conexión a la base de datos exitosa")
        
    } catch (error) {
     console.log("Error en la conexión a la base de datos" + error)   
    }
}

module.exports = connectDB