import EventCard from "../EventCard/EventCard";
import events from "../../data/event";
import "./LatestEvents.css";

function LatestEvents() {
  return (
    <section className="latest-events">

      <div className="section-heading">

        <div>
          <p className="section-label">
            DON'T MISS OUT
          </p>

          <h2>
            Latest Events
          </h2>
        </div>

        <a href="/events" className="view-all">
          View all →
        </a>

      </div>

      <div className="events-grid">

        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}

      </div>

    </section>
  );
}

export default LatestEvents;