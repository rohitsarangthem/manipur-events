import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import eventData from "../data/eventData";

function Events() {
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
            EVENTS
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
              {eventData.length} Events
            </span>

          </div>


          <div className="events-page-grid">

            {eventData.map((event) => (

              <article
                className="event-page-card"
                key={event.id}
              >

                {/* Image */}

                <div className="event-page-image">

                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <span className="event-page-category">
                    {event.category}
                  </span>

                </div>


                {/* Content */}

                <div className="event-page-content">

                  <h3>
                    {event.title}
                  </h3>

                  <p className="event-page-description">
                    {event.description}
                  </p>


                  <div className="event-page-info">

                    <span>
                      📅 {event.date}
                    </span>

                    <span>
                      ⏰ {event.time}
                    </span>

                    <span>
                      📍 {event.location}
                    </span>

                  </div>


                  {/* Bottom */}

                  <div className="event-page-bottom">

                    <div>

                      <small>
                        From
                      </small>

                      <strong>
                        ₹{event.price}
                      </strong>

                    </div>


                    <Link
                      to={`/events/${event.id}`}
                      className="event-page-button"
                    >
                      View Event →
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Events;