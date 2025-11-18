const express = require("express");
const router = express();

const CurriculumController = require("../controllers/CurriculumController");
const CurriculumCompetencyController = require("../controllers/CurriculumCompetencyController");
const SyllabusController = require("../controllers/SyllabusController");
const RppDocumentController = require("../controllers/RppDocumentController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/curriculums", CurriculumController.index);
router.get("/api/curriculums/:id", CurriculumController.show);
router.post(
  "/api/curriculums",
  jwtAuthMiddleware(),
  CurriculumController.store
);
router.put(
  "/api/curriculums/:id",
  jwtAuthMiddleware(),
  CurriculumController.update
);
router.delete(
  "/api/curriculums/:id",
  jwtAuthMiddleware(),
  CurriculumController.destroy
);

// competencies
router.get(
  "/api/curriculums/:curriculum_id/competencies",
  CurriculumCompetencyController.index
);
router.post(
  "/api/curriculums/:curriculum_id/competencies",
  jwtAuthMiddleware(),
  CurriculumCompetencyController.store
);
router.get(
  "/api/curriculum-competencies/:id",
  CurriculumCompetencyController.show
);
router.put(
  "/api/curriculum-competencies/:id",
  jwtAuthMiddleware(),
  CurriculumCompetencyController.update
);
router.delete(
  "/api/curriculum-competencies/:id",
  jwtAuthMiddleware(),
  CurriculumCompetencyController.destroy
);

// syllabus & rpp
router.get("/api/syllabus", SyllabusController.index);
router.post("/api/syllabus", jwtAuthMiddleware(), SyllabusController.store);
router.get("/api/syllabus/:id", SyllabusController.show);
router.put("/api/syllabus/:id", jwtAuthMiddleware(), SyllabusController.update);
router.delete(
  "/api/syllabus/:id",
  jwtAuthMiddleware(),
  SyllabusController.destroy
);

router.get("/api/rpp", RppDocumentController.index);
router.post("/api/rpp", jwtAuthMiddleware(), RppDocumentController.store);
router.get("/api/rpp/:id", RppDocumentController.show);
router.put("/api/rpp/:id", jwtAuthMiddleware(), RppDocumentController.update);
router.delete(
  "/api/rpp/:id",
  jwtAuthMiddleware(),
  RppDocumentController.destroy
);

module.exports = router;
