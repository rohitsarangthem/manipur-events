import { Link, useLocation } from "react-router-dom";
import "./CustomerSidebar.css";

function CustomerSidebar() {
  const location = useLocation();

  return (
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
            Rohit
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
          className={`customer-nav-link ${
            location.pathname === "/account" ? "active" : ""
          }`}
        >
          <span>▦</span>
          Overview
        </Link>


        <Link
          to="/account/tickets"
          className={`customer-nav-link ${
            location.pathname === "/account/tickets" ? "active" : ""
          }`}
        >
          <span>🎟</span>
          My Tickets
        </Link>


        <Link
          to="/account/orders"
          className={`customer-nav-link ${
            location.pathname === "/account/orders" ? "active" : ""
          }`}
        >
          <span>▤</span>
          My Orders
        </Link>


        {/* <Link
          to="/account/events"
          className={`customer-nav-link ${
            location.pathname === "/account/events" ? "active" : ""
          }`}
        >
          <span>◷</span>
          Upcoming Events
        </Link> */}


        {/* <Link
          to="/account/wishlist"
          className={`customer-nav-link ${
            location.pathname === "/account/wishlist" ? "active" : ""
          }`}
        >
          <span>♡</span>
          Wishlist
        </Link> */}


        <p className="customer-nav-label customer-nav-label-settings">
          ACCOUNT
        </p>


        <Link
          to="/account/profile"
          className={`customer-nav-link ${
            location.pathname === "/account/profile" ? "active" : ""
          }`}
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
  );
}

export default CustomerSidebar;