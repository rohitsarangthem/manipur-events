
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UpcomingEvents.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/events`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load events.");
        }

        const data = await response.json();

        const approvedEvents = Array.isArray(data.events)
          ? data.events
          : [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = approvedEvents
          .filter((event) => {
            const eventDate = new Date(event.eventDate);

            return (
              !Number.isNaN(eventDate.getTime()) &&
              eventDate >= today &&
              event.status === "approved"
            );
          })
          .sort(
            (a, b) =>
              new Date(a.eventDate) - new Date(b.eventDate)
          )
          .slice(0, 4);

        setEvents(upcoming);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Upcoming events error:", err);
          setError("Unable to load events. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUpcomingEvents();

    return () => controller.abort();
  }, []);

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "Time to be announced";

    const match = time.match(/^(\d{1,2}):(\d{2})$/);

    if (!match) return time;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="upcoming-events">
      <div className="upcoming-heading">
        <div>
          <p className="upcoming-label">
            MARK YOUR CALENDAR
          </p>

          <h2>Upcoming Events</h2>
        </div>

        <Link
          to="/events"
          className="upcoming-view-all"
        >
          View All →
        </Link>
      </div>

      {loading && (
        <p className="upcoming-message">
          Loading upcoming events...
        </p>
      )}

      {!loading && error && (
        <p className="upcoming-message upcoming-error">
          {error}
        </p>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="upcoming-message">
          No upcoming events available right now. Please check back soon!
        </p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="upcoming-list">
          {events.map((event) => {
            const date = new Date(event.eventDate);

            return (
              <article
                className="upcoming-card"
                key={event._id}
              >
                <div className="upcoming-date">
                  <span>
                    {date
                      .toLocaleDateString("en-US", {
                        month: "short",
                      })
                      .toUpperCase()}
                  </span>

                  <strong>
                    {date.getDate()}
                  </strong>
                </div>

                <div className="upcoming-image-wrapper">
                  <img
                    src={
                      event.image ||
                      "/events/event-placeholder.jpg"
                    }
                    alt={event.title}
                    className="upcoming-image"
                    loading="lazy"
                  />
                </div>

                <div className="upcoming-info">
                  <span className="upcoming-category">
                    {event.category}
                  </span>

                  <h3>{event.title}</h3>

                  <div className="upcoming-meta">
                    <span>
                      📅 {formatDate(event.eventDate)}
                    </span>

                    <span>
                      ⏰ {formatTime(event.startTime)}
                    </span>
                  </div>

                  <div className="upcoming-location">
                    📍{" "}
                    {[event.venue, event.city]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>

                <div className="upcoming-action">
                  <div className="upcoming-price">
                    <small>From</small>

                    <strong>
                      ₹{Number(event.ticketPrice).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="upcoming-btn"
                  >
                    View Event →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default UpcomingEvents;
