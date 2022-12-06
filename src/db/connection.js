const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
      await mongoose.connect('mongodb+srv://m001-student:formosa2021@ipf2022.co4jpdm.mongodb.net/proyectito?retryWrites=true&w=majority')
        console.log("Conexión a la base de datos exitosa")
        
    } catch (error) {
    console.log("Error en la conexión a la base de datos" + error)   
    }
}

module.exports = connectDB