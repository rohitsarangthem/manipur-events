import { Link } from "react-router-dom";
import CustomerSidebar from "../CustomerSidebar";

import "./MyTickets.css";

const tickets = [
  {
    id: "ME-TKT-1024",
    event: "Hills Music Festival 2026",
    category: "Music Festival",
    date: "November 2, 2026",
    time: "5:00 PM",
    location: "Imphal, Manipur",
    ticketType: "VIP Ticket",
    price: "₹999",
    status: "Upcoming",
    image: "/events/hills-music.jpg",
  },

  {
    id: "ME-TKT-0982",
    event: "Neon Nights",
    category: "DJ Night",
    date: "October 25, 2026",
    time: "8:00 PM",
    location: "Imphal, Manipur",
    ticketType: "General Admission",
    price: "₹799",
    status: "Upcoming",
    image: "/events/neon-nights.jpg",
  },

  {
    id: "ME-TKT-0871",
    event: "Summer Beats 2026",
    category: "Live Music",
    date: "October 18, 2026",
    time: "7:00 PM",
    location: "Imphal, Manipur",
    ticketType: "General Admission",
    price: "₹499",
    status: "Past",
    image: "/events/summer-beats.jpg",
  },
];


function MyTickets() {
  const upcomingTickets = tickets.filter(
    (ticket) => ticket.status === "Upcoming"
  );

  const pastTickets = tickets.filter(
    (ticket) => ticket.status === "Past"
  );


  return (
    <div className="customer-dashboard">

      {/* Sidebar */}

      <CustomerSidebar />


      {/* Main */}

      <main className="customer-page-main">

        {/* Header */}

        <header className="customer-page-header">

          <div>

            <p className="customer-page-label">
              YOUR EXPERIENCE
            </p>

            <h1>
              My Tickets
            </h1>

            <p>
              View and manage all your event tickets.
            </p>

          </div>


          <Link
            to="/events"
            className="customer-page-button"
          >
            Browse Events →
          </Link>

        </header>


        {/* =================================
            UPCOMING TICKETS
        ================================= */}

        <section className="tickets-section">

          <div className="tickets-section-heading">

            <div>

              <p>
                UPCOMING
              </p>

              <h2>
                Upcoming Tickets
              </h2>

            </div>

            <span>
              {upcomingTickets.length} Tickets
            </span>

          </div>


          <div className="tickets-list">

            {upcomingTickets.map((ticket) => (

              <article
                className="ticket-card"
                key={ticket.id}
              >

                {/* Image */}

                <div className="ticket-image">

                  <img
                    src={ticket.image}
                    alt={ticket.event}
                  />

                </div>


                {/* Details */}

                <div className="ticket-details">

                  <span className="ticket-category">
                    {ticket.category}
                  </span>

                  <h3>
                    {ticket.event}
                  </h3>

                  <div className="ticket-meta">

                    <span>
                      📅 {ticket.date}
                    </span>

                    <span>
                      ⏰ {ticket.time}
                    </span>

                    <span>
                      📍 {ticket.location}
                    </span>

                  </div>

                </div>


                {/* Ticket Info */}

                <div className="ticket-info">

                  <div>

                    <small>
                      Ticket Type
                    </small>

                    <strong>
                      {ticket.ticketType}
                    </strong>

                  </div>

                  <div>

                    <small>
                      Ticket ID
                    </small>

                    <strong>
                      {ticket.id}
                    </strong>

                  </div>

                </div>


                {/* Action */}

                <div className="ticket-action">

                  <strong>
                    {ticket.price}
                  </strong>

                  <Link to={`/tickets/${ticket.id}`}>
                    View Ticket →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =================================
            PAST TICKETS
        ================================= */}

        <section className="tickets-section tickets-past-section">

          <div className="tickets-section-heading">

            <div>

              <p>
                HISTORY
              </p>

              <h2>
                Past Tickets
              </h2>

            </div>

            <span>
              {pastTickets.length} Ticket
            </span>

          </div>


          <div className="tickets-list">

            {pastTickets.map((ticket) => (

              <article
                className="ticket-card ticket-card-past"
                key={ticket.id}
              >

                <div className="ticket-image">

                  <img
                    src={ticket.image}
                    alt={ticket.event}
                  />

                </div>


                <div className="ticket-details">

                  <span className="ticket-category">
                    {ticket.category}
                  </span>

                  <h3>
                    {ticket.event}
                  </h3>

                  <div className="ticket-meta">

                    <span>
                      📅 {ticket.date}
                    </span>

                    <span>
                      📍 {ticket.location}
                    </span>

                  </div>

                </div>


                <div className="ticket-info">

                  <small>
                    Ticket ID
                  </small>

                  <strong>
                    {ticket.id}
                  </strong>

                </div>


                <div className="ticket-action">

                  <strong>
                    {ticket.price}
                  </strong>

                  <span className="ticket-completed">
                    Completed
                  </span>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyTickets;