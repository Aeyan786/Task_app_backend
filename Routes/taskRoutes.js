import express from "express"
import { createTask, deleteTask, getAllTasks, getSingleTask, updateStatus, updateTask } from "../Controllers/taskController.js"
import { authentication } from "../middleware/middleware.js"

const router = express.Router()

router.route("/create").post(authentication,createTask)
router.route("/update/:id").put(authentication,updateTask)
router.route("/delete/:id").delete(authentication,deleteTask)
router.route("/getsingletask/:id").get(authentication,getSingleTask)
router.route("/updatestatus/:id").post(authentication,updateStatus)
router.route("/gettask").get(authentication,getAllTasks)

export default router
