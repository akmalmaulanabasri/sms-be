const express = require("express");
const router = express();

const UserRouter = require("../controllers/UserController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.post("/api/login", UserRouter.login);
router.post("/api/register", UserRouter.register);
router.post("/api/logout", jwtAuthMiddleware(), UserRouter.logout);
router.get("/api/auth/me", jwtAuthMiddleware(), UserRouter.checkAuth);

module.exports = router;
