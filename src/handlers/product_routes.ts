import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import verifyAuthToken from "../middlewares/auth";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.update({
      id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.productsByCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const remove = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    await store.delete(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.put("/products/:id", verifyAuthToken, update);
  app.delete("/products/:id", verifyAuthToken, remove);
  app.get("/products/category/:category", productsByCategory);
};

export default product_routes;
