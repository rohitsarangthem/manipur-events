import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  // Support both MongoDB IDs and existing event IDs.
  const eventId = event._id || event.id;

  return (
    <article className="event-card">
      {/* Event Image */}
      <div className="event-image-wrapper">
        <img
          src={event.image}
          alt={event.title}
          className="event-image"
        />

        <span className="event-category">
          {event.category}
        </span>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <h3 className="event-title">
          {event.title}
        </h3>

        <p className="event-description">
          {event.description}
        </p>

        {/* Date */}
        <div className="event-info">
          <span className="event-info-icon">📅</span>
          <span>{event.date}</span>
        </div>

        {/* Location */}
        <div className="event-info">
          <span className="event-info-icon">📍</span>
          <span>{event.location}</span>
        </div>

        {/* Bottom */}
        <div className="event-bottom">
          <div className="event-price">
            <span>From</span>
            <strong>₹{event.price}</strong>
          </div>

          {/* Ticket Quantity */}
          <div className="ticket-quantity">
            <button
              type="button"
              onClick={() => console.log("Decrease")}
              aria-label="Decrease ticket quantity"
            >
              −
            </button>

            <span>1</span>

            <button
              type="button"
              onClick={() => console.log("Increase")}
              aria-label="Increase ticket quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* View Event */}
        {eventId ? (
          <Link
            to={`/events/${eventId}`}
            className="view-event-btn"
          >
            View Event
          </Link>
        ) : (
          <button
            type="button"
            className="view-event-btn"
            disabled
          >
            Event Unavailable
          </button>
        )}
      </div>
    </article>
  );
}

export default EventCard;