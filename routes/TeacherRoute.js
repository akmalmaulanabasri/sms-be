const express = require("express");
const router = express();

const TeacherController = require("../controllers/TeacherController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/teachers", TeacherController.index);
router.get("/api/teachers/:id", TeacherController.show);
router.post("/api/teachers", jwtAuthMiddleware(), TeacherController.store);
router.put("/api/teachers/:id", jwtAuthMiddleware(), TeacherController.update);
router.delete(
  "/api/teachers/:id",
  jwtAuthMiddleware(),
  TeacherController.destroy
);

module.exports = router;
