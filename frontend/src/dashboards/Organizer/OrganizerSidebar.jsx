import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./OrganizerSidebar.css";


function OrganizerSidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    logout();

    navigate("/login");

  };


  return (

    <aside className="organizer-sidebar">

      {/* =========================================
          LOGO
      ========================================= */}

      <div className="organizer-logo">
        Manipur Events
      </div>


      {/* =========================================
          ORGANIZER PROFILE
      ========================================= */}

      <div className="organizer-user">

        <div className="organizer-avatar">
          O
        </div>

        <div>

          <strong>
            Organizer
          </strong>

          <span>
            Event Organizer
          </span>

        </div>

      </div>


      {/* =========================================
          MENU
      ========================================= */}

      <div className="organizer-menu">

        <p className="organizer-menu-label">
          MENU
        </p>


        <Link
          to="/organizer"
          className={`organizer-nav-link ${
            location.pathname === "/organizer"
              ? "active"
              : ""
          }`}
        >
          <span>▦</span>
          Overview
        </Link>


        <Link
          to="/organizer/events"
          className={`organizer-nav-link ${
            location.pathname === "/organizer/events"
              ? "active"
              : ""
          }`}
        >
          <span>🎫</span>
          My Events
        </Link>


        <Link
          to="/organizer/events/create"
          className={`organizer-nav-link ${
            location.pathname === "/organizer/events/create"
              ? "active"
              : ""
          }`}
        >
          <span>＋</span>
          Create Event
        </Link>


        <Link
          to="/organizer/bookings"
          className={`organizer-nav-link ${
            location.pathname === "/organizer/bookings"
              ? "active"
              : ""
          }`}
        >
          <span>▤</span>
          Bookings
        </Link>


        <Link
          to="/organizer/attendees"
          className={`organizer-nav-link ${
            location.pathname === "/organizer/attendees"
              ? "active"
              : ""
          }`}
        >
          <span>♙</span>
          Attendees
        </Link>


        <Link
          to="/organizer/revenue"
          className={`organizer-nav-link ${
            location.pathname === "/organizer/revenue"
              ? "active"
              : ""
          }`}
        >
          <span>₹</span>
          Revenue
        </Link>

      </div>


      {/* =========================================
          ACCOUNT
      ========================================= */}

      <div className="organizer-account">

        <p className="organizer-menu-label">
          ACCOUNT
        </p>


        <Link
          to="/organizer/profile"
          className={`organizer-nav-link ${
            location.pathname === "/organizer/profile"
              ? "active"
              : ""
          }`}
        >
          <span>◯</span>
          Profile
        </Link>


        <Link
          to="/"
          className="organizer-nav-link"
        >
          <span>←</span>
          Back to Website
        </Link>

      </div>


      {/* =========================================
          LOGOUT
      ========================================= */}

      <div className="organizer-logout">

        <button
          type="button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>

  );
}


export default OrganizerSidebar;