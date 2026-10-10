import { Link } from "react-router-dom";


import "./OrganizerDashboard.css";


const organizerStats = [
  {
    label: "Total Events",
    value: "8",
    icon: "🎫",
  },
  {
    label: "Tickets Sold",
    value: "1,248",
    icon: "▣",
  },
  {
    label: "Total Revenue",
    value: "₹4,86,500",
    icon: "₹",
  },
  {
    label: "Upcoming Events",
    value: "3",
    icon: "◷",
  },
];


const upcomingEvents = [
  {
    id: 1,
    title: "Hills Music Festival 2026",
    date: "November 2, 2026",
    location: "Imphal, Manipur",
    tickets: 450,
    sold: 328,
    status: "Published",
    image: "/events/hills-music.jpg",
  },
  {
    id: 2,
    title: "Neon Nights",
    date: "October 25, 2026",
    location: "Imphal, Manipur",
    tickets: 300,
    sold: 215,
    status: "Published",
    image: "/events/neon-nights.jpg",
  },
  {
    id: 3,
    title: "Summer Beats 2026",
    date: "October 18, 2026",
    location: "Imphal, Manipur",
    tickets: 250,
    sold: 189,
    status: "Published",
    image: "/events/summer-beats.jpg",
  },
];


function OrganizerDashboard() {

  return (

    <div className="organizer-dashboard">

      {/* =========================================
          SIDEBAR
      ========================================= */}




      {/* =========================================
          MAIN
      ========================================= */}

      <main className="organizer-main">


        {/* =========================================
            HEADER
        ========================================= */}

        <header className="organizer-header">

          <div>

            <p className="organizer-page-label">
              ORGANIZER DASHBOARD
            </p>

            <h1>
              Welcome back, Organizer 👋
            </h1>

            <p>
              Manage your events, tickets and sales from one place.
            </p>

          </div>


          <Link
            to="/organizer/events/create"
            className="organizer-create-button"
          >
            + Create Event
          </Link>

        </header>


        {/* =========================================
            STATISTICS
        ========================================= */}

        <section className="organizer-stats">

          {organizerStats.map((stat) => (

            <div
              className="organizer-stat-card"
              key={stat.label}
            >

              <div className="organizer-stat-icon">
                {stat.icon}
              </div>

              <div>

                <span>
                  {stat.label}
                </span>

                <strong>
                  {stat.value}
                </strong>

              </div>

            </div>

          ))}

        </section>


        {/* =========================================
            EVENTS HEADER
        ========================================= */}

        <div className="organizer-section-heading">

          {/* <div>

            <p>
              YOUR EVENTS
            </p>

            <h2>
              Upcoming Events
            </h2>

          </div> */}

          {/* <Link to="/organizer/events">
            View All →
          </Link> */}

        </div>


        {/* =========================================
            EVENT LIST
        ========================================= */}

        {/* <section className="organizer-events">

          {upcomingEvents.map((event) => (

            <article
              className="organizer-event-card"
              key={event.id}
            >

              <div className="organizer-event-image">

                <img
                  src={event.image}
                  alt={event.title}
                />

              </div>


              <div className="organizer-event-info">

                <span className="organizer-event-status">
                  {event.status}
                </span>

                <h3>
                  {event.title}
                </h3>

                <p>
                  📅 {event.date}
                </p>

                <p>
                  📍 {event.location}
                </p>

              </div>


              <div className="organizer-event-sales">

                <span>
                  Tickets Sold
                </span>

                <strong>
                  {event.sold} / {event.tickets}
                </strong>

                <div className="organizer-progress">

                  <div
                    style={{
                      width: `${(event.sold / event.tickets) * 100}%`,
                    }}
                  ></div>

                </div>

              </div>


              <a
                href={`/organizer/events/${event.id}`}
                className="organizer-event-button"
              >
                Manage →
              </a>

            </article>

          ))}

        </section> */}


        {/* =========================================
            QUICK ACTIONS
        ========================================= */}

        <section className="organizer-quick-section">

          <div className="organizer-section-heading">

            <div>

              <p>
                QUICK ACTIONS
              </p>

              <h2>
                Manage Your Events
              </h2>

            </div>

          </div>


          <div className="organizer-quick-grid">

            <a
              href="/organizer/events/create"
              className="organizer-quick-card"
            >

              <span>
                ＋
              </span>

              <strong>
                Create Event
              </strong>

              <p>
                Create a new concert or event.
              </p>

            </a>


            <a
              href="/organizer/bookings"
              className="organizer-quick-card"
            >

              <span>
                ▤
              </span>

              <strong>
                View Bookings
              </strong>

              <p>
                Manage your latest ticket bookings.
              </p>

            </a>


            <a
              href="/organizer/attendees"
              className="organizer-quick-card"
            >

              <span>
                ♙
              </span>

              <strong>
                Attendees
              </strong>

              <p>
                View and manage your attendees.
              </p>

            </a>

          </div>

        </section>

      </main>

    </div>

  );
}


export default OrganizerDashboard;