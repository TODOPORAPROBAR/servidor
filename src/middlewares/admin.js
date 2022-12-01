const isAdmin = (req, res, next) => {
    if(req.user.role !== "admin_user"){
        return res.status(400).json({
            msg:"No es administrador. No posee autorización"
        })
    }
    next();
}




module.exports = isAdmin;