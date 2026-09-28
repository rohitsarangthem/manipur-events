import { Link } from "react-router-dom";
import CustomerSidebar from "../CustomerSidebar";

import "./MyOrders.css";


const orders = [
  {
    id: "ME-ORD-1024",
    event: "Hills Music Festival 2026",
    category: "Music Festival",
    date: "November 2, 2026",
    orderDate: "September 20, 2026",
    location: "Imphal, Manipur",
    ticketType: "VIP Ticket",
    quantity: 1,
    amount: "₹999",
    payment: "Paid",
    status: "Confirmed",
    image: "/events/hills-music.jpg",
  },

  {
    id: "ME-ORD-1023",
    event: "Neon Nights",
    category: "DJ Night",
    date: "October 25, 2026",
    orderDate: "September 15, 2026",
    location: "Imphal, Manipur",
    ticketType: "General Admission",
    quantity: 1,
    amount: "₹799",
    payment: "Paid",
    status: "Confirmed",
    image: "/events/neon-nights.jpg",
  },

  {
    id: "ME-ORD-1022",
    event: "Summer Beats 2026",
    category: "Live Music",
    date: "October 18, 2026",
    orderDate: "September 10, 2026",
    location: "Imphal, Manipur",
    ticketType: "General Admission",
    quantity: 2,
    amount: "₹998",
    payment: "Paid",
    status: "Confirmed",
    image: "/events/summer-beats.jpg",
  },

  {
    id: "ME-ORD-0987",
    event: "Imphal Indie Night",
    category: "Indie Music",
    date: "November 15, 2026",
    orderDate: "August 28, 2026",
    location: "Imphal, Manipur",
    ticketType: "General Admission",
    quantity: 1,
    amount: "₹599",
    payment: "Paid",
    status: "Confirmed",
    image: "/events/summer-beats.jpg",
  },
];


function MyOrders() {

  return (
    <div className="customer-dashboard">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <CustomerSidebar />


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="customer-page-main">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="customer-page-header">

          <div>

            <p className="customer-page-label">
              TRANSACTION HISTORY
            </p>

            <h1>
              My Orders
            </h1>

            <p>
              View and manage your ticket purchases and payments.
            </p>

          </div>


          <Link
            to="/events"
            className="customer-page-button"
          >
            Browse Events →
          </Link>

        </header>


        {/* =========================================
            ORDER SUMMARY
        ========================================= */}

        <section className="orders-summary">

          <div className="order-summary-card">

            <div className="order-summary-icon">
              ▤
            </div>

            <div>

              <span>
                Total Orders
              </span>

              <strong>
                {orders.length}
              </strong>

            </div>

          </div>


          <div className="order-summary-card">

            <div className="order-summary-icon">
              🎟
            </div>

            <div>

              <span>
                Tickets Purchased
              </span>

              <strong>
                {orders.reduce(
                  (total, order) => total + order.quantity,
                  0
                )}
              </strong>

            </div>

          </div>


          <div className="order-summary-card">

            <div className="order-summary-icon">
              ₹
            </div>

            <div>

              <span>
                Total Spent
              </span>

              <strong>
                ₹3,395
              </strong>

            </div>

          </div>

        </section>


        {/* =========================================
            ORDERS
        ========================================= */}

        <section className="orders-section">

          <div className="orders-section-heading">

            <div>

              <p>
                PURCHASE HISTORY
              </p>

              <h2>
                All Orders
              </h2>

            </div>

            <span>
              {orders.length} Orders
            </span>

          </div>


          {/* Orders */}

          <div className="orders-list">

            {orders.map((order) => (

              <article
                className="order-card"
                key={order.id}
              >

                {/* Image */}

                <div className="order-image">

                  <img
                    src={order.image}
                    alt={order.event}
                  />

                </div>


                {/* Event */}

                <div className="order-event">

                  <span className="order-category">
                    {order.category}
                  </span>

                  <h3>
                    {order.event}
                  </h3>

                  <div className="order-event-meta">

                    <span>
                      📅 {order.date}
                    </span>

                    <span>
                      📍 {order.location}
                    </span>

                  </div>

                </div>


                {/* Order Information */}

                <div className="order-details">

                  <div>

                    <small>
                      Order ID
                    </small>

                    <strong>
                      {order.id}
                    </strong>

                  </div>


                  <div>

                    <small>
                      Order Date
                    </small>

                    <strong>
                      {order.orderDate}
                    </strong>

                  </div>


                  <div>

                    <small>
                      Ticket
                    </small>

                    <strong>
                      {order.ticketType}
                    </strong>

                  </div>


                  <div>

                    <small>
                      Quantity
                    </small>

                    <strong>
                      {order.quantity}
                    </strong>

                  </div>

                </div>


                {/* Payment */}

                <div className="order-payment">

                  <div>

                    <small>
                      Total
                    </small>

                    <strong>
                      {order.amount}
                    </strong>

                  </div>


                  <span className="order-paid">
                    ✓ {order.payment}
                  </span>


                  <Link
                    to={`/account/orders/${order.id}`}
                    className="order-view-button"
                  >
                    View Order →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyOrders;