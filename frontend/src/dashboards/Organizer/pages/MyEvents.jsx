import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MyEvents.css";

function MyEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // GET ORGANIZER EVENTS
  // =====================================

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/events/organizer/my-events",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
        console.error("Fetch my events error:", error);

        setError(
          error.message ||
          "Unable to load your events."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [navigate]);


  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };


  // =====================================
  // GET DISPLAY STATUS
  // =====================================

  const getDisplayStatus = (status) => {
    switch (status) {
      case "approved":
        return "Published";

      case "pending":
        return "Pending";

      case "rejected":
        return "Rejected";

      case "cancelled":
        return "Cancelled";

      case "completed":
        return "Ended";

      default:
        return status;
    }
  };


  // =====================================
  // FILTER + SORT EVENTS
  // =====================================

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // -----------------------------------
    // FILTER
    // -----------------------------------

    if (activeTab === "published") {
      result = result.filter(
        (event) => event.status === "approved"
      );
    }

    if (activeTab === "pending") {
      result = result.filter(
        (event) => event.status === "pending"
      );
    }

    if (activeTab === "rejected") {
      result = result.filter(
        (event) => event.status === "rejected"
      );
    }

    if (activeTab === "ended") {
      result = result.filter(
        (event) => event.status === "completed"
      );
    }


    // -----------------------------------
    // SORT
    // -----------------------------------

    if (sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    if (sortBy === "tickets") {
      result.sort((a, b) => {
        const soldA =
          a.totalTickets - a.availableTickets;

        const soldB =
          b.totalTickets - b.availableTickets;

        return soldB - soldA;
      });
    }

    if (sortBy === "revenue") {
      result.sort((a, b) => {
        const soldA =
          a.totalTickets - a.availableTickets;

        const soldB =
          b.totalTickets - b.availableTickets;

        const revenueA =
          soldA * a.ticketPrice;

        const revenueB =
          soldB * b.ticketPrice;

        return revenueB - revenueA;
      });
    }

    return result;
  }, [events, activeTab, sortBy]);


  // =====================================
  // CREATE EVENT
  // =====================================

  const handleCreateEvent = () => {
    navigate("/organizer/events/create");
  };


  // =====================================
  // MANAGE EVENT
  // =====================================

const handleManageEvent = (eventId) => {
  navigate(`/organizer/events/${eventId}`);
};


  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <main className="organizer-events-page">

        <div className="organizer-events-loading">
          <p>Loading your events...</p>
        </div>

      </main>
    );
  }


  // =====================================
  // PAGE
  // =====================================

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
            Create, manage and track all your events
            from one place.
          </p>

        </div>

        <button
          className="create-event-btn"
          onClick={handleCreateEvent}
        >
          + Create Event
        </button>

      </section>


      {/* ================================
          ERROR
      ================================= */}

      {error && (
        <div className="organizer-events-error">
          <p>{error}</p>
        </div>
      )}


      {/* ================================
          FILTERS
      ================================= */}

      <section className="organizer-events-toolbar">

        <div className="event-tabs">

          <button
            className={`event-tab ${
              activeTab === "all" ? "active" : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Events
          </button>

          <button
            className={`event-tab ${
              activeTab === "published"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("published")
            }
          >
            Published
          </button>

          <button
            className={`event-tab ${
              activeTab === "pending"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("pending")
            }
          >
            Pending
          </button>

          <button
            className={`event-tab ${
              activeTab === "rejected"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("rejected")
            }
          >
            Rejected
          </button>

          <button
            className={`event-tab ${
              activeTab === "ended"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("ended")
            }
          >
            Ended
          </button>

        </div>


        <select
          className="event-sort"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="latest">
            Sort by: Latest
          </option>

          <option value="oldest">
            Sort by: Oldest
          </option>

          <option value="tickets">
            Sort by: Most Tickets Sold
          </option>

          <option value="revenue">
            Sort by: Revenue
          </option>
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
            {activeTab === "all" &&
              "All Events"}

            {activeTab === "published" &&
              "Published Events"}

            {activeTab === "pending" &&
              "Pending Events"}

            {activeTab === "rejected" &&
              "Rejected Events"}

            {activeTab === "ended" &&
              "Ended Events"}
          </h2>

        </div>

        <span>
          {filteredEvents.length}{" "}
          {filteredEvents.length === 1
            ? "Event"
            : "Events"}
        </span>

      </div>


      {/* ================================
          EMPTY STATE
      ================================= */}

      {!loading &&
        filteredEvents.length === 0 && (

          <section className="organizer-events-empty">

            <h3>
              No events found
            </h3>

            <p>
              You don't have any events in this
              category yet.
            </p>

            <button
              className="create-event-btn"
              onClick={handleCreateEvent}
            >
              + Create Event
            </button>

          </section>

        )}


      {/* ================================
          EVENTS LIST
      ================================= */}

      <section className="organizer-events-list">

        {filteredEvents.map((event) => {

          const ticketsSold =
            event.totalTickets -
            event.availableTickets;

          const percentage =
            event.totalTickets > 0
              ? Math.round(
                  (ticketsSold /
                    event.totalTickets) *
                    100
                )
              : 0;

          const revenue =
            ticketsSold * event.ticketPrice;


          return (

            <article
              className="organizer-event-card"
              key={event._id}
            >

              {/* IMAGE */}

              <div className="organizer-event-image">

                {event.image ? (

                  <img
                    src={event.image}
                    alt={event.title}
                  />

                ) : (

                  <div className="organizer-event-image-placeholder">
                    Event
                  </div>

                )}

              </div>


              {/* EVENT INFO */}

              <div className="organizer-event-info">

                <div className="organizer-event-status-row">

                  <span
                    className={`organizer-event-status ${
                      event.status
                    }`}
                  >
                    {getDisplayStatus(
                      event.status
                    )}
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
                    📅{" "}
                    {formatDate(
                      event.eventDate
                    )}
                  </span>

                  <span>
                    📍{" "}
                    {event.venue}
                    {event.city
                      ? `, ${event.city}`
                      : ""}
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
                    {ticketsSold} /{" "}
                    {event.totalTickets}
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
                  ₹
                  {revenue.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              {/* ACTION */}

              <div className="organizer-event-action">

                <button
                  className="manage-event-btn"
                  onClick={() =>
                    handleManageEvent(
                      event._id
                    )
                  }
                >
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