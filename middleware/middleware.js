import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Session is expired, Login again" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(400).json({ message: "token not found" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
