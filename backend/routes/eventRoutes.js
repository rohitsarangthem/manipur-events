const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  approveEvent,
  rejectEvent,
  getAllEventsForAdmin,
  getMyEvents,
  getOrganizerDashboard,
  getMyEventById,
  updateMyEvent
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


router.get(
  "/organizer/my-events",
  protect,
  authorize("organizer"),
  getMyEvents
);

// Organizer - get single event
router.get(
  "/organizer/my-events/:id",
  protect,
  authorize("organizer"),
  getMyEventById
);


// =====================================
// ORGANIZER DASHBOARD
// =====================================

router.get(
  "/organizer/dashboard",
  protect,
  authorize("organizer"),
  getOrganizerDashboard
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

// Organizer - update own event
router.put(
  "/organizer/my-events/:id",
  protect,
  authorize("organizer"),
  updateMyEvent
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