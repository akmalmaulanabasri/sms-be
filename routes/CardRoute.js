const express = require("express");
const router = express();

const StudentCardController = require("../controllers/StudentCardController");
const CardTransactionController = require("../controllers/CardTransactionController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/cards", StudentCardController.index);
router.get("/api/cards/:id", StudentCardController.show);
router.post("/api/cards", jwtAuthMiddleware(), StudentCardController.store);
router.put("/api/cards/:id", jwtAuthMiddleware(), StudentCardController.update);
router.delete(
  "/api/cards/:id",
  jwtAuthMiddleware(),
  StudentCardController.destroy
);

router.get("/api/cards/:card_id/transactions", CardTransactionController.index);
router.post(
  "/api/cards/:card_id/transactions",
  jwtAuthMiddleware(),
  CardTransactionController.store
);
router.get("/api/card-transactions/:id", CardTransactionController.show);

module.exports = router;
