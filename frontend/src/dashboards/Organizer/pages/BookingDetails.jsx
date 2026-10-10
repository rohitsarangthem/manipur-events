
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import "./BookingDetails.css";

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

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooking() {
      if (!token) {
        setError("Please log in again to view booking details.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/bookings/organizer/${id}`,
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
            data.message || "Unable to load booking details."
          );
        }

        setBooking(data.booking);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load booking details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBooking();

    return () => controller.abort();
  }, [id, token]);

  if (loading) {
    return (
      <div className="booking-details-page">
        <div className="booking-details-message">
          Loading booking details...
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="booking-details-page">
        <Link to="/organizer/bookings" className="booking-back-link">
          ← Back to Bookings
        </Link>

        <div className="booking-details-message booking-details-error">
          {error || "Booking not found."}
        </div>

        <button
          className="booking-secondary-btn"
          onClick={() => navigate("/organizer/bookings")}
        >
          Return to Bookings
        </button>
      </div>
    );
  }

  const status = (booking.status || "pending").toLowerCase();
  const paymentStatus = (booking.paymentStatus || "pending").toLowerCase();

  return (
    <div className="booking-details-page">
      <Link to="/organizer/bookings" className="booking-back-link">
        ← Back to Bookings
      </Link>

      <header className="booking-details-heading">
        <div>
          <p className="booking-details-eyebrow">BOOKING MANAGEMENT</p>
          <h1>Booking Details</h1>
          <p className="booking-details-subtitle">
            View customer, event, ticket and payment information.
          </p>
        </div>

        <span className={`booking-detail-status status-${status}`}>
          {status}
        </span>
      </header>

      <section className="booking-reference-card">
        <div className="booking-reference-icon">▤</div>

        <div>
          <span>Booking Reference</span>
          <h2>{booking.bookingReference}</h2>
          <p>Booked on {formatDate(booking.createdAt)}</p>
        </div>
      </section>

      <div className="booking-details-grid">
        <section className="booking-info-card">
          <div className="booking-card-heading">
            <span className="booking-card-icon">♙</span>
            <div>
              <h2>Customer Information</h2>
              <p>Details of the ticket holder</p>
            </div>
          </div>

          <div className="booking-info-list">
            <div className="booking-info-row">
              <span>Customer Name</span>
              <strong>{booking.customer?.name || "—"}</strong>
            </div>

            <div className="booking-info-row">
              <span>Email Address</span>
              <strong>{booking.customer?.email || "—"}</strong>
            </div>

            <div className="booking-info-row">
              <span>Phone Number</span>
              <strong>{booking.customer?.phone || "—"}</strong>
            </div>
          </div>
        </section>

        <section className="booking-info-card">
          <div className="booking-card-heading">
            <span className="booking-card-icon">♫</span>
            <div>
              <h2>Event Information</h2>
              <p>Event associated with this booking</p>
            </div>
          </div>

          <div className="booking-info-list">
            <div className="booking-info-row">
              <span>Event Name</span>
              <strong>{booking.event?.title || "—"}</strong>
            </div>

            <div className="booking-info-row">
              <span>Event Date</span>
              <strong>{formatDate(booking.event?.eventDate)}</strong>
            </div>

            <div className="booking-info-row">
              <span>Venue</span>
              <strong>{booking.event?.venue || "—"}</strong>
            </div>

            <div className="booking-info-row">
              <span>City</span>
              <strong>{booking.event?.city || "—"}</strong>
            </div>
          </div>
        </section>

        <section className="booking-info-card booking-ticket-card">
          <div className="booking-card-heading">
            <span className="booking-card-icon">▣</span>
            <div>
              <h2>Ticket Information</h2>
              <p>Ticket quantity and pricing</p>
            </div>
          </div>

          <div className="booking-info-list">
            <div className="booking-info-row">
              <span>Ticket Type</span>
              <strong>{booking.ticketType || "General Admission"}</strong>
            </div>

            <div className="booking-info-row">
              <span>Quantity</span>
              <strong>{booking.quantity}</strong>
            </div>

            <div className="booking-info-row">
              <span>Price per Ticket</span>
              <strong>{formatCurrency(booking.unitPrice)}</strong>
            </div>
          </div>

          <div className="booking-total-row">
            <span>Total Amount</span>
            <strong>{formatCurrency(booking.totalAmount)}</strong>
          </div>
        </section>

        <section className="booking-info-card booking-payment-card">
          <div className="booking-card-heading">
            <span className="booking-card-icon">₹</span>
            <div>
              <h2>Payment Information</h2>
              <p>Booking and payment status</p>
            </div>
          </div>

          <div className="booking-info-list">
            <div className="booking-info-row">
              <span>Booking Status</span>
              <span className={`booking-detail-status status-${status}`}>
                {status}
              </span>
            </div>

            <div className="booking-info-row">
              <span>Payment Status</span>
              <span
                className={`booking-detail-status status-${paymentStatus}`}
              >
                {paymentStatus}
              </span>
            </div>

            <div className="booking-info-row">
              <span>Booking Created</span>
              <strong>{formatDate(booking.createdAt)}</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="booking-details-footer">
        <button
          className="booking-secondary-btn"
          onClick={() => navigate("/organizer/bookings")}
        >
          ← Back to All Bookings
        </button>
      </div>
    </div>
  );
}

export default BookingDetails;
