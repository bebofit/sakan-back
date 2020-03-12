import { Router } from "express";
import errorHandler from "express-async-handler";
import { IsAuth } from "../../middleware";
import AdminController from "./AdminController";
import isAdmin from "../../middleware/isAdmin";

const router = Router();

router.post("/login", errorHandler(AdminController.login));
router.post(
  "/property/rent/req",
  IsAuth,
  isAdmin,
  errorHandler(AdminController.respondToRentRequest)
);
router.post(
  "/property/add/req",
  IsAuth,
  isAdmin,
  errorHandler(AdminController.respondToAddRequest)
);
router.get(
  "/property/requests",
  IsAuth,
  isAdmin,
  errorHandler(AdminController.getPropertyRequests)
);
router.get(
  "/rent/requests",
  IsAuth,
  isAdmin,
  errorHandler(AdminController.getRentBuyRequests)
);
export default router;
