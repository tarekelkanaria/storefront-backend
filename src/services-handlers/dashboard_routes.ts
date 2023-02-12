import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import verifyAuthToken from "../middlewares/auth";

const store = new DashboardQueries();

const fivePopularProducts = async (req: Request, res: Response) => {
  try {
    const products = await store.fivePopularProducts();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboard_Routes = (app: express.Application) => {
  app.get("/products/most-popular", fivePopularProducts);
  app.get("/users/:id/orders", verifyAuthToken, currentOrders);
  app.get("/users/:id/completed-orders", verifyAuthToken, completedOrders);
};

export default dashboard_Routes;
