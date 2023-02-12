import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyAuthToken from "../middlewares/auth";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.create({
      status: req.body.status,
      user_id: req.body.user_id,
    });
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.create({
      id: parseInt(req.params.id),
      status: req.body.status,
      user_id: req.body.user_id,
    });
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const order = await store.delete(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const quantity = parseInt(req.body.quantity);
  const order_id = parseInt(req.params.id);
  const product_id = parseInt(req.body.product_id);

  try {
    const addedProduct = await store.addProduct(quantity, order_id, product_id);

    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, remove);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

export default order_routes;
