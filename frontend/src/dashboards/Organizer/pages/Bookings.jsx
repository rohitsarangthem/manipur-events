import { useState } from "react";
import "./Bookings.css";

function Bookings() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const bookings = [
    {
      id: "ME-BK-1024",
      customer: "Rahul Sharma",
      email: "rahul@example.com",
      event: "Hills Music Festival 2026",
      ticket: "VIP Ticket",
      quantity: 2,
      amount: 1998,
      date: "Sep 20, 2026",
      status: "Confirmed",
    },
    {
      id: "ME-BK-1023",
      customer: "Priya Singh",
      email: "priya@example.com",
      event: "Neon Nights",
      ticket: "General Admission",
      quantity: 1,
      amount: 799,
      date: "Sep 18, 2026",
      status: "Confirmed",
    },
    {
      id: "ME-BK-1022",
      customer: "Amit Kumar",
      email: "amit@example.com",
      event: "Summer Beats 2026",
      ticket: "General Admission",
      quantity: 2,
      amount: 998,
      date: "Sep 15, 2026",
      status: "Confirmed",
    },
    {
      id: "ME-BK-1021",
      customer: "Anita Devi",
      email: "anita@example.com",
      event: "Hills Music Festival 2026",
      ticket: "General Admission",
      quantity: 1,
      amount: 599,
      date: "Sep 12, 2026",
      status: "Pending",
    },
    {
      id: "ME-BK-1020",
      customer: "Rohit Singh",
      email: "rohit@example.com",
      event: "Neon Nights",
      ticket: "VIP Ticket",
      quantity: 1,
      amount: 1499,
      date: "Sep 10, 2026",
      status: "Cancelled",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {

    const matchesSearch =
      booking.customer.toLowerCase().includes(search.toLowerCase()) ||
      booking.event.toLowerCase().includes(search.toLowerCase()) ||
      booking.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  return (

    <div className="organizer-bookings">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="bookings-header">

        <div>

          <p className="bookings-label">
            BOOKING MANAGEMENT
          </p>

          <h1>
            Bookings
          </h1>

          <p className="bookings-description">
            View and manage ticket bookings for your events.
          </p>

        </div>

      </div>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="booking-stats">

        <div className="booking-stat-card">

          <div className="booking-stat-icon">
            ▤
          </div>

          <div>
            <span>
              Total Bookings
            </span>

            <strong>
              5
            </strong>
          </div>

        </div>


        <div className="booking-stat-card">

          <div className="booking-stat-icon">
            ✓
          </div>

          <div>
            <span>
              Confirmed
            </span>

            <strong>
              3
            </strong>
          </div>

        </div>


        <div className="booking-stat-card">

          <div className="booking-stat-icon">
            ₹
          </div>

          <div>
            <span>
              Total Sales
            </span>

            <strong>
              ₹5,893
            </strong>
          </div>

        </div>

      </div>


      {/* =========================================
          FILTERS
      ========================================= */}

      <div className="booking-filters">

        <div className="booking-search">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search customer, event or booking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >

          <option value="All">
            All Status
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>


      {/* =========================================
          BOOKINGS
      ========================================= */}

      <div className="booking-section">

        <div className="booking-section-header">

          <div>

            <p>
              YOUR BOOKINGS
            </p>

            <h2>
              All Bookings
            </h2>

          </div>

          <span>
            {filteredBookings.length} Bookings
          </span>

        </div>


        <div className="booking-table-wrapper">

          <table className="booking-table">

            <thead>

              <tr>

                <th>
                  Booking
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Event
                </th>

                <th>
                  Ticket
                </th>

                <th>
                  Qty
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredBookings.map((booking) => (

                <tr key={booking.id}>

                  <td>

                    <div className="booking-id">
                      {booking.id}
                    </div>

                    <span className="booking-date">
                      {booking.date}
                    </span>

                  </td>


                  <td>

                    <strong className="customer-name">
                      {booking.customer}
                    </strong>

                    <span className="customer-email">
                      {booking.email}
                    </span>

                  </td>


                  <td>

                    <span className="event-name">
                      {booking.event}
                    </span>

                  </td>


                  <td>
                    {booking.ticket}
                  </td>


                  <td>
                    {booking.quantity}
                  </td>


                  <td>

                    <strong>
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </strong>

                  </td>


                  <td>

                    <span
                      className={`booking-status ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>

                  </td>


                  <td>

                    <button
                      className="booking-view-btn"
                      onClick={() =>
                        alert(`Booking: ${booking.id}`)
                      }
                    >
                      View →
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredBookings.length === 0 && (

            <div className="no-bookings">
              No bookings found.
            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default Bookings;