import "./EventCard.css";

function EventCard({ event }) {
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
          <span className="event-info-icon">
            📅
          </span>

          <span>
            {event.date}
          </span>
        </div>


        {/* Location */}
        <div className="event-info">
          <span className="event-info-icon">
            📍
          </span>

          <span>
            {event.location}
          </span>
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
            >
              −
            </button>

            <span>1</span>

            <button
              type="button"
              onClick={() => console.log("Increase")}
            >
              +
            </button>

          </div>

        </div>


        {/* View Event */}
        <button className="view-event-btn">
          View Event
        </button>

      </div>

    </article>
  );
}

export default EventCard;