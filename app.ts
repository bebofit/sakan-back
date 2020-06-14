import cors from "cors";
import express, { NextFunction, Response } from "express";
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from "http-status";
import logger from "morgan";
import routes from "./api";
import { IRequest } from "./Interfaces";
import tasks from "./tasks/base/TaskBootstrap";
import { isDeployed, isTesting, isProduction } from "./config";

const app = express();
//configure app
if (isDeployed) {
  // Trust the proxy to give us the correct client IP address as we are behind AWS ELB not front facing the client
  app.set("trust proxy", true);
}
if (!isTesting) {
  app.use(logger(isDeployed ? "combined" : "dev"));
}
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/api", routes);

app.use((err: any, req: IRequest, res: Response, next: NextFunction) => {
  console.log("error express middleware block reached");
  if (!isProduction) {
    console.error(err);
  }
  if (err.validationError) {
    console.log("validation error", err.errors.details[0].message);
    return res.status(UNPROCESSABLE_ENTITY).json({
      data: null,
      message:
        err.errors.details[0].message.replace(/"/g, "") || err.message || err
    });
  }
  console.log("general error", err);
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    data: null,
    message: err.message || err
  });
});

tasks.bootstrap();

export default app;
