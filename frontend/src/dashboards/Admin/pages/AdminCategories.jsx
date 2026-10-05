import { Link } from "react-router-dom";
import "./AdminCategories.css";

function AdminCategories() {
  const categories = [
    {
      id: 1,
      name: "Rock",
      description: "Rock concerts and live performances",
      events: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "EDM",
      description: "Electronic dance music events",
      events: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Pop",
      description: "Pop music concerts and shows",
      events: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Indie",
      description: "Independent music performances",
      events: 6,
      status: "Active",
    },
    {
      id: 5,
      name: "Hip-Hop",
      description: "Hip-hop and rap events",
      events: 9,
      status: "Active",
    },
    {
      id: 6,
      name: "Bollywood",
      description: "Bollywood music and live shows",
      events: 11,
      status: "Active",
    },
    {
      id: 7,
      name: "Classical",
      description: "Classical music performances",
      events: 5,
      status: "Active",
    },
    {
      id: 8,
      name: "Folk",
      description: "Traditional and folk music events",
      events: 7,
      status: "Inactive",
    },
  ];

  return (
    <div className="admin-categories">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-categories-header">

        <div>
          <p className="admin-categories-label">
            CATEGORY MANAGEMENT
          </p>

          <h1>Categories</h1>

          <p className="admin-categories-subtitle">
            Manage music and event categories across the platform.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-categories-back"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =========================================
          STATS
      ========================================= */}

      <div className="admin-categories-stats">

        <div className="admin-category-stat">
          <span>Total Categories</span>
          <strong>8</strong>
          <small>All categories</small>
        </div>

        <div className="admin-category-stat">
          <span>Active Categories</span>
          <strong>7</strong>
          <small>Currently available</small>
        </div>

        <div className="admin-category-stat">
          <span>Events Using Categories</span>
          <strong>73</strong>
          <small>Published events</small>
        </div>

        <div className="admin-category-stat">
          <span>Added This Month</span>
          <strong>2</strong>
          <small>New categories</small>
        </div>

      </div>


      {/* =========================================
          CATEGORY LIST
      ========================================= */}

      <section className="admin-categories-card">

        <div className="admin-categories-toolbar">

          <div>
            <p>EVENT CATEGORIES</p>
            <h2>All Categories</h2>
          </div>

          <div className="admin-categories-actions">

            <div className="admin-categories-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search categories..."
              />

            </div>

            <select defaultValue="All">
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button className="admin-add-category">
              + Add Category
            </button>

          </div>

        </div>


        {/* =========================================
            TABLE
        ========================================= */}

        <div className="admin-categories-table-wrapper">

          <table className="admin-categories-table">

            <thead>

              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Events</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (

                <tr key={category.id}>

                  {/* Category */}

                  <td>

                    <div className="admin-category-name">

                      <div className="admin-category-icon">
                        {category.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{category.name}</strong>
                        <span>
                          Category #{category.id}
                        </span>
                      </div>

                    </div>

                  </td>


                  {/* Description */}

                  <td>

                    <span className="admin-category-description">
                      {category.description}
                    </span>

                  </td>


                  {/* Events */}

                  <td>

                    <strong className="admin-category-events">
                      {category.events}
                    </strong>

                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={`admin-category-status ${category.status.toLowerCase()}`}
                    >
                      {category.status}
                    </span>

                  </td>


                  {/* Action */}

                  <td>

                    <div className="admin-category-buttons">

                      <button>
                        Edit
                      </button>

                      <button>
                        View
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =========================================
            PAGINATION
        ========================================= */}

        <div className="admin-categories-pagination">

          <span>
            Showing 1–8 of 8 categories
          </span>

          <div>

            <button disabled>
              ←
            </button>

            <button className="active">
              1
            </button>

            <button disabled>
              →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminCategories;