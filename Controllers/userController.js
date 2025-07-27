import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must contain 8 characters" });
      
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      fullName,
      email,
      password: encryptedPassword,
    });

    return res.status(200).json({
      message: "Signup successfull",
      userCreated,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res.status(400).json({ message: "Inavalid email or password" });
    }

    const comparePassword = await bcrypt.compare(password, isUser.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Inavalid email or password" });
    }

    // Token

    const tokenData = {
      userId: isUser._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: `Welcome back ${isUser?.fullName}`,
        isUser,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};
