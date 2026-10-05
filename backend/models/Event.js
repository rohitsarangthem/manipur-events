const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    venue: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: "Imphal"
    },

    eventDate: {
      type: Date,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      default: ""
    },

    ticketPrice: {
      type: Number,
      required: true,
      min: 0
    },

    totalTickets: {
      type: Number,
      required: true,
      min: 1
    },

    availableTickets: {
      type: Number,
      required: true,
      min: 0
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "cancelled",
        "completed"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);