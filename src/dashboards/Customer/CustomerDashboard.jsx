import { Link } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  // Dummy user data for now
  const user = {
    name: "Rohit",
    email: "rohit@example.com",
  };

  // Dummy dashboard statistics
  const stats = [
    {
      id: 1,
      label: "My Tickets",
      value: "4",
    },
    {
      id: 2,
      label: "Orders",
      value: "6",
    },
    {
      id: 3,
      label: "Upcoming Events",
      value: "2",
    },
  ];

  // Dummy upcoming event
  const upcomingEvent = {
    title: "Hills Music Festival 2026",
    category: "Music Festival",
    date: "November 2, 2026",
    time: "5:00 PM",
    location: "Imphal, Manipur",
    image: "/events/hills-music.jpg",
    ticket: "VIP Ticket",
  };

  // Dummy recent orders
  const recentOrders = [
    {
      id: "#ME1024",
      event: "Hills Music Festival 2026",
      date: "Sep 20, 2026",
      amount: "₹999",
      status: "Confirmed",
    },
    {
      id: "#ME1023",
      event: "Neon Nights",
      date: "Sep 15, 2026",
      amount: "₹799",
      status: "Confirmed",
    },
    {
      id: "#ME1022",
      event: "Summer Beats 2026",
      date: "Sep 10, 2026",
      amount: "₹499",
      status: "Confirmed",
    },
  ];

  return (
    <div className="customer-dashboard">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="customer-sidebar">

        {/* Logo */}

        <div className="customer-logo">
          <Link to="/">
            Manipur Events
          </Link>
        </div>


        {/* User */}

        <div className="customer-sidebar-user">

          <div className="customer-avatar">
            R
          </div>

          <div>
            <strong>
              {user.name}
            </strong>

            <span>
              Customer
            </span>
          </div>

        </div>


        {/* Navigation */}

        <nav className="customer-nav">

          <p className="customer-nav-label">
            MENU
          </p>

          <Link
            to="/account"
            className="customer-nav-link active"
          >
            <span>▦</span>
            Overview
          </Link>

          <Link
            to="/account/tickets"
            className="customer-nav-link"
          >
            <span>🎟</span>
            My Tickets
          </Link>

          <Link
            to="/account/orders"
            className="customer-nav-link"
          >
            <span>▤</span>
            My Orders
          </Link>

          {/* <Link
            to="/account/events"
            className="customer-nav-link"
          >
            <span>◷</span>
            Upcoming Events
          </Link> */}

          {/* <Link
            to="/account/wishlist"
            className="customer-nav-link"
          >
            <span>♡</span>
            Wishlist
          </Link> */}


          <p className="customer-nav-label customer-nav-label-settings">
            ACCOUNT
          </p>

          <Link
            to="/account/profile"
            className="customer-nav-link"
          >
            <span>◯</span>
            Profile
          </Link>

          <Link
            to="/"
            className="customer-nav-link"
          >
            <span>←</span>
            Back to Website
          </Link>

        </nav>


        {/* Logout */}

        <button className="customer-logout">
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="customer-main">

        {/* Header */}

        <header className="customer-header">

          <div>

            <p className="customer-header-label">
              CUSTOMER DASHBOARD
            </p>

            <h1>
              Welcome back, {user.name} 👋
            </h1>

            <p>
              Here's what's happening with your events and tickets.
            </p>

          </div>

          <Link
            to="/events"
            className="customer-browse-button"
          >
            Browse Events →
          </Link>

        </header>


        {/* =========================================
            STATS
        ========================================= */}

        <section className="customer-stats">

          {stats.map((stat) => (

            <div
              className="customer-stat-card"
              key={stat.id}
            >

              <div className="customer-stat-icon">
                {stat.id === 1 && "🎟"}
                {stat.id === 2 && "▤"}
                {stat.id === 3 && "◷"}
              </div>

              <div>

                <span>
                  {stat.label}
                </span>

                <strong>
                  {stat.value}
                </strong>

              </div>

            </div>

          ))}

        </section>


        {/* =========================================
            CONTENT GRID
        ========================================= */}

        <div className="customer-content-grid">


          {/* =========================================
              NEXT EVENT
          ========================================= */}

          <section className="customer-next-event">

            <div className="customer-section-heading">

              <div>

                <p>
                  YOUR NEXT EXPERIENCE
                </p>

                <h2>
                  Upcoming Event
                </h2>

              </div>

              <Link to="/account/tickets">
                View Tickets →
              </Link>

            </div>


            <div className="customer-event-card">

              <div className="customer-event-image">

                <img
                  src={upcomingEvent.image}
                  alt={upcomingEvent.title}
                />

              </div>


              <div className="customer-event-details">

                <span className="customer-event-category">
                  {upcomingEvent.category}
                </span>

                <h3>
                  {upcomingEvent.title}
                </h3>

                <div className="customer-event-meta">

                  <span>
                    📅 {upcomingEvent.date}
                  </span>

                  <span>
                    ⏰ {upcomingEvent.time}
                  </span>

                  <span>
                    📍 {upcomingEvent.location}
                  </span>

                </div>

                <div className="customer-ticket-info">

                  <div>
                    <small>
                      Ticket
                    </small>

                    <strong>
                      {upcomingEvent.ticket}
                    </strong>
                  </div>

                  <Link to="/account/tickets">
                    View Ticket
                  </Link>

                </div>

              </div>

            </div>

          </section>


          {/* =========================================
              RECENT ORDERS
          ========================================= */}

          <section className="customer-orders">

            <div className="customer-section-heading">

              <div>

                <p>
                  TRANSACTIONS
                </p>

                <h2>
                  Recent Orders
                </h2>

              </div>

              <Link to="/account/orders">
                View All →
              </Link>

            </div>


            <div className="customer-order-list">

              {recentOrders.map((order) => (

                <div
                  className="customer-order"
                  key={order.id}
                >

                  <div className="customer-order-icon">
                    🎟
                  </div>

                  <div className="customer-order-info">

                    <strong>
                      {order.event}
                    </strong>

                    <span>
                      {order.id} · {order.date}
                    </span>

                  </div>

                  <div className="customer-order-right">

                    <strong>
                      {order.amount}
                    </strong>

                    <span>
                      {order.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default CustomerDashboard;