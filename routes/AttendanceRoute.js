const express = require("express");
const router = express();

const AttendanceController = require("../controllers/AttendanceController");
const AttendanceRecordController = require("../controllers/AttendanceRecordController");
const AttendanceDeviceController = require("../controllers/AttendanceDeviceController");
const { jwtAuthMiddleware } = require("../services/Passport");

// attendance
router.get("/api/attendance", AttendanceController.index);
router.get("/api/attendance/:id", AttendanceController.show);
router.post("/api/attendance", jwtAuthMiddleware(), AttendanceController.store);
router.put(
  "/api/attendance/:id",
  jwtAuthMiddleware(),
  AttendanceController.update
);
router.delete(
  "/api/attendance/:id",
  jwtAuthMiddleware(),
  AttendanceController.destroy
);

// attendance records
router.get(
  "/api/attendance/:attendance_id/records",
  AttendanceRecordController.index
);
router.post(
  "/api/attendance/:attendance_id/records",
  jwtAuthMiddleware(),
  AttendanceRecordController.store
);
router.get("/api/attendance/records/:id", AttendanceRecordController.show);
router.put(
  "/api/attendance/records/:id",
  jwtAuthMiddleware(),
  AttendanceRecordController.update
);

// devices
router.get("/api/attendance/devices", AttendanceDeviceController.index);
router.post(
  "/api/attendance/devices",
  jwtAuthMiddleware(),
  AttendanceDeviceController.store
);
router.get("/api/attendance/devices/:id", AttendanceDeviceController.show);
router.put(
  "/api/attendance/devices/:id",
  jwtAuthMiddleware(),
  AttendanceDeviceController.update
);
router.delete(
  "/api/attendance/devices/:id",
  jwtAuthMiddleware(),
  AttendanceDeviceController.destroy
);

module.exports = router;
