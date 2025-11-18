const express = require("express");
const router = express();

const ClassController = require("../controllers/ClassController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/classes", ClassController.index);
router.get("/api/classes/:id", ClassController.show);
router.post("/api/classes", jwtAuthMiddleware(), ClassController.store);
router.put("/api/classes/:id", jwtAuthMiddleware(), ClassController.update);
router.delete("/api/classes/:id", jwtAuthMiddleware(), ClassController.destroy);

module.exports = router;
