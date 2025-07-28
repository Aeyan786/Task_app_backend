import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    dueDate:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["completed", "pending"],
        default:"pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }

},{timestamps:true})

const Task = mongoose.model("Task", taskSchema)
export default Task