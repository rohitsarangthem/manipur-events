import "./AdminDashboard.css";

function AdminDashboard() {

  const recentBookings = [
    {
      id: "ME-1024",
      customer: "Rahul Sharma",
      event: "Hills Music Festival",
      amount: 1998,
      status: "Confirmed",
    },
    {
      id: "ME-1023",
      customer: "Priya Singh",
      event: "Neon Nights",
      amount: 799,
      status: "Confirmed",
    },
    {
      id: "ME-1022",
      customer: "Amit Kumar",
      event: "Summer Beats 2026",
      amount: 998,
      status: "Pending",
    },
    {
      id: "ME-1021",
      customer: "Anita Devi",
      event: "Hills Music Festival",
      amount: 599,
      status: "Confirmed",
    },
  ];


  const recentEvents = [
    {
      name: "Hills Music Festival 2026",
      organizer: "Manipur Live Events",
      date: "Oct 18, 2026",
      status: "Published",
    },
    {
      name: "Neon Nights",
      organizer: "Imphal Entertainment",
      date: "Oct 25, 2026",
      status: "Published",
    },
    {
      name: "Summer Beats 2026",
      organizer: "Manipur Music Group",
      date: "Nov 02, 2026",
      status: "Pending",
    },
  ];


  return (
    <div className="admin-dashboard">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="admin-dashboard-header">

        <div>

          <p className="admin-dashboard-label">
            ADMINISTRATION
          </p>

          <h1>
            Dashboard
          </h1>

          <p className="admin-dashboard-subtitle">
            Manage and monitor the Manipur Events platform.
          </p>

        </div>


        <div className="admin-header-date">
          September 2026
        </div>

      </div>


      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="admin-stats">


        {/* USERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ♙
          </div>

          <div>

            <span>
              Total Users
            </span>

            <strong>
              1,248
            </strong>

            <small>
              +12% this month
            </small>

          </div>

        </div>


        {/* ORGANIZERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ◉
          </div>

          <div>

            <span>
              Organizers
            </span>

            <strong>
              86
            </strong>

            <small>
              +8 this month
            </small>

          </div>

        </div>


        {/* EVENTS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🎫
          </div>

          <div>

            <span>
              Total Events
            </span>

            <strong>
              142
            </strong>

            <small>
              12 upcoming
            </small>

          </div>

        </div>


        {/* BOOKINGS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ▤
          </div>

          <div>

            <span>
              Total Bookings
            </span>

            <strong>
              2,856
            </strong>

            <small>
              +18% this month
            </small>

          </div>

        </div>


        {/* REVENUE */}

        <div className="admin-stat-card admin-stat-revenue">

          <div className="admin-stat-icon">
            ₹
          </div>

          <div>

            <span>
              Total Revenue
            </span>

            <strong>
              ₹18.45L
            </strong>

            <small>
              +14% this month
            </small>

          </div>

        </div>

      </div>


      {/* =========================================
          MAIN GRID
      ========================================= */}

      <div className="admin-dashboard-grid">


        {/* =====================================
            RECENT BOOKINGS
        ===================================== */}

        <section className="admin-dashboard-card">

          <div className="admin-card-heading">

            <div>

              <p>
                RECENT ACTIVITY
              </p>

              <h2>
                Recent Bookings
              </h2>

            </div>

            <a href="/admin/bookings">
              View All →
            </a>

          </div>


          <div className="admin-bookings-list">

            {recentBookings.map((booking) => (

              <div
                className="admin-booking-row"
                key={booking.id}
              >

                <div className="admin-booking-avatar">
                  {booking.customer.charAt(0)}
                </div>


                <div className="admin-booking-info">

                  <strong>
                    {booking.customer}
                  </strong>

                  <span>
                    {booking.event}
                  </span>

                </div>


                <div className="admin-booking-amount">

                  <strong>
                    ₹{booking.amount}
                  </strong>

                  <span
                    className={
                      booking.status === "Confirmed"
                        ? "confirmed"
                        : "pending"
                    }
                  >
                    {booking.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================
            EVENT OVERVIEW
        ===================================== */}

        <section className="admin-dashboard-card">

          <div className="admin-card-heading">

            <div>

              <p>
                EVENT MANAGEMENT
              </p>

              <h2>
                Recent Events
              </h2>

            </div>

            <a href="/admin/events">
              View All →
            </a>

          </div>


          <div className="admin-events-list">

            {recentEvents.map((event) => (

              <div
                className="admin-event-row"
                key={event.name}
              >

                <div className="admin-event-icon">
                  🎫
                </div>


                <div className="admin-event-info">

                  <strong>
                    {event.name}
                  </strong>

                  <span>
                    {event.organizer}
                  </span>

                </div>


                <div className="admin-event-meta">

                  <span>
                    {event.date}
                  </span>

                  <strong
                    className={
                      event.status === "Published"
                        ? "published"
                        : "event-pending"
                    }
                  >
                    {event.status}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>


      {/* =========================================
          BOTTOM SECTION
      ========================================= */}

      <div className="admin-bottom-grid">


        {/* ORGANIZER APPROVAL */}

        <section className="admin-dashboard-card">

          <div className="admin-card-heading">

            <div>

              <p>
                ACTION REQUIRED
              </p>

              <h2>
                Organizer Approvals
              </h2>

            </div>

            <span className="admin-count">
              4 Pending
            </span>

          </div>


          <div className="admin-approval-content">

            <div className="admin-approval-icon">
              !
            </div>

            <div>

              <strong>
                4 organizers are waiting for approval
              </strong>

              <p>
                Review organizer profiles before they can
                publish events.
              </p>

              <a href="/admin/organizers">
                Review Organizers →
              </a>

            </div>

          </div>

        </section>


        {/* PLATFORM SUMMARY */}

        <section className="admin-dashboard-card">

          <div className="admin-card-heading">

            <div>

              <p>
                PLATFORM
              </p>

              <h2>
                Quick Summary
              </h2>

            </div>

          </div>


          <div className="admin-summary-list">

            <div>
              <span>
                Active Events
              </span>

              <strong>
                118
              </strong>
            </div>


            <div>
              <span>
                Upcoming Events
              </span>

              <strong>
                12
              </strong>
            </div>


            <div>
              <span>
                Pending Events
              </span>

              <strong>
                7
              </strong>
            </div>


            <div>
              <span>
                Cancelled Events
              </span>

              <strong>
                5
              </strong>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default AdminDashboard;