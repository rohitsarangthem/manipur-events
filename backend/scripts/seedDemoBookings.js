const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");



const demoBookings = [
  { reference: "ME-DEMO-1001", customerIndex: 0, eventIndex: 0, ticketType: "General Admission", quantity: 2, status: "confirmed", paymentStatus: "paid" },
  { reference: "ME-DEMO-1002", customerIndex: 1, eventIndex: 1, ticketType: "VIP Ticket", quantity: 1, status: "confirmed", paymentStatus: "paid" },
  { reference: "ME-DEMO-1003", customerIndex: 2, eventIndex: 0, ticketType: "General Admission", quantity: 3, status: "pending", paymentStatus: "pending" },
  { reference: "ME-DEMO-1004", customerIndex: 3, eventIndex: 1, ticketType: "VIP Ticket", quantity: 2, status: "cancelled", paymentStatus: "refunded" },
  { reference: "ME-DEMO-1005", customerIndex: 4, eventIndex: 0, ticketType: "General Admission", quantity: 1, status: "confirmed", paymentStatus: "paid" },
];

async function seedDemoBookings() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    // Find approved events that belong to an organizer.
    const approvedEvents = await Event.find({ status: "approved" })
      .populate("organizer")
      .sort({ createdAt: 1 });

    const firstEvent = approvedEvents.find(
      (event) => event.organizer && event.organizer.role === "organizer"
    );

    if (!firstEvent) {
      throw new Error("No approved event linked to an organizer was found.");
    }

    // Only create bookings for this organizer's events.
    const organizerId = firstEvent.organizer._id;

    const events = approvedEvents.filter(
      (event) => String(event.organizer?._id) === String(organizerId)
    );

    const customers = await User.find({ role: "customer" }).sort({ createdAt: 1 });

    if (events.length === 0) {
      throw new Error("This organizer has no approved events.");
    }

    if (customers.length === 0) {
      throw new Error("No customer accounts were found.");
    }

    let created = 0;
    let alreadyExists = 0;

    for (const demo of demoBookings) {
      const customer = customers[demo.customerIndex % customers.length];
      const event = events[demo.eventIndex % events.length];
      const unitPrice = Number(event.ticketPrice || 0);

      // Stable references prevent duplicates when the script is run again.
      const result = await Booking.updateOne(
        { bookingReference: demo.reference },
        {
          $setOnInsert: {
            bookingReference: demo.reference,
            customer: customer._id,
            event: event._id,
            ticketType: demo.ticketType,
            quantity: demo.quantity,
            unitPrice,
            totalAmount: unitPrice * demo.quantity,
            status: demo.status,
            paymentStatus: demo.paymentStatus,
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        created++;
        console.log(`Created ${demo.reference}`);
      } else {
        alreadyExists++;
        console.log(`Skipped existing ${demo.reference}`);
      }
    }

    console.log("\nDemo booking seeding finished.");
    console.log(`Created: ${created}`);
    console.log(`Already existed: ${alreadyExists}`);
    console.log("Event ticket availability was not changed.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDemoBookings();