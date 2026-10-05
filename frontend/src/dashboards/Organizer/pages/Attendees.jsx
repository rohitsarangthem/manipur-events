import { useState } from "react";
import "./Attendees.css";

function Attendees() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const attendees = [
    {
      id: "ME-AT-1024",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      event: "Hills Music Festival 2026",
      ticket: "VIP Ticket",
      bookingDate: "Sep 20, 2026",
      status: "Checked In",
    },
    {
      id: "ME-AT-1023",
      name: "Priya Singh",
      email: "priya@example.com",
      event: "Neon Nights",
      ticket: "General Admission",
      bookingDate: "Sep 18, 2026",
      status: "Not Checked In",
    },
    {
      id: "ME-AT-1022",
      name: "Amit Kumar",
      email: "amit@example.com",
      event: "Summer Beats 2026",
      ticket: "General Admission",
      bookingDate: "Sep 15, 2026",
      status: "Checked In",
    },
    {
      id: "ME-AT-1021",
      name: "Anita Devi",
      email: "anita@example.com",
      event: "Hills Music Festival 2026",
      ticket: "General Admission",
      bookingDate: "Sep 12, 2026",
      status: "Not Checked In",
    },
    {
      id: "ME-AT-1020",
      name: "Rohit Singh",
      email: "rohit@example.com",
      event: "Neon Nights",
      ticket: "VIP Ticket",
      bookingDate: "Sep 10, 2026",
      status: "Checked In",
    },
  ];

  const filteredAttendees = attendees.filter((attendee) => {

    const matchesSearch =
      attendee.name.toLowerCase().includes(search.toLowerCase()) ||
      attendee.email.toLowerCase().includes(search.toLowerCase()) ||
      attendee.event.toLowerCase().includes(search.toLowerCase()) ||
      attendee.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      attendee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="attendees-page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="attendees-header">

        <div>
          <p className="attendees-label">
            ATTENDEE MANAGEMENT
          </p>

          <h1>
            Attendees
          </h1>

          <p className="attendees-subtitle">
            View and manage attendees for all your events.
          </p>
        </div>

      </div>


      {/* ================================
          STATISTICS
      ================================= */}

      <div className="attendees-stats">

        <div className="attendee-stat-card">

          <div className="attendee-stat-icon">
            👥
          </div>

          <div>
            <span>Total Attendees</span>
            <strong>5</strong>
          </div>

        </div>


        <div className="attendee-stat-card">

          <div className="attendee-stat-icon">
            ✓
          </div>

          <div>
            <span>Checked In</span>
            <strong>3</strong>
          </div>

        </div>


        <div className="attendee-stat-card">

          <div className="attendee-stat-icon">
            ◷
          </div>

          <div>
            <span>Not Checked In</span>
            <strong>2</strong>
          </div>

        </div>


        <div className="attendee-stat-card">

          <div className="attendee-stat-icon">
            🎫
          </div>

          <div>
            <span>Total Tickets</span>
            <strong>7</strong>
          </div>

        </div>

      </div>


      {/* ================================
          SEARCH / FILTER
      ================================= */}

      <div className="attendees-toolbar">

        <div className="attendee-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search attendee, event or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="attendee-filter"
        >

          <option>
            All Status
          </option>

          <option>
            Checked In
          </option>

          <option>
            Not Checked In
          </option>

        </select>

      </div>


      {/* ================================
          ATTENDEES
      ================================= */}

      <div className="attendees-section">

        <div className="attendees-section-heading">

          <div>

            <p className="attendees-label">
              YOUR ATTENDEES
            </p>

            <h2>
              All Attendees
            </h2>

          </div>

          <span>
            {filteredAttendees.length} Attendees
          </span>

        </div>


        {/* TABLE */}

        <div className="attendees-table-wrapper">

          <table className="attendees-table">

            <thead>

              <tr>

                <th>
                  ATTENDEE
                </th>

                <th>
                  EVENT
                </th>

                <th>
                  TICKET
                </th>

                <th>
                  BOOKING DATE
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredAttendees.map((attendee) => (

                <tr key={attendee.id}>

                  <td>

                    <div className="attendee-info">

                      <div className="attendee-avatar">
                        {attendee.name.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {attendee.name}
                        </strong>

                        <span>
                          {attendee.email}
                        </span>

                        <small>
                          {attendee.id}
                        </small>

                      </div>

                    </div>

                  </td>


                  <td>
                    <strong className="event-name">
                      {attendee.event}
                    </strong>
                  </td>


                  <td>
                    {attendee.ticket}
                  </td>


                  <td>
                    {attendee.bookingDate}
                  </td>


                  <td>

                    <span
                      className={`attendee-status ${
                        attendee.status === "Checked In"
                          ? "checked-in"
                          : "not-checked-in"
                      }`}
                    >
                      {attendee.status}
                    </span>

                  </td>


                  <td>

                    <button className="attendee-view-btn">
                      View →
                    </button>

                  </td>

                </tr>

              ))}


              {filteredAttendees.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="no-attendees"
                  >
                    No attendees found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Attendees;