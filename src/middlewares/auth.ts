import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET as string;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization as string;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decode = jwt.verify(token, tokenSecret);
      next();
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (err) {
    res.status(401);
    res.json(`Invalid authorization. Error: ${err}`);
  }
};

export default verifyAuthToken;
