import mongoose from "mongoose";
import Task from "../Models/taskSchema.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.id;
    console.log(userId);
    

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    if (!userId) {
      return res.status(400).json({ message: "user not found" });
    }

    const taskExists = await Task.findOne({ title });
    if (taskExists) {
      return res.status(400).json({ message: "Task is already listed" });
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      status,
      userId,
    });

    return res.status(200).json({ message: "Task has been created", newTask });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate } = req.body;
    const updatedData = {
      title,
      description,
      dueDate,
    };
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Task has been updated", updatedTask });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedtask = await Task.findByIdAndDelete(taskId);
    return res
      .status(200)
      .json({ message: "Task has been deleted", deletedtask });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.id;
    console.log(userId);

    const allTasks = await Task.find({ userId: new mongoose.Types.ObjectId(userId) }) .populate("userId").sort({ createdAt: -1 });

    if (!allTasks) {
      return res.status(400).json({ message: "Tasks not found" });
    }
    return res.status(200).json({ message: "Tasks found", allTasks });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const singleTask = await Task.findById(taskId);
    if (!singleTask) {
      return res.status(200).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task found", singleTask });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;
    const updatedStatus = {
      status: status.toLowerCase(),
    };
    const newStatus = await Task.findByIdAndUpdate(taskId, updatedStatus, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Status has been updated", newStatus });
  } catch (error) {
    console.log(error);
  }
};
