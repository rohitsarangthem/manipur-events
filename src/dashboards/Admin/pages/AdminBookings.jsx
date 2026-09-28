import { Link } from "react-router-dom";
import "./AdminBookings.css";

function AdminBookings() {
  const bookings = [
    {
      id: "ME-1024",
      customer: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      event: "Hills Music Festival 2026",
      tickets: 2,
      amount: 1998,
      date: "Sep 28, 2026",
      payment: "Paid",
      status: "Confirmed",
    },
    {
      id: "ME-1023",
      customer: "Priya Singh",
      email: "priya.singh@gmail.com",
      event: "Neon Nights",
      tickets: 1,
      amount: 799,
      date: "Sep 27, 2026",
      payment: "Paid",
      status: "Confirmed",
    },
    {
      id: "ME-1022",
      customer: "Amit Kumar",
      email: "amit.kumar@gmail.com",
      event: "Summer Beats 2026",
      tickets: 2,
      amount: 998,
      date: "Sep 26, 2026",
      payment: "Pending",
      status: "Pending",
    },
    {
      id: "ME-1021",
      customer: "Anita Devi",
      email: "anita.devi@gmail.com",
      event: "Hills Music Festival 2026",
      tickets: 1,
      amount: 599,
      date: "Sep 25, 2026",
      payment: "Paid",
      status: "Confirmed",
    },
    {
      id: "ME-1020",
      customer: "Rakesh Meitei",
      email: "rakesh.meitei@gmail.com",
      event: "Rock Night Imphal",
      tickets: 2,
      amount: 1198,
      date: "Sep 24, 2026",
      payment: "Paid",
      status: "Confirmed",
    },
    {
      id: "ME-1019",
      customer: "Neha Sharma",
      email: "neha.sharma@gmail.com",
      event: "Indie Music Evening",
      tickets: 1,
      amount: 499,
      date: "Sep 23, 2026",
      payment: "Refunded",
      status: "Cancelled",
    },
  ];

  return (
    <div className="admin-bookings">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-bookings-header">

        <div>
          <p className="admin-bookings-label">
            BOOKING MANAGEMENT
          </p>

          <h1>Bookings</h1>

          <p className="admin-bookings-subtitle">
            View and manage all ticket bookings on the platform.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-bookings-back"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =========================================
          STATS
      ========================================= */}

      <div className="admin-bookings-stats">

        <div className="admin-bookings-stat">
          <span>Total Bookings</span>
          <strong>2,856</strong>
          <small>+18% this month</small>
        </div>

        <div className="admin-bookings-stat">
          <span>Confirmed</span>
          <strong>2,684</strong>
          <small>94% of bookings</small>
        </div>

        <div className="admin-bookings-stat">
          <span>Pending</span>
          <strong>98</strong>
          <small>Awaiting payment</small>
        </div>

        <div className="admin-bookings-stat">
          <span>Cancelled</span>
          <strong>74</strong>
          <small>2.6% of bookings</small>
        </div>

      </div>


      {/* =========================================
          BOOKINGS CARD
      ========================================= */}

      <section className="admin-bookings-card">

        <div className="admin-bookings-toolbar">

          <div>
            <p>RECENT BOOKINGS</p>
            <h2>All Bookings</h2>
          </div>

          <div className="admin-bookings-filters">

            <div className="admin-bookings-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search bookings..."
              />

            </div>

            <select defaultValue="All">
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select defaultValue="All Payments">
              <option value="All Payments">
                All Payments
              </option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>

          </div>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="admin-bookings-table-wrapper">

          <table className="admin-bookings-table">

            <thead>

              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Event</th>
                <th>Tickets</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking.id}>

                  {/* Booking ID */}

                  <td>
                    <strong className="admin-booking-id">
                      {booking.id}
                    </strong>

                    <span className="admin-booking-date">
                      {booking.date}
                    </span>
                  </td>


                  {/* Customer */}

                  <td>

                    <div className="admin-booking-customer">

                      <div className="admin-booking-avatar">
                        {booking.customer.charAt(0)}
                      </div>

                      <div>
                        <strong>{booking.customer}</strong>
                        <span>{booking.email}</span>
                      </div>

                    </div>

                  </td>


                  {/* Event */}

                  <td>
                    <span className="admin-booking-event">
                      {booking.event}
                    </span>
                  </td>


                  {/* Tickets */}

                  <td>
                    {booking.tickets}
                  </td>


                  {/* Amount */}

                  <td>
                    <strong className="admin-booking-amount">
                      ₹{booking.amount}
                    </strong>
                  </td>


                  {/* Payment */}

                  <td>

                    <span
                      className={`admin-payment-status ${booking.payment.toLowerCase()}`}
                    >
                      {booking.payment}
                    </span>

                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={`admin-booking-status ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>

                  </td>


                  {/* Action */}

                  <td>

                    <button className="admin-booking-action">
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

        <div className="admin-bookings-pagination">

          <span>
            Showing 1–6 of 2,856 bookings
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
              476
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

export default AdminBookings;