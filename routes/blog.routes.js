const blog = require("../controllers/blog.controller")
const router = require("express").Router()

router
.get("/read", blog.getBlog)
.post("/create", blog.createBlog)
.patch("/update/:tid", blog.updateBlog)
.delete("/delete/:tid", blog.deleteBlog)

module.exports = router