const express = require("express");

const {
  createBooking,
  getOrganizerBookings,
  getOrganizerBookingById,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Customer creates a booking
router.post(
  "/",
  protect,
  authorize("customer"),
  createBooking
);

// Organizer views bookings for their own events
router.get(
  "/organizer",
  protect,
  authorize("organizer"),
  getOrganizerBookings
);

// Organizer views one booking's details
router.get(
  "/organizer/:id",
  protect,
  authorize("organizer"),
  getOrganizerBookingById
);

module.exports = router;