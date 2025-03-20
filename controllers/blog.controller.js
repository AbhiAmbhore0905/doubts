const Blog = require("../models/Blog")
const Upload = require("../utils/Upload")
const cloud = require("cloudinary").v2
const path = require("path")

cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
exports.createBlog = async (req, res) => {
    try {
        Upload(req, res, async (err) => {
            if(err) {
                console.log(err)
                return res.status(400).json({message: " unable to upload", error: err.message})
            }

            const {secure_url} = await cloud.uploader.upload(req.file.path) 
            await Blog.create({...req.body, hero:secure_url, user: req.user})
            console.log(req.body)

            res.json({message : " blog create success"})
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error",
            error: error.message
        })
        
    }
}
exports.getBlog = async (req, res) => {
    try {
        const result = await Blog.find({user: req.user})
        res.json({message: " fetch success", result})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to get blog",
            error: error.message
        })
        
    }
}
exports.updateBlog = (req, res) => {
    try {
        Upload(req, res, async (err) => {
            const {tid} = req.params
            if (req.file) {
                const result = await Blog.findById(tid)
                await cloud.uploader.destroy(path.basename(result.hero).split(".")[0])

                const {secure_url} = await cloud.uploader.upload(req.file.path)
                await Blog.findByIdAndUpdate(tid, {...req.body, hero: secure_url})
            }else {
                await Blog.findByIdAndUpdate(tid, req.body)
                res.json({message: " blog update success"})
            }
       })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to update blog",
            error: error.message
        })
        
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        const {tid} = req.params
        const result = await Blog.findById(tid)
        await cloud.uploader.destroy(path.basename(result.hero).split(".")[0])
        await Blog.findByIdAndDelete(tid)
        res.json({message: " delete blog success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to delete blog",
            error: error.message
        })
        
    }
}