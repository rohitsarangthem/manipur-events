import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./Events.css";

function Events() {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================
  // FETCH PUBLIC EVENTS
  // =========================================

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to load events."
          );

        }


        setEvents(
          data.events || []
        );

      } catch (error) {

        console.error(
          "Fetch public events error:",
          error
        );

        setError(
          "Unable to load events. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchEvents();

  }, []);


  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {

    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  };


  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      <Navbar />


      <main className="events-page">


        {/* =================================
            PAGE HEADER
        ================================= */}

        <section className="events-header">

          <p className="events-label">
            DISCOVER LIVE MUSIC
          </p>

          <h1>
            All Events
          </h1>

          <p>
            Discover concerts, festivals and live music
            experiences happening around you.
          </p>

        </section>


        {/* =================================
            EVENTS LIST
        ================================= */}

        <section className="events-list-section">


          <div className="events-page-heading">

            <div>

              <p>
                FIND YOUR NEXT EXPERIENCE
              </p>

              <h2>
                Music Events
              </h2>

            </div>


            <span>
              {events.length} Events
            </span>

          </div>


          {/* =================================
              LOADING
          ================================= */}

          {loading && (

            <div className="events-message">

              <p>
                Loading events...
              </p>

            </div>

          )}


          {/* =================================
              ERROR
          ================================= */}

          {!loading && error && (

            <div className="events-message events-error">

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>

            </div>

          )}


          {/* =================================
              NO EVENTS
          ================================= */}

          {!loading &&
            !error &&
            events.length === 0 && (

              <div className="events-message">

                <h3>
                  No events available
                </h3>

                <p>
                  There are currently no published
                  events available.
                </p>

              </div>

            )}


          {/* =================================
              EVENTS GRID
          ================================= */}

          {!loading &&
            !error &&
            events.length > 0 && (

              <div className="events-page-grid">

                {events.map((event) => (

                  <article
                    className="event-page-card"
                    key={event._id}
                  >


                    {/* IMAGE */}

                    <div className="event-page-image">

                      {event.image ? (

                        <img
                          src={event.image}
                          alt={event.title}
                        />

                      ) : (

                        <div className="event-page-image-placeholder">
                          No Image
                        </div>

                      )}


                      <span className="event-page-category">

                        {event.category}

                      </span>

                    </div>


                    {/* CONTENT */}

                    <div className="event-page-content">


                      <h3>
                        {event.title}
                      </h3>


                      <p className="event-page-description">

                        {event.description}

                      </p>


                      <div className="event-page-info">


                        <span>
                          📅{" "}
                          {formatDate(
                            event.eventDate
                          )}
                        </span>


                        <span>
                          ⏰{" "}
                          {event.startTime}

                          {event.endTime &&
                            ` - ${event.endTime}`}
                        </span>


                        <span>
                          📍{" "}
                          {event.venue}
                          {event.city &&
                            `, ${event.city}`}
                        </span>


                      </div>


                      {/* BOTTOM */}

                      <div className="event-page-bottom">


                        <div>

                          <small>
                            From
                          </small>

                          <strong>
                            ₹
                            {Number(
                              event.ticketPrice
                            ).toLocaleString("en-IN")}
                          </strong>

                        </div>


                        <Link
                          to={`/events/${event._id}`}
                          className="event-page-button"
                        >
                          View Event →
                        </Link>


                      </div>


                    </div>

                  </article>

                ))}

              </div>

            )}

        </section>

      </main>


      <Footer />

    </>
  );
}


export default Events;