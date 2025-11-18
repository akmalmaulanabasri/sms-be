const express = require("express");
const router = express();

const SubjectController = require("../controllers/SubjectController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/subjects", SubjectController.index);
router.get("/api/subjects/:id", SubjectController.show);
router.post("/api/subjects", jwtAuthMiddleware(), SubjectController.store);
router.put("/api/subjects/:id", jwtAuthMiddleware(), SubjectController.update);
router.delete(
  "/api/subjects/:id",
  jwtAuthMiddleware(),
  SubjectController.destroy
);

module.exports = router;
