const express = require("express");
const router = express();

const BillingController = require("../controllers/BillingController");
const PaymentController = require("../controllers/PaymentController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/billings", BillingController.index);
router.get("/api/billings/:id", BillingController.show);
router.post("/api/billings", jwtAuthMiddleware(), BillingController.store);
router.put("/api/billings/:id", jwtAuthMiddleware(), BillingController.update);
router.delete(
  "/api/billings/:id",
  jwtAuthMiddleware(),
  BillingController.destroy
);

router.post("/api/payments", jwtAuthMiddleware(), PaymentController.store);
router.get("/api/payments", PaymentController.index);
router.get("/api/payments/:id", PaymentController.show);

module.exports = router;
