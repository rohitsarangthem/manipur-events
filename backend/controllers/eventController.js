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

// =====================================
// GET ORGANIZER'S EVENTS
// =====================================

const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      organizer: req.user.userId
    })
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: events.length,
      events
    });

  } catch (error) {
    console.error("Get organizer events error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================
// GET ORGANIZER DASHBOARD
// =====================================

// =====================================
// GET ORGANIZER DASHBOARD
// =====================================

// =====================================
// GET ORGANIZER DASHBOARD
// =====================================

const getOrganizerDashboard = async (req, res) => {
  try {

    // =====================================
    // ORGANIZER ID
    // =====================================

    const organizerId = req.user.userId;

    const now = new Date();


    // =====================================
    // GET ALL ORGANIZER EVENTS
    // =====================================

    const allEvents = await Event.find({
      organizer: organizerId
    })
      .sort({ eventDate: 1 })
      .lean();


    // =====================================
    // GET UPCOMING APPROVED EVENTS
    // =====================================

    const upcomingEvents = await Event.find({
      organizer: organizerId,
      status: "approved",
      eventDate: {
        $gte: now
      }
    })
      .sort({ eventDate: 1 })
      .limit(5)
      .lean();


    // =====================================
    // TOTAL EVENTS
    // =====================================

    const totalEvents = allEvents.length;


    // =====================================
    // TICKETS SOLD
    // =====================================

    const ticketsSold = allEvents.reduce(
      (total, event) => {

        const totalTickets =
          Number(event.totalTickets || 0);

        const availableTickets =
          Number(event.availableTickets || 0);

        const sold =
          Math.max(
            totalTickets - availableTickets,
            0
          );

        return total + sold;

      },
      0
    );


    // =====================================
    // TOTAL REVENUE
    // =====================================

    const totalRevenue = allEvents.reduce(
      (total, event) => {

        const totalTickets =
          Number(event.totalTickets || 0);

        const availableTickets =
          Number(event.availableTickets || 0);

        const sold =
          Math.max(
            totalTickets - availableTickets,
            0
          );

        const ticketPrice =
          Number(event.ticketPrice || 0);

        return total + (
          sold * ticketPrice
        );

      },
      0
    );


    // =====================================
    // DEBUG
    // =====================================

    console.log(
      "Organizer ID:",
      organizerId
    );

    console.log(
      "Current date:",
      now
    );

    console.log(
      "Total organizer events:",
      allEvents.length
    );

    console.log(
      "Upcoming events:",
      upcomingEvents
    );


    // =====================================
    // SEND RESPONSE
    // =====================================

    res.status(200).json({

      stats: {
        totalEvents: totalEvents,

        ticketsSold: ticketsSold,

        totalRevenue: totalRevenue,

        upcomingEvents:
          upcomingEvents.length
      },

      upcomingEvents: upcomingEvents

    });


  } catch (error) {

    console.error(
      "Get organizer dashboard error:",
      error
    );

    res.status(500).json({
      message: "Server error"
    });

  }
};



// GET ORGANIZER'S SINGLE EVENT
const getMyEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      organizer: req.user.userId
    }).populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found or you do not have permission to access it"
      });
    }

    res.status(200).json({
      event
    });

  } catch (error) {
    console.error("Get organizer event error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// UPDATE ORGANIZER'S EVENT
const updateMyEvent = async (req, res) => {
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

    const event = await Event.findOne({
      _id: req.params.id,
      organizer: req.user.userId
    });

    if (!event) {
      return res.status(404).json({
        message:
          "Event not found or you do not have permission to edit it"
      });
    }

    // Update basic information
    if (title !== undefined) {
      event.title = title;
    }

    if (description !== undefined) {
      event.description = description;
    }

    if (category !== undefined) {
      event.category = category;
    }

    if (image !== undefined) {
      event.image = image;
    }

    if (venue !== undefined) {
      event.venue = venue;
    }

    if (address !== undefined) {
      event.address = address;
    }

    if (city !== undefined) {
      event.city = city;
    }

    if (eventDate !== undefined) {
      event.eventDate = eventDate;
    }

    if (startTime !== undefined) {
      event.startTime = startTime;
    }

    if (endTime !== undefined) {
      event.endTime = endTime;
    }

    if (ticketPrice !== undefined) {
      event.ticketPrice = ticketPrice;
    }

    // Handle ticket quantity carefully
    if (totalTickets !== undefined) {
      const ticketsSold =
        event.totalTickets -
        event.availableTickets;

      if (Number(totalTickets) < ticketsSold) {
        return res.status(400).json({
          message:
            `Total tickets cannot be less than tickets already sold (${ticketsSold})`
        });
      }

      event.totalTickets = Number(totalTickets);

      event.availableTickets =
        Number(totalTickets) - ticketsSold;
    }

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event
    });

  } catch (error) {
    console.error("Update event error:", error);

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
  getAllEventsForAdmin,
  getMyEvents,
  getOrganizerDashboard,
  getMyEventById,
  updateMyEvent
};