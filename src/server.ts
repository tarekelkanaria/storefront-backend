import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import product_routes from "./handlers/product_routes";
import user_routes from "./handlers/user_routes";
import order_routes from "./handlers/order_routes";
import dashboard_Routes from "./services-handlers/dashboard_routes";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors());

app.use(bodyParser.json());

product_routes(app);

user_routes(app);

order_routes(app);

dashboard_Routes(app);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
