import { Link } from "react-router-dom";
import "./AdminUsers.css";

function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      role: "Customer",
      joined: "Sep 24, 2026",
      bookings: 8,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@gmail.com",
      role: "Customer",
      joined: "Sep 21, 2026",
      bookings: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@gmail.com",
      role: "Customer",
      joined: "Sep 18, 2026",
      bookings: 2,
      status: "Blocked",
    },
    {
      id: 4,
      name: "Anita Devi",
      email: "anita.devi@gmail.com",
      role: "Customer",
      joined: "Sep 15, 2026",
      bookings: 11,
      status: "Active",
    },
    {
      id: 5,
      name: "Rakesh Meitei",
      email: "rakesh.meitei@gmail.com",
      role: "Customer",
      joined: "Sep 12, 2026",
      bookings: 4,
      status: "Active",
    },
    {
      id: 6,
      name: "Neha Sharma",
      email: "neha.sharma@gmail.com",
      role: "Customer",
      joined: "Sep 08, 2026",
      bookings: 7,
      status: "Inactive",
    },
  ];

  return (
    <div className="admin-users">

      {/* PAGE HEADER */}
      <div className="admin-users-header">
        <div>
          <p className="admin-users-label">USER MANAGEMENT</p>
          <h1>Users</h1>
          <p className="admin-users-subtitle">
            Manage customers and registered users on the platform.
          </p>
        </div>

        <Link to="/admin" className="admin-users-back">
          ← Dashboard
        </Link>
      </div>

      {/* STATS */}
      <div className="admin-users-stats">

        <div className="admin-users-stat">
          <span>Total Users</span>
          <strong>1,248</strong>
        </div>

        <div className="admin-users-stat">
          <span>Active Users</span>
          <strong>1,184</strong>
        </div>

        <div className="admin-users-stat">
          <span>New This Month</span>
          <strong>146</strong>
        </div>

        <div className="admin-users-stat">
          <span>Blocked Users</span>
          <strong>18</strong>
        </div>

      </div>

      {/* USERS TABLE */}
      <section className="admin-users-card">

        <div className="admin-users-toolbar">

          <div>
            <p>REGISTERED USERS</p>
            <h2>All Users</h2>
          </div>

          <div className="admin-users-filters">

            <div className="admin-users-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search users..."
              />
            </div>

            <select defaultValue="All">
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>

          </div>

        </div>

        <div className="admin-users-table-wrapper">

          <table className="admin-users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Bookings</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td>
                    <div className="admin-user-info">

                      <div className="admin-user-avatar">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="admin-user-role">
                      {user.role}
                    </span>
                  </td>

                  <td>{user.joined}</td>

                  <td>{user.bookings}</td>

                  <td>
                    <span
                      className={`admin-user-status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <button className="admin-user-action">
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <div className="admin-users-pagination">

          <span>Showing 1–6 of 1,248 users</span>

          <div>
            <button disabled>←</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>208</button>
            <button>→</button>
          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminUsers;