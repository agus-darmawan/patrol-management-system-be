import express, { Application, Request, Response } from "express";
import { notFoundHandler } from "./middlewares/error.middleware";
import promClient from "prom-client";
import helmet from "helmet";
import v1Routes from "./routes/index";
import cors from "cors";
import corsOptions from "./config/cors";

const app: Application = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

app.use("/api", v1Routes);
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API",
    version: "1.0.0",
  });
});
app.use(notFoundHandler);

export default app;
