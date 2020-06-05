import { Router } from "express";
import errorHandler from "express-async-handler";
import userController from "./UserController";
import IsAuth from "../../middleware/isAuthenticated";

const router = Router();

router.post("/signup", errorHandler(userController.signup));
router.post("/login", errorHandler(userController.login));
router.post("/password/forget", errorHandler(userController.forgetPassword));
router.post("/password/reset", errorHandler(userController.resetPassword));
router.post("/email/verify", errorHandler(userController.verifyEmail));
router.get("/wallet", IsAuth, errorHandler(userController.getWalletValue));

export default router;
