const express = require("express");
const router = express();

const QuestionBankController = require("../controllers/QuestionBankController");
const QuestionController = require("../controllers/QuestionController");
const ExamController = require("../controllers/ExamController");
const ExamSessionController = require("../controllers/ExamSessionController");
const ExamResultController = require("../controllers/ExamResultController");
const { jwtAuthMiddleware } = require("../services/Passport");

// question banks
router.get("/api/question-banks", QuestionBankController.index);
router.get("/api/question-banks/:id", QuestionBankController.show);
router.post(
  "/api/question-banks",
  jwtAuthMiddleware(),
  QuestionBankController.store
);
router.put(
  "/api/question-banks/:id",
  jwtAuthMiddleware(),
  QuestionBankController.update
);
router.delete(
  "/api/question-banks/:id",
  jwtAuthMiddleware(),
  QuestionBankController.destroy
);

// questions
router.get("/api/questions", QuestionController.index);
router.get("/api/questions/:id", QuestionController.show);
router.post("/api/questions", jwtAuthMiddleware(), QuestionController.store);
router.put(
  "/api/questions/:id",
  jwtAuthMiddleware(),
  QuestionController.update
);
router.delete(
  "/api/questions/:id",
  jwtAuthMiddleware(),
  QuestionController.destroy
);

// exams
router.get("/api/exams", ExamController.index);
router.get("/api/exams/:id", ExamController.show);
router.post("/api/exams", jwtAuthMiddleware(), ExamController.store);
router.put("/api/exams/:id", jwtAuthMiddleware(), ExamController.update);
router.delete("/api/exams/:id", jwtAuthMiddleware(), ExamController.destroy);
router.post(
  "/api/exams/:id/start",
  jwtAuthMiddleware(),
  ExamSessionController.store
);
router.post(
  "/api/exams/:id/finish",
  jwtAuthMiddleware(),
  ExamSessionController.finish
);
router.get("/api/exams/:id/results", ExamResultController.index);

module.exports = router;
