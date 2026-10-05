import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminEvents.css";

function AdminEvents() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");


  // =========================================
  // GET ALL EVENTS
  // =========================================

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/events/admin/all",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load events"
        );
      }

      setEvents(data.events || []);

    } catch (error) {
      console.error("Fetch events error:", error);

      setError(
        error.message ||
          "Unable to load events."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================
  // LOAD EVENTS WHEN PAGE OPENS
  // =========================================

  useEffect(() => {
    fetchEvents();
  }, []);


  // =========================================
  // FORMAT EVENT STATUS
  // =========================================

  const getDisplayStatus = (status) => {
    if (status === "approved") {
      return "Published";
    }

    if (status === "pending") {
      return "Pending";
    }

    if (status === "rejected") {
      return "Rejected";
    }

    if (status === "cancelled") {
      return "Cancelled";
    }

    if (status === "completed") {
      return "Completed";
    }

    return status;
  };


  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };


  // =========================================
  // FILTER EVENTS
  // =========================================

  const filteredEvents = events.filter((event) => {
    const displayStatus =
      getDisplayStatus(event.status);

    const searchText =
      search.toLowerCase();

    const matchesSearch =
      event.title
        ?.toLowerCase()
        .includes(searchText) ||

      event.organizer?.name
        ?.toLowerCase()
        .includes(searchText) ||

      event.category
        ?.toLowerCase()
        .includes(searchText) ||

      event.venue
        ?.toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      displayStatus === statusFilter;

    const matchesCategory =
      categoryFilter === "All Categories" ||
      event.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );
  });


  // =========================================
  // EVENT STATISTICS
  // =========================================

  const totalEvents = events.length;

  const publishedEvents = events.filter(
    (event) => event.status === "approved"
  ).length;

  const pendingEvents = events.filter(
    (event) => event.status === "pending"
  ).length;

  const rejectedEvents = events.filter(
    (event) => event.status === "rejected"
  ).length;


  // =========================================
  // CATEGORIES
  // =========================================

  const categories = [
    ...new Set(
      events
        .map((event) => event.category)
        .filter(Boolean)
    )
  ];


  // =========================================
  // APPROVE EVENT
  // =========================================

  const approveEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/approve`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to approve event"
        );
      }

      // Reload events
      fetchEvents();

    } catch (error) {
      console.error(
        "Approve event error:",
        error
      );

      alert(
        error.message ||
          "Failed to approve event."
      );
    }
  };


  // =========================================
  // REJECT EVENT
  // =========================================

  const rejectEvent = async (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/reject`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to reject event"
        );
      }

      // Reload events
      fetchEvents();

    } catch (error) {
      console.error(
        "Reject event error:",
        error
      );

      alert(
        error.message ||
          "Failed to reject event."
      );
    }
  };


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

          <h1>
            Events
          </h1>

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

          <span>
            Total Events
          </span>

          <strong>
            {totalEvents}
          </strong>

        </div>


        <div className="admin-events-stat">

          <span>
            Published
          </span>

          <strong>
            {publishedEvents}
          </strong>

        </div>


        <div className="admin-events-stat">

          <span>
            Pending Review
          </span>

          <strong>
            {pendingEvents}
          </strong>

        </div>


        <div className="admin-events-stat">

          <span>
            Rejected
          </span>

          <strong>
            {rejectedEvents}
          </strong>

        </div>

      </div>


      {/* =========================================
          EVENTS CARD
      ========================================= */}

      <section className="admin-events-card">

        <div className="admin-events-toolbar">

          <div>

            <p>
              ALL EVENTS
            </p>

            <h2>
              Event Listings
            </h2>

          </div>


          <div className="admin-events-filters">

            {/* SEARCH */}

            <div className="admin-events-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* STATUS FILTER */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>


            {/* CATEGORY FILTER */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >

              <option value="All Categories">
                All Categories
              </option>

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>

          </div>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="admin-events-table-wrapper">

          {loading ? (

            <p>
              Loading events...
            </p>

          ) : error ? (

            <p className="admin-event-error">
              {error}
            </p>

          ) : (

            <table className="admin-events-table">

              <thead>

                <tr>

                  <th>
                    Event
                  </th>

                  <th>
                    Organizer
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Bookings
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

                {filteredEvents.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "40px"
                      }}
                    >
                      No events found.
                    </td>

                  </tr>

                ) : (

                  filteredEvents.map((event) => {

                    const displayStatus =
                      getDisplayStatus(
                        event.status
                      );

                    return (

                      <tr key={event._id}>

                        {/* EVENT */}

                        <td>

                          <div className="admin-event-info">

                            <div className="admin-event-icon">
                              🎫
                            </div>

                            <div>

                              <strong>
                                {event.title}
                              </strong>

                              <span>
                                {event.category}
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* ORGANIZER */}

                        <td>

                          <span className="admin-event-organizer">

                            {event.organizer?.name ||
                              "Unknown"}

                          </span>

                        </td>


                        {/* DATE */}

                        <td>

                          {formatDate(
                            event.eventDate
                          )}

                        </td>


                        {/* LOCATION */}

                        <td>

                          {event.venue}

                          {event.city
                            ? `, ${event.city}`
                            : ""}

                        </td>


                        {/* BOOKINGS */}

                        <td>
                          —
                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`admin-event-status ${displayStatus.toLowerCase()}`}
                          >
                            {displayStatus}
                          </span>

                        </td>


                        {/* ACTION */}

                        <td>

                          {event.status === "pending" ? (

                            <div>

                              <button
                                className="admin-event-action"
                                onClick={() =>
                                  approveEvent(
                                    event._id
                                  )
                                }
                              >
                                Approve
                              </button>

                              <button
                                className="admin-event-action"
                                onClick={() =>
                                  rejectEvent(
                                    event._id
                                  )
                                }
                              >
                                Reject
                              </button>

                            </div>

                          ) : (

                            <button
                              className="admin-event-action"
                            >
                              View
                            </button>

                          )}

                        </td>

                      </tr>

                    );

                  })

                )}

              </tbody>

            </table>

          )}

        </div>


        {/* =========================================
            PAGINATION
        ========================================= */}

        <div className="admin-events-pagination">

          <span>
            Showing {filteredEvents.length} of{" "}
            {events.length} events
          </span>

          <div>

            <button disabled>
              ←
            </button>

            <button className="active">
              1
            </button>

            <button disabled>
              →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminEvents;