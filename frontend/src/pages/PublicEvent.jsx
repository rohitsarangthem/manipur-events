import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./PublicEvent.css";


function PublicEvent() {

  const { eventId } = useParams();

  const [event, setEvent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================
  // FETCH EVENT
  // =========================================

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        setLoading(true);

        setError("");


        const response = await fetch(
          `http://localhost:5000/api/events/${eventId}`
        );


        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Event not found."
          );

        }


        // Only approved events should be public

        if (
          !data.event ||
          data.event.status !== "approved"
        ) {

          throw new Error(
            "This event is not publicly available."
          );

        }


        setEvent(
          data.event
        );


      } catch (error) {

        console.error(
          "Fetch public event error:",
          error
        );

        setError(
          error.message ||
          "Unable to load event."
        );

      } finally {

        setLoading(false);

      }

    };


    if (eventId) {
      fetchEvent();
    }

  }, [eventId]);


  // =========================================
  // DATE
  // =========================================

  const formatDate = (date) => {

    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <>
        <Navbar />

        <main className="public-event-page">

          <div className="public-event-message">

            <p>
              Loading event...
            </p>

          </div>

        </main>

        <Footer />
      </>
    );

  }


  // =========================================
  // ERROR
  // =========================================

  if (error || !event) {

    return (
      <>
        <Navbar />

        <main className="public-event-page">

          <div className="public-event-message">

            <h1>
              Event Not Found
            </h1>

            <p>
              {error ||
                "This event is not available."}
            </p>

            <Link
              to="/events"
              className="public-event-back-button"
            >
              ← Back to Events
            </Link>

          </div>

        </main>

        <Footer />
      </>
    );

  }


  // =========================================
  // EVENT
  // =========================================

  return (
    <>
      <Navbar />


      <main className="public-event-page">


        <section className="public-event-container">


          {/* =================================
              IMAGE
          ================================= */}

          <div className="public-event-image">

            {event.image ? (

              <img
                src={event.image}
                alt={event.title}
              />

            ) : (

              <div className="public-event-image-placeholder">
                No Image
              </div>

            )}

          </div>


          {/* =================================
              EVENT INFORMATION
          ================================= */}

          <div className="public-event-content">


            <p className="public-event-category">
              {event.category}
            </p>


            <h1>
              {event.title}
            </h1>


            <div className="public-event-details">


              <div>
                <span>
                  📅
                </span>

                <p>
                  {formatDate(
                    event.eventDate
                  )}
                </p>
              </div>


              <div>
                <span>
                  ⏰
                </span>

                <p>

                  {event.startTime}

                  {event.endTime &&
                    ` - ${event.endTime}`}

                </p>
              </div>


              <div>
                <span>
                  📍
                </span>

                <p>

                  {event.venue}

                  {event.city &&
                    `, ${event.city}`}

                </p>
              </div>


            </div>


            <div className="public-event-ticket-info">


              <div>

                <small>
                  Ticket Price
                </small>

                <strong>
                  ₹
                  {Number(
                    event.ticketPrice
                  ).toLocaleString("en-IN")}
                </strong>

              </div>


              <div>

                <small>
                  Tickets Available
                </small>

                <strong>
                  {event.availableTickets}
                </strong>

              </div>


            </div>


            <button
              type="button"
              className="public-event-buy-button"
              disabled={
                event.availableTickets <= 0
              }
            >

              {event.availableTickets > 0
                ? "Buy Tickets"
                : "Sold Out"}

            </button>


          </div>


        </section>


        {/* =================================
            DESCRIPTION
        ================================= */}

        <section className="public-event-description">

          <p className="public-event-section-label">
            ABOUT THIS EVENT
          </p>

          <h2>
            About This Event
          </h2>

          <p>
            {event.description}
          </p>

        </section>


        {/* =================================
            LOCATION
        ================================= */}

        <section className="public-event-location">

          <p className="public-event-section-label">
            LOCATION
          </p>

          <h2>
            Location
          </h2>


          <div className="public-event-location-card">

            <strong>
              {event.venue}
            </strong>

            {event.address && (

              <span>
                {event.address}
              </span>

            )}

            <span>
              {event.city}
            </span>

          </div>

        </section>


        <div className="public-event-bottom">

          <Link to="/events">
            ← Back to All Events
          </Link>

        </div>


      </main>


      <Footer />

    </>
  );
}


export default PublicEvent;