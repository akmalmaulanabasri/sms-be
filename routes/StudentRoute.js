const express = require("express");
const router = express();

const StudentController = require("../controllers/StudentController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/students", StudentController.index);
router.get("/api/students/:id", StudentController.show);
router.post("/api/students", jwtAuthMiddleware(), StudentController.store);
router.put("/api/students/:id", jwtAuthMiddleware(), StudentController.update);
router.delete(
  "/api/students/:id",
  jwtAuthMiddleware(),
  StudentController.destroy
);

module.exports = router;
