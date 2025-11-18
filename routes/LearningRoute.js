const express = require("express");
const router = express();

const LearningMaterialController = require("../controllers/LearningMaterialController");
const TaskController = require("../controllers/TaskController");
const TaskSubmissionController = require("../controllers/TaskSubmissionController");
const { jwtAuthMiddleware } = require("../services/Passport");

// materials
router.get("/api/materials", LearningMaterialController.index);
router.get("/api/materials/:id", LearningMaterialController.show);
router.post(
  "/api/materials",
  jwtAuthMiddleware(),
  LearningMaterialController.store
);
router.put(
  "/api/materials/:id",
  jwtAuthMiddleware(),
  LearningMaterialController.update
);
router.delete(
  "/api/materials/:id",
  jwtAuthMiddleware(),
  LearningMaterialController.destroy
);

// tasks
router.get("/api/tasks", TaskController.index);
router.get("/api/tasks/:id", TaskController.show);
router.post("/api/tasks", jwtAuthMiddleware(), TaskController.store);
router.put("/api/tasks/:id", jwtAuthMiddleware(), TaskController.update);
router.delete("/api/tasks/:id", jwtAuthMiddleware(), TaskController.destroy);

// submissions
router.get("/api/tasks/:task_id/submissions", TaskSubmissionController.index);
router.post(
  "/api/tasks/:task_id/submit",
  jwtAuthMiddleware(),
  TaskSubmissionController.store
);
router.get("/api/submissions/:id", TaskSubmissionController.show);
router.put(
  "/api/submissions/:id",
  jwtAuthMiddleware(),
  TaskSubmissionController.update
);

module.exports = router;
