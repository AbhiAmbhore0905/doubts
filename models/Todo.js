const mongoose = require("mongoose")

module.exports = mongoose.model("todo", new mongoose.Schema({ 
    task: {type: String, required: true},
    desc: {type: String, required: true},
    complete: {type: Boolean, default: true}
}, {timestamps: true }))

// timestams: true => createdAt and updateAt