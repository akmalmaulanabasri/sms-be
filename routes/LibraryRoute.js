const express = require("express");
const router = express();

const LibraryBookController = require("../controllers/LibraryBookController");
const LibraryLoanController = require("../controllers/LibraryLoanController");
const { jwtAuthMiddleware } = require("../services/Passport");

router.get("/api/library/books", LibraryBookController.index);
router.post(
  "/api/library/books",
  jwtAuthMiddleware(),
  LibraryBookController.store
);
router.get("/api/library/books/:id", LibraryBookController.show);
router.put(
  "/api/library/books/:id",
  jwtAuthMiddleware(),
  LibraryBookController.update
);
router.delete(
  "/api/library/books/:id",
  jwtAuthMiddleware(),
  LibraryBookController.destroy
);

router.post(
  "/api/library/loans",
  jwtAuthMiddleware(),
  LibraryLoanController.store
);
router.get("/api/library/loans", LibraryLoanController.index);
router.get("/api/library/loans/:id", LibraryLoanController.show);
router.put(
  "/api/library/loans/:id",
  jwtAuthMiddleware(),
  LibraryLoanController.update
);

module.exports = router;
