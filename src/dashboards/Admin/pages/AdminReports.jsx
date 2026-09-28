import { Link } from "react-router-dom";
import "./AdminReports.css";

function AdminReports() {
  const monthlyRevenue = [
    { month: "Apr", value: 45 },
    { month: "May", value: 58 },
    { month: "Jun", value: 52 },
    { month: "Jul", value: 68 },
    { month: "Aug", value: 76 },
    { month: "Sep", value: 88 },
  ];

  const topEvents = [
    {
      name: "Hills Music Festival 2026",
      bookings: 428,
      revenue: "₹4.28L",
      tickets: 612,
    },
    {
      name: "Neon Nights",
      bookings: 315,
      revenue: "₹2.51L",
      tickets: 401,
    },
    {
      name: "Summer Beats 2026",
      bookings: 286,
      revenue: "₹2.14L",
      tickets: 356,
    },
    {
      name: "Rock Night Imphal",
      bookings: 198,
      revenue: "₹1.98L",
      tickets: 247,
    },
    {
      name: "Indie Music Evening",
      bookings: 154,
      revenue: "₹76,846",
      tickets: 183,
    },
  ];

  return (
    <div className="admin-reports">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-reports-header">

        <div>
          <p className="admin-reports-label">
            PLATFORM ANALYTICS
          </p>

          <h1>Reports</h1>

          <p className="admin-reports-subtitle">
            Monitor platform performance, revenue and booking activity.
          </p>
        </div>

        <div className="admin-reports-header-actions">

          <select defaultValue="September 2026">
            <option>September 2026</option>
            <option>August 2026</option>
            <option>July 2026</option>
            <option>June 2026</option>
          </select>

          <Link
            to="/admin"
            className="admin-reports-back"
          >
            ← Dashboard
          </Link>

        </div>

      </div>


      {/* =========================================
          OVERVIEW STATS
      ========================================= */}

      <div className="admin-reports-stats">

        <div className="admin-report-stat">
          <span>Total Revenue</span>
          <strong>₹18.45L</strong>
          <small>+14.2% from last month</small>
        </div>

        <div className="admin-report-stat">
          <span>Total Bookings</span>
          <strong>2,856</strong>
          <small>+18.4% from last month</small>
        </div>

        <div className="admin-report-stat">
          <span>New Users</span>
          <strong>146</strong>
          <small>+12.8% from last month</small>
        </div>

        <div className="admin-report-stat">
          <span>Active Events</span>
          <strong>118</strong>
          <small>12 upcoming events</small>
        </div>

      </div>


      {/* =========================================
          REVENUE CHART
      ========================================= */}

      <section className="admin-report-card admin-revenue-card">

        <div className="admin-report-card-header">

          <div>
            <p>REVENUE PERFORMANCE</p>
            <h2>Monthly Revenue</h2>
          </div>

          <strong className="admin-report-total">
            ₹18.45L
          </strong>

        </div>


        <div className="admin-revenue-chart">

          <div className="admin-chart-y-axis">
            <span>₹4L</span>
            <span>₹3L</span>
            <span>₹2L</span>
            <span>₹1L</span>
            <span>₹0</span>
          </div>

          <div className="admin-chart-area">

            <div className="admin-chart-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="admin-chart-bars">

              {monthlyRevenue.map((item) => (

                <div
                  className="admin-chart-column"
                  key={item.month}
                >

                  <div className="admin-chart-value">
                    ₹{item.value}K
                  </div>

                  <div
                    className="admin-chart-bar"
                    style={{
                      height: `${item.value}%`,
                    }}
                  ></div>

                  <span className="admin-chart-month">
                    {item.month}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          SECONDARY REPORTS
      ========================================= */}

      <div className="admin-reports-grid">

        {/* BOOKING REPORT */}

        <section className="admin-report-card">

          <div className="admin-report-card-header">

            <div>
              <p>BOOKING ACTIVITY</p>
              <h2>Booking Overview</h2>
            </div>

          </div>

          <div className="admin-booking-overview">

            <div className="admin-booking-circle">

              <div>
                <strong>2,856</strong>
                <span>Bookings</span>
              </div>

            </div>

            <div className="admin-booking-legend">

              <div>
                <span className="legend-dot confirmed"></span>
                <span>Confirmed</span>
                <strong>2,684</strong>
              </div>

              <div>
                <span className="legend-dot pending"></span>
                <span>Pending</span>
                <strong>98</strong>
              </div>

              <div>
                <span className="legend-dot cancelled"></span>
                <span>Cancelled</span>
                <strong>74</strong>
              </div>

            </div>

          </div>

        </section>


        {/* PLATFORM SUMMARY */}

        <section className="admin-report-card">

          <div className="admin-report-card-header">

            <div>
              <p>PLATFORM PERFORMANCE</p>
              <h2>Quick Statistics</h2>
            </div>

          </div>

          <div className="admin-quick-stat-list">

            <div>
              <span>Average Booking Value</span>
              <strong>₹646</strong>
            </div>

            <div>
              <span>Average Tickets / Booking</span>
              <strong>1.8</strong>
            </div>

            <div>
              <span>Event Approval Rate</span>
              <strong>91.4%</strong>
            </div>

            <div>
              <span>Organizer Approval Rate</span>
              <strong>86%</strong>
            </div>

            <div>
              <span>Refund Rate</span>
              <strong>2.6%</strong>
            </div>

          </div>

        </section>

      </div>


      {/* =========================================
          TOP EVENTS
      ========================================= */}

      <section className="admin-report-card admin-top-events">

        <div className="admin-report-card-header">

          <div>
            <p>EVENT PERFORMANCE</p>
            <h2>Top Performing Events</h2>
          </div>

          <Link to="/admin/events">
            View Events →
          </Link>

        </div>


        <div className="admin-top-events-table-wrapper">

          <table className="admin-top-events-table">

            <thead>

              <tr>
                <th>Event</th>
                <th>Bookings</th>
                <th>Tickets Sold</th>
                <th>Revenue</th>
              </tr>

            </thead>

            <tbody>

              {topEvents.map((event, index) => (

                <tr key={event.name}>

                  <td>

                    <div className="admin-top-event-name">

                      <div className="admin-event-rank">
                        {index + 1}
                      </div>

                      <strong>{event.name}</strong>

                    </div>

                  </td>

                  <td>
                    {event.bookings}
                  </td>

                  <td>
                    {event.tickets}
                  </td>

                  <td>
                    <strong>{event.revenue}</strong>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default AdminReports;