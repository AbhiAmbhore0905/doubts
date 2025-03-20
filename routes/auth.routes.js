const auth = require("../controllers/auth.controller")
const { protectedRoute } = require("../middleware/auth.middleware")
const router = require("express").Router()

router
.post("/register", auth.register)
.post("/login", auth.login)
.post("/loginwithotp", auth.loginwithOtp)
.post("/sendOtp", auth.sendOtp)
.post("/logout", auth.logout)
.get("/users",protectedRoute, auth.allUsers)
.post("/oauth", auth.loginwithGoogle)

module.exports = router