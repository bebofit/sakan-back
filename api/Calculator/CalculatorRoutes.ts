import { Router } from "express";
import { IsAuth } from "../../middleware";
import isAdmin from "../../middleware/isAdmin";
import errorHandler from "express-async-handler";
import CalculatorController from "./CalculatorController";

const router = Router();

router.post(
  "/calc",
  // IsAuth,
  // isAdmin,
  errorHandler(CalculatorController.calculate)
);

export default router;
