const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  approveEvent,
  rejectEvent,
  getAllEventsForAdmin
} = require("../controllers/eventController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  authorize
} = require("../middleware/roleMiddleware");

const router = express.Router();

// =====================================
// ADMIN - GET ALL EVENTS
// =====================================

// =====================================
// PUBLIC ROUTES
// =====================================

// Get all approved events
router.get("/", getEvents);

// =====================================
// ADMIN - GET ALL EVENTS
// =====================================

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllEventsForAdmin
);


// Get single event
router.get("/:id", getEventById);


// =====================================
// ORGANIZER ROUTES
// =====================================

// Create event
router.post(
  "/",
  protect,
  authorize("organizer"),
  createEvent
);

// =====================================
// ADMIN ROUTES
// =====================================

// Approve event
router.put(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveEvent
);

// Reject event
router.put(
  "/:id/reject",
  protect,
  authorize("admin"),
  rejectEvent
);




module.exports = router;