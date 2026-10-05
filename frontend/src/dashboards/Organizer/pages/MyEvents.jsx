import "./MyEvents.css";

const events = [
  {
    id: 1,
    title: "Hills Music Festival 2026",
    category: "Music Festival",
    status: "Published",
    date: "November 2, 2026",
    location: "Imphal, Manipur",
    image: "/events/hills-music.jpg",
    sold: 328,
    total: 450,
    revenue: "₹3,27,672",
  },

  {
    id: 2,
    title: "Neon Nights",
    category: "DJ Night",
    status: "Published",
    date: "October 25, 2026",
    location: "Imphal, Manipur",
    image: "/events/neon-nights.jpg",
    sold: 215,
    total: 300,
    revenue: "₹1,71,785",
  },

  {
    id: 3,
    title: "Summer Beats 2026",
    category: "Live Music",
    status: "Published",
    date: "October 18, 2026",
    location: "Imphal, Manipur",
    image: "/events/summer-beats.jpg",
    sold: 189,
    total: 250,
    revenue: "₹94,311",
  },

  {
    id: 4,
    title: "Imphal Indie Night",
    category: "Indie Music",
    status: "Draft",
    date: "November 15, 2026",
    location: "Imphal, Manipur",
    image: "/events/summer-beats.jpg",
    sold: 0,
    total: 200,
    revenue: "₹0",
  },
];

function MyEvents() {
  return (
    <main className="organizer-events-page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <section className="organizer-events-header">

        <div>
          <p className="organizer-events-label">
            EVENT MANAGEMENT
          </p>

          <h1>
            My Events
          </h1>

          <p>
            Create, manage and track all your events from one place.
          </p>
        </div>

        <button className="create-event-btn">
          + Create Event
        </button>

      </section>


      {/* ================================
          FILTERS
      ================================= */}

      <section className="organizer-events-toolbar">

        <div className="event-tabs">

          <button className="event-tab active">
            All Events
          </button>

          <button className="event-tab">
            Published
          </button>

          <button className="event-tab">
            Drafts
          </button>

          <button className="event-tab">
            Ended
          </button>

        </div>

        <select className="event-sort">
          <option>Sort by: Latest</option>
          <option>Sort by: Oldest</option>
          <option>Sort by: Most Tickets Sold</option>
          <option>Sort by: Revenue</option>
        </select>

      </section>


      {/* ================================
          EVENT COUNT
      ================================= */}

      <div className="organizer-events-count">

        <div>
          <p className="organizer-section-label">
            YOUR EVENTS
          </p>

          <h2>
            All Events
          </h2>
        </div>

        <span>
          {events.length} Events
        </span>

      </div>


      {/* ================================
          EVENTS LIST
      ================================= */}

      <section className="organizer-events-list">

        {events.map((event) => {

          const percentage =
            event.total > 0
              ? Math.round((event.sold / event.total) * 100)
              : 0;

          return (

            <article
              className="organizer-event-card"
              key={event.id}
            >

              {/* IMAGE */}

              <div className="organizer-event-image">

                <img
                  src={event.image}
                  alt={event.title}
                />

              </div>


              {/* EVENT INFO */}

              <div className="organizer-event-info">

                <div className="organizer-event-status-row">

                  <span
                    className={`organizer-event-status ${
                      event.status.toLowerCase()
                    }`}
                  >
                    {event.status}
                  </span>

                  <span className="organizer-event-category">
                    {event.category}
                  </span>

                </div>

                <h3>
                  {event.title}
                </h3>

                <div className="organizer-event-meta">

                  <span>
                    📅 {event.date}
                  </span>

                  <span>
                    📍 {event.location}
                  </span>

                </div>

              </div>


              {/* SALES */}

              <div className="organizer-event-sales">

                <div className="sales-heading">

                  <span>
                    Tickets Sold
                  </span>

                  <strong>
                    {event.sold} / {event.total}
                  </strong>

                </div>

                <div className="sales-progress">

                  <div
                    className="sales-progress-bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>

                </div>

                <span className="sales-percentage">
                  {percentage}% sold
                </span>

              </div>


              {/* REVENUE */}

              <div className="organizer-event-revenue">

                <small>
                  Revenue
                </small>

                <strong>
                  {event.revenue}
                </strong>

              </div>


              {/* ACTION */}

              <div className="organizer-event-action">

                <button className="manage-event-btn">
                  Manage →
                </button>

              </div>

            </article>

          );

        })}

      </section>

    </main>
  );
}

export default MyEvents;