import { Router } from "express";
import errorHandler from "express-async-handler";
import clientController from "./ClientController";
import isClient from "../../middleware/isClient";
import { IsAuth } from "../../middleware";

const router = Router();

router.post("/", errorHandler(clientController.createClient));
router.get("/", errorHandler(clientController.getAllClients));
router.get("/:id", errorHandler(clientController.getClient));
router.patch("/:id", errorHandler(clientController.updateClient));
router.delete("/:id", errorHandler(clientController.deleteClient));
router.get(
  "/fetch/favorites",
  IsAuth,
  isClient,
  errorHandler(clientController.getFavoriteProperties)
);
router.post(
  "/add/favorite",
  IsAuth,
  isClient,
  errorHandler(clientController.addToFavorites)
);
router.delete(
  "/remove/favorite",
  IsAuth,
  isClient,
  errorHandler(clientController.removeFromFavorites)
);
router.post(
  "/reserve",
  IsAuth,
  isClient,
  errorHandler(clientController.reserveProperty)
);
router.post(
  "/rent",
  IsAuth,
  isClient,
  errorHandler(clientController.rentRequest)
);

export default router;
