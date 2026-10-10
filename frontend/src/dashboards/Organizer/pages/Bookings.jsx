import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import "./Bookings.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function Bookings() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    totalSales: 0,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBookings() {
      if (!token) {
        setError("Please log in again to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/bookings/organizer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load bookings."
          );
        }

        setBookings(
          Array.isArray(data.bookings) ? data.bookings : []
        );

        setSummary({
          totalBookings: Number(data.summary?.totalBookings || 0),
          confirmedBookings: Number(
            data.summary?.confirmedBookings || 0
          ),
          totalSales: Number(data.summary?.totalSales || 0),
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load bookings.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => controller.abort();
  }, [token]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch = [
        booking.bookingReference,
        booking.customer?.name,
        booking.customer?.email,
        booking.event?.title,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  async function handleViewBooking(bookingId) {
    try {
      setDetailsLoading(true);
      setSelectedBooking(null);
      setError("");

      const response = await fetch(
        `${API_URL}/api/bookings/organizer/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load booking details."
        );
      }

      setSelectedBooking(data.booking);
    } catch (err) {
      setError(err.message || "Failed to load booking details.");
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <div className="organizer-bookings">
      {/* HEADER */}
      <div className="bookings-header">
        <div>
          <p className="bookings-label">BOOKING MANAGEMENT</p>
          <h1>Bookings</h1>
          <p className="bookings-description">
            View and manage ticket bookings for your events.
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="booking-stats">
        <div className="booking-stat-card">
          <div className="booking-stat-icon">▤</div>
          <div>
            <span>Total Bookings</span>
            <strong>{summary.totalBookings}</strong>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon">✓</div>
          <div>
            <span>Confirmed</span>
            <strong>{summary.confirmedBookings}</strong>
          </div>
        </div>

        <div className="booking-stat-card">
          <div className="booking-stat-icon">₹</div>
          <div>
            <span>Confirmed Sales</span>
            <strong>{formatCurrency(summary.totalSales)}</strong>
          </div>
        </div>
      </div>

      {/* BOOKINGS SECTION */}
      <div className="booking-section">
        {/* FILTERS */}
        <div className="booking-filters">
          <div className="booking-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Search customer, event or booking ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter bookings by status"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* TABLE HEADER */}
        <div className="booking-section-header">
          <div>
            <p>YOUR BOOKINGS</p>
            <h2>All Bookings</h2>
          </div>

          <span>{filteredBookings.length} Bookings</span>
        </div>

        {error && (
          <div className="bookings-message bookings-error" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="no-bookings">Loading bookings...</div>
        ) : (
          <div className="booking-table-wrapper">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Event</th>
                  <th>Ticket</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <div className="booking-id">
                        {booking.bookingReference}
                      </div>
                      <span className="booking-date">
                        {formatDate(booking.createdAt)}
                      </span>
                    </td>

                    <td>
                      <strong className="customer-name">
                        {booking.customer?.name || "Unknown customer"}
                      </strong>
                      <span className="customer-email">
                        {booking.customer?.email || "—"}
                      </span>
                    </td>

                    <td>
                      <span className="event-name">
                        {booking.event?.title || "Event unavailable"}
                      </span>
                    </td>

                    <td>{booking.ticketType}</td>
                    <td>{booking.quantity}</td>

                    <td>
                      <strong>
                        {formatCurrency(booking.totalAmount)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`booking-status ${booking.status}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="booking-view-btn"
                        onClick={() =>
                          navigate(`/organizer/bookings/${booking._id}`)
                        }
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!filteredBookings.length && (
              <div className="no-bookings">
                {bookings.length === 0
                  ? "No bookings found for your events yet."
                  : "No bookings match your search or filter."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOOKING DETAILS */}
      {detailsLoading && (
        <div className="booking-detail-overlay">
          <div className="booking-detail-modal">
            Loading booking details...
          </div>
        </div>
      )}

      {selectedBooking && (
        <div
          className="booking-detail-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedBooking(null);
            }
          }}
        >
          <section
            className="booking-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-detail-title"
          >
            <div className="booking-detail-header">
              <div>
                <p className="bookings-label">BOOKING INFORMATION</p>
                <h2 id="booking-detail-title">Booking Details</h2>
              </div>

              <button
                type="button"
                className="booking-close-btn"
                onClick={() => setSelectedBooking(null)}
                aria-label="Close booking details"
              >
                ×
              </button>
            </div>

            <div className="booking-detail-grid">
              <div>
                <span>Booking Reference</span>
                <strong>{selectedBooking.bookingReference}</strong>
              </div>

              <div>
                <span>Booking Date</span>
                <strong>{formatDate(selectedBooking.createdAt)}</strong>
              </div>

              <div>
                <span>Customer</span>
                <strong>{selectedBooking.customer?.name || "—"}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{selectedBooking.customer?.email || "—"}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{selectedBooking.customer?.phone || "—"}</strong>
              </div>

              <div>
                <span>Event</span>
                <strong>{selectedBooking.event?.title || "—"}</strong>
              </div>

              <div>
                <span>Event Date</span>
                <strong>
                  {formatDate(selectedBooking.event?.eventDate)}
                </strong>
              </div>

              <div>
                <span>Venue</span>
                <strong>
                  {[
                    selectedBooking.event?.venue,
                    selectedBooking.event?.city,
                  ].filter(Boolean).join(", ") || "—"}
                </strong>
              </div>

              <div>
                <span>Ticket Type</span>
                <strong>{selectedBooking.ticketType}</strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>{selectedBooking.quantity}</strong>
              </div>

              <div>
                <span>Unit Price</span>
                <strong>{formatCurrency(selectedBooking.unitPrice)}</strong>
              </div>

              <div>
                <span>Total Amount</span>
                <strong>{formatCurrency(selectedBooking.totalAmount)}</strong>
              </div>

              <div>
                <span>Booking Status</span>
                <strong>{selectedBooking.status}</strong>
              </div>

              <div>
                <span>Payment Status</span>
                <strong>{selectedBooking.paymentStatus}</strong>
              </div>
            </div>

            <button
              type="button"
              className="booking-close-action"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Bookings;