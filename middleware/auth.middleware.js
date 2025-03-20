const jwt = require("jsonwebtoken")
exports.protectedRoute = (req, res, next) => {
    try {
        const token = req.cookies.USER
        if(!token) {
            return res.status(401).json({message: "no cookie found"})
        }
        jwt.verify(token, process.env.JWT_KEY, (err,data) => {
            if (err) {
                return res.status(401).json({message: "invalid token"})
            }
            req.user = data._id
            next()
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `server error`, error: error.message})
        
    }
}