const express = require("express");
const router = express();

const GradeController = require("../controllers/GradeController");
const ReportController = require("../controllers/ReportController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/grades", GradeController.index);
router.get("/api/grades/:id", GradeController.show);
router.post("/api/grades", jwtAuthMiddleware(), GradeController.store);
router.put("/api/grades/:id", jwtAuthMiddleware(), GradeController.update);
router.delete("/api/grades/:id", jwtAuthMiddleware(), GradeController.destroy);

router.get("/api/reports", ReportController.index);
router.get("/api/reports/:id", ReportController.show);
router.post("/api/reports", jwtAuthMiddleware(), ReportController.store);
router.put("/api/reports/:id", jwtAuthMiddleware(), ReportController.update);
router.delete(
  "/api/reports/:id",
  jwtAuthMiddleware(),
  ReportController.destroy
);

module.exports = router;
