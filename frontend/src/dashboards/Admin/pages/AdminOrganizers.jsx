import { Link } from "react-router-dom";
import "./AdminOrganizers.css";

function AdminOrganizers() {
  const organizers = [
    {
      id: 1,
      name: "Manipur Live Events",
      email: "contact@manipurlive.com",
      phone: "+91 98765 43210",
      events: 12,
      joined: "Sep 20, 2026",
      status: "Approved",
    },
    {
      id: 2,
      name: "Imphal Entertainment",
      email: "hello@imphalentertainment.com",
      phone: "+91 98630 12345",
      events: 8,
      joined: "Sep 17, 2026",
      status: "Approved",
    },
    {
      id: 3,
      name: "Manipur Music Group",
      email: "info@manipurmusic.com",
      phone: "+91 98560 67890",
      events: 4,
      joined: "Sep 14, 2026",
      status: "Pending",
    },
    {
      id: 4,
      name: "North East Productions",
      email: "contact@neproductions.com",
      phone: "+91 98320 45678",
      events: 6,
      joined: "Sep 10, 2026",
      status: "Approved",
    },
    {
      id: 5,
      name: "Imphal Music House",
      email: "info@imphalmusic.com",
      phone: "+91 98220 34567",
      events: 2,
      joined: "Sep 07, 2026",
      status: "Pending",
    },
    {
      id: 6,
      name: "Valley Events",
      email: "hello@valleyevents.com",
      phone: "+91 98110 56789",
      events: 3,
      joined: "Sep 03, 2026",
      status: "Rejected",
    },
  ];

  return (
    <div className="admin-organizers">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-organizers-header">

        <div>
          <p className="admin-organizers-label">
            ORGANIZER MANAGEMENT
          </p>

          <h1>Organizers</h1>

          <p className="admin-organizers-subtitle">
            Review and manage event organizers on the platform.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-organizers-back"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =========================================
          STATS
      ========================================= */}

      <div className="admin-organizers-stats">

        <div className="admin-organizers-stat">
          <span>Total Organizers</span>
          <strong>86</strong>
        </div>

        <div className="admin-organizers-stat">
          <span>Approved</span>
          <strong>74</strong>
        </div>

        <div className="admin-organizers-stat">
          <span>Pending Approval</span>
          <strong>8</strong>
        </div>

        <div className="admin-organizers-stat">
          <span>Rejected</span>
          <strong>4</strong>
        </div>

      </div>


      {/* =========================================
          ORGANIZERS CARD
      ========================================= */}

      <section className="admin-organizers-card">

        <div className="admin-organizers-toolbar">

          <div>
            <p>REGISTERED ORGANIZERS</p>
            <h2>All Organizers</h2>
          </div>

          <div className="admin-organizers-filters">

            <div className="admin-organizers-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search organizers..."
              />

            </div>

            <select defaultValue="All">
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="admin-organizers-table-wrapper">

          <table className="admin-organizers-table">

            <thead>

              <tr>
                <th>Organizer</th>
                <th>Contact</th>
                <th>Events</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {organizers.map((organizer) => (

                <tr key={organizer.id}>

                  <td>

                    <div className="admin-organizer-info">

                      <div className="admin-organizer-avatar">
                        {organizer.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{organizer.name}</strong>
                        <span>{organizer.email}</span>
                      </div>

                    </div>

                  </td>


                  <td>

                    <span className="admin-organizer-phone">
                      {organizer.phone}
                    </span>

                  </td>


                  <td>
                    {organizer.events}
                  </td>


                  <td>
                    {organizer.joined}
                  </td>


                  <td>

                    <span
                      className={`admin-organizer-status ${organizer.status.toLowerCase()}`}
                    >
                      {organizer.status}
                    </span>

                  </td>


                  <td>

                    <button className="admin-organizer-action">
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =========================================
            PAGINATION
        ========================================= */}

        <div className="admin-organizers-pagination">

          <span>
            Showing 1–6 of 86 organizers
          </span>

          <div>

            <button disabled>
              ←
            </button>

            <button className="active">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <button>
              ...
            </button>

            <button>
              15
            </button>

            <button>
              →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminOrganizers;