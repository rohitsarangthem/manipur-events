import { Link } from "react-router-dom";
import "./AdminEvents.css";

function AdminEvents() {
  const events = [
    {
      id: 1,
      title: "Hills Music Festival 2026",
      organizer: "Manipur Live Events",
      category: "Live Music",
      date: "Oct 18, 2026",
      location: "Imphal, Manipur",
      bookings: 428,
      status: "Published",
    },
    {
      id: 2,
      title: "Neon Nights",
      organizer: "Imphal Entertainment",
      category: "EDM",
      date: "Oct 25, 2026",
      location: "Imphal, Manipur",
      bookings: 312,
      status: "Published",
    },
    {
      id: 3,
      title: "Summer Beats 2026",
      organizer: "Manipur Music Group",
      category: "Live Music",
      date: "Nov 02, 2026",
      location: "Imphal, Manipur",
      bookings: 86,
      status: "Pending",
    },
    {
      id: 4,
      title: "Rock Night Imphal",
      organizer: "North East Productions",
      category: "Rock",
      date: "Nov 08, 2026",
      location: "Imphal, Manipur",
      bookings: 194,
      status: "Published",
    },
    {
      id: 5,
      title: "Indie Music Evening",
      organizer: "Imphal Music House",
      category: "Indie",
      date: "Nov 15, 2026",
      location: "Imphal, Manipur",
      bookings: 42,
      status: "Pending",
    },
    {
      id: 6,
      title: "Valley Cultural Festival",
      organizer: "Valley Events",
      category: "Folk",
      date: "Nov 20, 2026",
      location: "Imphal, Manipur",
      bookings: 0,
      status: "Rejected",
    },
  ];

  return (
    <div className="admin-events">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-events-header">

        <div>
          <p className="admin-events-label">
            EVENT MANAGEMENT
          </p>

          <h1>Events</h1>

          <p className="admin-events-subtitle">
            Review and manage events created by organizers.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-events-back"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =========================================
          STATS
      ========================================= */}

      <div className="admin-events-stats">

        <div className="admin-events-stat">
          <span>Total Events</span>
          <strong>142</strong>
        </div>

        <div className="admin-events-stat">
          <span>Published</span>
          <strong>118</strong>
        </div>

        <div className="admin-events-stat">
          <span>Pending Review</span>
          <strong>7</strong>
        </div>

        <div className="admin-events-stat">
          <span>Rejected</span>
          <strong>5</strong>
        </div>

      </div>


      {/* =========================================
          EVENTS CARD
      ========================================= */}

      <section className="admin-events-card">

        <div className="admin-events-toolbar">

          <div>
            <p>ALL EVENTS</p>
            <h2>Event Listings</h2>
          </div>

          <div className="admin-events-filters">

            <div className="admin-events-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search events..."
              />

            </div>

            <select defaultValue="All">
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select defaultValue="All Categories">
              <option value="All Categories">
                All Categories
              </option>
              <option value="Live Music">
                Live Music
              </option>
              <option value="EDM">
                EDM
              </option>
              <option value="Rock">
                Rock
              </option>
              <option value="Indie">
                Indie
              </option>
              <option value="Folk">
                Folk
              </option>
            </select>

          </div>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="admin-events-table-wrapper">

          <table className="admin-events-table">

            <thead>

              <tr>
                <th>Event</th>
                <th>Organizer</th>
                <th>Date</th>
                <th>Location</th>
                <th>Bookings</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {events.map((event) => (

                <tr key={event.id}>

                  {/* Event */}

                  <td>

                    <div className="admin-event-info">

                      <div className="admin-event-icon">
                        🎫
                      </div>

                      <div>
                        <strong>{event.title}</strong>
                        <span>{event.category}</span>
                      </div>

                    </div>

                  </td>


                  {/* Organizer */}

                  <td>
                    <span className="admin-event-organizer">
                      {event.organizer}
                    </span>
                  </td>


                  {/* Date */}

                  <td>
                    {event.date}
                  </td>


                  {/* Location */}

                  <td>
                    {event.location}
                  </td>


                  {/* Bookings */}

                  <td>
                    {event.bookings}
                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={`admin-event-status ${event.status.toLowerCase()}`}
                    >
                      {event.status}
                    </span>

                  </td>


                  {/* Action */}

                  <td>

                    <button className="admin-event-action">
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =========================================
            PAGINATION
        ========================================= */}

        <div className="admin-events-pagination">

          <span>
            Showing 1–6 of 142 events
          </span>

          <div>

            <button disabled>
              ←
            </button>

            <button className="active">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <button>
              ...
            </button>

            <button>
              24
            </button>

            <button>
              →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminEvents;