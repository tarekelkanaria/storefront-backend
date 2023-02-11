import { User, UserStore } from "../models/user";
import express, { Request, Response } from "express";
import verifyAuthToken from "../middlewares/auth";
import jwt from "jsonwebtoken";

const store = new UserStore();
const tokenSecret = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} ${user}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user = {
    first_name: req.body.first_name,
    password_digest: req.body.password_digest,
  };
  try {
    const verfied = await store.authenticate(
      user.first_name,
      user.password_digest
    );
    const token = jwt.sign({ user: verfied }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(`${err} ${user}`);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest,
  };
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, tokenSecret);
      // @ts-ignore
      if (decoded.id !== user.id) {
        throw new Error("User id does not match!");
      }
    } else {
      throw new Error("Unvalid authorization");
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
  try {
    const updated = await store.update(user);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(`${err} ${user}`);
  }
};

const remove = async (req: Request, res: Response) => {
  const user = await store.delete(req.params.id);
  res.json(user);
};

const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", verifyAuthToken, create);
  app.put("/users/:id", update);
  app.delete("/users/:id", verifyAuthToken, remove);
  app.post("/users/:id/auth", authenticate);
};

export default user_routes;
