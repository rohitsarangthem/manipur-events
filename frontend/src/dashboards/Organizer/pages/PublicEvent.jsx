import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import "./PublicEvent.css";

function PublicEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/events/${eventId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Event not found"
          );
        }

        setEvent(data.event);

      } catch (error) {
        console.error(
          "Fetch public event error:",
          error
        );

        setError(
          error.message ||
            "Unable to load event"
        );

      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <main className="public-event-page">
        <div className="public-event-loading">
          <div className="loading-spinner"></div>
          <p>Loading event...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="public-event-page">

        <div className="public-event-error">

          <div className="error-icon">
            !
          </div>

          <h2>
            Event Not Found
          </h2>

          <p>
            {error}
          </p>

          <button
            className="public-secondary-btn"
            onClick={() =>
              navigate("/events")
            }
          >
            ← Back to Events
          </button>

        </div>

      </main>
    );
  }

  if (!event) {
    return null;
  }

  const formattedDate = new Date(
    event.eventDate
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const ticketsAvailable =
    event.availableTickets > 0;

  return (
    <main className="public-event-page">

      {/* HEADER */}

      <header className="public-event-header">

        <div
          className="public-brand"
          onClick={() => navigate("/")}
        >
          Manipur Events
        </div>

        <button
          className="public-back-btn"
          onClick={() =>
            navigate("/events")
          }
        >
          ← Back to Events
        </button>

      </header>


      {/* EVENT HERO */}

      <section className="public-event-hero">

        <div className="public-event-image-wrapper">

          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="public-event-image"
            />
          ) : (
            <div className="public-event-no-image">
              No Image Available
            </div>
          )}

        </div>


        <div className="public-event-content">

          <div className="public-event-top">

            <span className="public-event-category">
              {event.category}
            </span>

            <span className="public-event-status">
              {event.status}
            </span>

          </div>


          <h1>
            {event.title}
          </h1>


          <div className="public-event-meta">

            <div className="public-meta-item">

              <span className="meta-icon">
                📅
              </span>

              <div>
                <small>
                  Date
                </small>

                <strong>
                  {formattedDate}
                </strong>
              </div>

            </div>


            <div className="public-meta-item">

              <span className="meta-icon">
                🕐
              </span>

              <div>
                <small>
                  Time
                </small>

                <strong>
                  {event.startTime}

                  {event.endTime &&
                    ` - ${event.endTime}`}
                </strong>
              </div>

            </div>


            <div className="public-meta-item">

              <span className="meta-icon">
                📍
              </span>

              <div>
                <small>
                  Location
                </small>

                <strong>
                  {event.venue}
                </strong>

                <span>
                  {event.city}
                </span>
              </div>

            </div>

          </div>


          {/* TICKET CARD */}

          <div className="public-ticket-card">

            <div className="ticket-price">

              <small>
                Ticket Price
              </small>

              <strong>
                ₹
                {Number(
                  event.ticketPrice
                ).toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="ticket-available">

              <small>
                Tickets Available
              </small>

              <strong>
                {event.availableTickets}
              </strong>

            </div>

          </div>


          <button
            className="buy-ticket-btn"
            disabled={!ticketsAvailable}
            onClick={() => {
              console.log(
                "Buy ticket:",
                event._id
              );
            }}
          >
            {ticketsAvailable
              ? "Buy Tickets"
              : "Sold Out"}
          </button>

        </div>

      </section>


      {/* EVENT DESCRIPTION */}

      <section className="public-content-section">

        <div className="section-heading">
          <span>
            EVENT INFORMATION
          </span>

          <h2>
            About This Event
          </h2>
        </div>


        <div className="description-card">

          <p>
            {event.description}
          </p>

        </div>

      </section>


      {/* EVENT DETAILS */}

      <section className="public-content-section">

        <div className="section-heading">
          <span>
            EVENT DETAILS
          </span>

          <h2>
            Everything You Need to Know
          </h2>
        </div>


        <div className="event-details-card">

          <div className="public-detail">

            <span>
              Category
            </span>

            <strong>
              {event.category}
            </strong>

          </div>


          <div className="public-detail">

            <span>
              Date
            </span>

            <strong>
              {formattedDate}
            </strong>

          </div>


          <div className="public-detail">

            <span>
              Time
            </span>

            <strong>
              {event.startTime}

              {event.endTime &&
                ` - ${event.endTime}`}
            </strong>

          </div>


          <div className="public-detail">

            <span>
              Venue
            </span>

            <strong>
              {event.venue}
            </strong>

          </div>


          <div className="public-detail">

            <span>
              Address
            </span>

            <strong>
              {event.address ||
                "Not provided"}
            </strong>

          </div>


          <div className="public-detail">

            <span>
              City
            </span>

            <strong>
              {event.city}
            </strong>

          </div>

        </div>

      </section>


      {/* LOCATION */}

      <section className="public-content-section">

        <div className="section-heading">
          <span>
            LOCATION
          </span>

          <h2>
            Where It's Happening
          </h2>
        </div>


        <div className="location-card">

          <div className="location-icon">
            📍
          </div>

          <div>

            <h3>
              {event.venue}
            </h3>

            <p>
              {event.address &&
                `${event.address}, `}
              {event.city}
            </p>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="public-bottom-cta">

        <div>

          <span>
            READY TO JOIN?
          </span>

          <h2>
            Don't miss this event.
          </h2>

          <p>
            Secure your tickets before
            they sell out.
          </p>

        </div>


        <button
          className="cta-buy-btn"
          disabled={!ticketsAvailable}
          onClick={() => {
            console.log(
              "Buy ticket:",
              event._id
            );
          }}
        >
          {ticketsAvailable
            ? "Get Your Tickets →"
            : "Sold Out"}
        </button>

      </section>

    </main>
  );
}

export default PublicEvent;