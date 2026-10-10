import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

import "./AdminSidebar.css";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    logout();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}
      <div className="admin-logo">
        Manipur Events
      </div>


      {/* ADMIN PROFILE */}
      <div className="admin-user">

        <div className="admin-avatar">
          A
        </div>

        <div>
          <strong>Administrator</strong>
          <span>Platform Admin</span>
        </div>

      </div>


      {/* MENU */}
      <div className="admin-menu">

        <p className="admin-menu-label">
          MENU
        </p>


        <Link
          to="/admin"
          className={`admin-nav-link ${
            location.pathname === "/admin" ? "active" : ""
          }`}
        >
          <span>▦</span>
          Overview
        </Link>


        <Link
          to="/admin/users"
          className={`admin-nav-link ${
            location.pathname === "/admin/users" ? "active" : ""
          }`}
        >
          <span>♙</span>
          Users
        </Link>


        <Link
          to="/admin/organizers"
          className={`admin-nav-link ${
            location.pathname === "/admin/organizers" ? "active" : ""
          }`}
        >
          <span>◉</span>
          Organizers
        </Link>


        <Link
          to="/admin/events"
          className={`admin-nav-link ${
            location.pathname === "/admin/events" ? "active" : ""
          }`}
        >
          <span>🎫</span>
          Events
        </Link>


        <Link
          to="/admin/bookings"
          className={`admin-nav-link ${
            location.pathname === "/admin/bookings" ? "active" : ""
          }`}
        >
          <span>▤</span>
          Bookings
        </Link>


        <Link
          to="/admin/payments"
          className={`admin-nav-link ${
            location.pathname === "/admin/payments" ? "active" : ""
          }`}
        >
          <span>₹</span>
          Payments
        </Link>


        <Link
          to="/admin/categories"
          className={`admin-nav-link ${
            location.pathname === "/admin/categories" ? "active" : ""
          }`}
        >
          <span>▦</span>
          Categories
        </Link>


        <Link
          to="/admin/reports"
          className={`admin-nav-link ${
            location.pathname === "/admin/reports" ? "active" : ""
          }`}
        >
          <span>📊</span>
          Reports
        </Link>

      </div>


      {/* ACCOUNT */}
      <div className="admin-account">

        <p className="admin-menu-label">
          ACCOUNT
        </p>

        {/* 
        <Link
          to="/admin/profile"
          className={`admin-nav-link ${
            location.pathname === "/admin/profile" ? "active" : ""
          }`}
        >
          <span>◯</span>
          Profile
        </Link>
        */}


        <Link
          to="/"
          className="admin-nav-link"
        >
          <span>←</span>
          Back to Website
        </Link>

      </div>


      {/* LOGOUT */}
      <div className="admin-logout">

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

export default AdminSidebar;  