const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Event = require("../models/Event");

// Generate a readable booking reference
function generateBookingReference() {
  return `ME-${Date.now()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

// Safely get the logged-in user's ID
function getUserId(req) {
  return req.user?.id || req.user?._id || req.user?.userId;
}

// =====================================
// CUSTOMER: CREATE BOOKING
// =====================================

exports.createBooking = async (req, res) => {
  let reservedEventId = null;
  let reservedQuantity = 0;

  try {
    const customerId = getUserId(req);
    const { eventId, quantity, ticketType } = req.body;

    if (!customerId) {
      return res.status(401).json({
        message: "Please log in to book tickets.",
      });
    }

    if (!mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID.",
      });
    }

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: "Ticket quantity must be at least 1.",
      });
    }

    const selectedTicketType =
      ticketType || "General Admission";

    if (
      !["General Admission", "VIP Ticket"].includes(
        selectedTicketType
      )
    ) {
      return res.status(400).json({
        message: "Invalid ticket type.",
      });
    }

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        status: "approved",
        availableTickets: { $gte: qty },
      },
      {
        $inc: { availableTickets: -qty },
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message:
          "Event is unavailable or there are not enough tickets.",
      });
    }

    reservedEventId = event._id;
    reservedQuantity = qty;

    // Uses the event's configured ticket price.
    // Separate VIP pricing can be added to the Event model later.
    const unitPrice = event.ticketPrice;
    const totalAmount = unitPrice * qty;

    const booking = await Booking.create({
      bookingReference: generateBookingReference(),
      customer: customerId,
      event: event._id,
      ticketType: selectedTicketType,
      quantity: qty,
      unitPrice,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    reservedEventId = null;
    reservedQuantity = 0;

    return res.status(201).json({
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    // Restore reserved tickets if booking creation fails.
    if (reservedEventId && reservedQuantity) {
      try {
        await Event.updateOne(
          { _id: reservedEventId },
          { $inc: { availableTickets: reservedQuantity } }
        );
      } catch (restoreError) {
        console.error(
          "Failed to restore reserved tickets:",
          restoreError.message
        );
      }
    }

    console.error("Create booking error:", error);

    return res.status(500).json({
      message: "Could not create booking.",
    });
  }
};

// =====================================
// ORGANIZER: GET OWN BOOKINGS
// =====================================

exports.getOrganizerBookings = async (req, res) => {
  try {
    const organizerId = getUserId(req);

    if (!organizerId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const { search = "", status = "all" } = req.query;

    // Only events owned by this organizer
    const organizerEvents = await Event.find({
      organizer: organizerId,
    }).select("_id");

    const eventIds = organizerEvents.map((event) => event._id);

    const filter = {
      event: { $in: eventIds },
    };

    if (["pending", "confirmed", "cancelled"].includes(status)) {
      filter.status = status;
    }

    if (search.trim()) {
      const regex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      const matchingCustomers = await mongoose
        .model("User")
        .find({
          $or: [
            { name: regex },
            { email: regex },
          ],
        })
        .select("_id");

      filter.$or = [
        { bookingReference: regex },
        { customer: { $in: matchingCustomers.map((u) => u._id) } },
      ];

      const matchingEvents = await Event.find({
        _id: { $in: eventIds },
        title: regex,
      }).select("_id");

      filter.$or.push({
        event: { $in: matchingEvents.map((e) => e._id) },
      });
    }

    const bookings = await Booking.find(filter)
      .populate("customer", "name email phone")
      .populate("event", "title eventDate venue city organizer")
      .sort({ createdAt: -1 });

    const summaryBookings = await Booking.find({
      event: { $in: eventIds },
    }).select("status totalAmount");

    const summary = {
      totalBookings: summaryBookings.length,
      confirmedBookings: summaryBookings.filter(
        (booking) => booking.status === "confirmed"
      ).length,
      totalSales: summaryBookings
        .filter((booking) => booking.status === "confirmed")
        .reduce(
          (total, booking) => total + booking.totalAmount,
          0
        ),
    };

    return res.json({
      summary,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get organizer bookings error:", error);

    return res.status(500).json({
      message: "Could not retrieve bookings.",
    });
  }
};

// =====================================
// ORGANIZER: GET BOOKING DETAILS
// =====================================

exports.getOrganizerBookingById = async (req, res) => {
  try {
    const organizerId = getUserId(req);
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    const booking = await Booking.findById(id)
      .populate("customer", "name email phone")
      .populate("event", "title eventDate venue city organizer");

    if (
      !booking ||
      !booking.event ||
      booking.event.organizer.toString() !==
        String(organizerId)
    ) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    return res.json({ booking });
  } catch (error) {
    console.error("Get booking details error:", error);

    return res.status(500).json({
      message: "Could not retrieve booking details.",
    });
  }
};