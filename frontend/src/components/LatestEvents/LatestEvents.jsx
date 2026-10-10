import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EventCard from "../EventCard/EventCard";
import "./LatestEvents.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function LatestEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchLatestEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/events`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load latest events.");
        }

        const data = await response.json();

        const approvedEvents = Array.isArray(data.events)
          ? data.events
          : [];

        const latestEvents = approvedEvents
          .filter((event) => event.status === "approved")
          .sort((a, b) => {
            return (
              new Date(b.createdAt || b.eventDate).getTime() -
              new Date(a.createdAt || a.eventDate).getTime()
            );
          })
          .slice(0, 3)
          .map((event) => ({
            ...event,

            // Keep the existing EventCard data interface.
            id: event._id,
            image: event.image || "",
            category: event.category || "Live Music",
            title: event.title,
            description: event.description || "",

            date: new Date(event.eventDate).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            ),

            time: event.startTime || "Time to be announced",

            location: [
              event.venue,
              event.city,
            ]
              .filter(Boolean)
              .join(", "),

            price: Number(event.ticketPrice) || 0,
          }));

        setEvents(latestEvents);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Latest events error:", err);
          setError(
            "Unable to load events. Please try again later."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchLatestEvents();

    return () => controller.abort();
  }, []);

  return (
    <section className="latest-events">
      <div className="section-heading">
        <div>
          <p className="section-label">
            DON'T MISS OUT
          </p>

          <h2>Latest Events</h2>
        </div>

        <Link to="/events" className="view-all">
          View all →
        </Link>
      </div>

      {loading && (
        <p className="latest-events-message">
          Loading latest events...
        </p>
      )}

      {!loading && error && (
        <p className="latest-events-message latest-events-error">
          {error}
        </p>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="latest-events-message">
          No published events available yet.
        </p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default LatestEvents;