const Event = require("../models/Event");

// =====================================
// CREATE EVENT
// =====================================

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      venue,
      address,
      city,
      eventDate,
      startTime,
      endTime,
      ticketPrice,
      totalTickets
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !category ||
      !venue ||
      !eventDate ||
      !startTime ||
      ticketPrice === undefined ||
      totalTickets === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required event details"
      });
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      category,
      image: image || "",
      venue,
      address: address || "",
      city: city || "Imphal",
      eventDate,
      startTime,
      endTime: endTime || "",
      ticketPrice,
      totalTickets,
      availableTickets: totalTickets,

      // Organizer comes from JWT
      organizer: req.user.userId,

      // New events need admin approval
      status: "pending"
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================
// GET ALL APPROVED EVENTS
// =====================================

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "approved"
    })
      .populate("organizer", "name email")
      .sort({ eventDate: 1 });// Mongo Query

    res.status(200).json({
      count: events.length,
      events
    });

  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================
// GET SINGLE EVENT
// =====================================

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      event
    });

  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================
// APPROVE EVENT
// =====================================

const approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.status !== "pending") {
      return res.status(400).json({
        message: "Only pending events can be approved"
      });
    }

    event.status = "approved";

    await event.save();

    res.status(200).json({
      message: "Event approved successfully",
      event
    });

  } catch (error) {
    console.error("Approve event error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================
// REJECT EVENT
// =====================================

const rejectEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.status !== "pending") {
      return res.status(400).json({
        message: "Only pending events can be rejected"
      });
    }

    event.status = "rejected";

    await event.save();

    res.status(200).json({
      message: "Event rejected successfully",
      event
    });

  } catch (error) {
    console.error("Reject event error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================
// GET ALL EVENTS FOR ADMIN
// =====================================

const getAllEventsForAdmin = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: events.length,
      events
    });

  } catch (error) {
    console.error("Get admin events error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  createEvent,
  getEvents,
  getEventById,
  approveEvent,
  rejectEvent,
  getAllEventsForAdmin
};