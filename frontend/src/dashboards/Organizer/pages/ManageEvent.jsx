import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext.jsx";

import "./ManageEvent.css";

function ManageEvent() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const { token } = useAuth();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/api/events/organizer/my-events/${eventId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load event"
                    );
                }

                setEvent(data.event);

            } catch (error) {
                console.error("Fetch event error:", error);

                setError(
                    error.message || "Unable to load event"
                );

            } finally {
                setLoading(false);
            }
        };

        if (token && eventId) {
            fetchEvent();
        }
    }, [token, eventId]);

    if (loading) {
        return (
            <main className="manage-event-page">
                <div className="manage-event-loading">
                    Loading event...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="manage-event-page">
                <div className="manage-event-error">
                    <h1>Manage Event</h1>

                    <p>{error}</p>

                    <button
                        className="secondary-btn"
                        type="button"
                        onClick={() =>
                            navigate("/organizer/events")
                        }
                    >
                        ← Back to My Events
                    </button>
                </div>
            </main>
        );
    }

    if (!event) {
        return null;
    }

    const soldTickets =
        event.totalTickets - event.availableTickets;

    const revenue =
        soldTickets * event.ticketPrice;

    const formattedDate = new Date(
        event.eventDate
    ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return (
        <main className="manage-event-page">

            {/* HEADER */}

            <div className="manage-event-header">

                <div>
                    <button
                        className="back-btn"
                        type="button"
                        onClick={() =>
                            navigate("/organizer/events")
                        }
                    >
                        ← Back to My Events
                    </button>

                    <h1>Manage Event</h1>
                </div>

            </div>


            {/* EVENT HERO */}

            <section className="event-hero">

                {event.image ? (
                    <img
                        className="event-hero-image"
                        src={event.image}
                        alt={event.title}
                    />
                ) : (
                    <div className="event-hero-image">
                        No Image
                    </div>
                )}

                <div className="event-hero-content">

                    <span className="event-status">
                        ✓ {event.status}
                    </span>

                    <h2>{event.title}</h2>

                    <div className="event-info-list">

                        <div className="event-info-item">
                            📅
                            <span>
                                <strong>Date:</strong>{" "}
                                {formattedDate}
                            </span>
                        </div>

                        <div className="event-info-item">
                            🕐
                            <span>
                                <strong>Time:</strong>{" "}
                                {event.startTime}

                                {event.endTime &&
                                    ` - ${event.endTime}`}
                            </span>
                        </div>

                        <div className="event-info-item">
                            📍
                            <span>
                                <strong>Venue:</strong>{" "}
                                {event.venue}
                            </span>
                        </div>

                        <div className="event-info-item">
                            🎫
                            <span>
                                <strong>Ticket:</strong>{" "}
                                ₹{event.ticketPrice}
                            </span>
                        </div>

                    </div>

                    <div className="event-actions">

                        <button
                            className="primary-btn"
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/organizer/events/${event._id}/edit`
                                )
                            }
                        >
                            Edit Event
                        </button>

                        {/* <button
                            className="secondary-btn"
                            type="button"
                            onClick={() =>
                                navigate(`/events/${event._id}`)
                            }
                        >
                            View Public Event
                        </button> */}

                    </div>

                </div>

            </section>


            {/* TICKET OVERVIEW */}

            <section className="manage-section">

                <h2 className="manage-section-title">
                    Ticket Overview
                </h2>

                <div className="ticket-stats">

                    <div className="ticket-stat-card">
                        <div className="ticket-stat-label">
                            Total Tickets
                        </div>

                        <div className="ticket-stat-value">
                            {event.totalTickets}
                        </div>
                    </div>


                    <div className="ticket-stat-card">
                        <div className="ticket-stat-label">
                            Tickets Sold
                        </div>

                        <div className="ticket-stat-value">
                            {soldTickets}
                        </div>
                    </div>


                    <div className="ticket-stat-card">
                        <div className="ticket-stat-label">
                            Available
                        </div>

                        <div className="ticket-stat-value">
                            {event.availableTickets}
                        </div>
                    </div>


                    <div className="ticket-stat-card">
                        <div className="ticket-stat-label">
                            Revenue
                        </div>

                        <div className="ticket-stat-value">
                            ₹{revenue.toLocaleString("en-IN")}
                        </div>
                    </div>

                </div>

            </section>


            {/* EVENT DETAILS */}

            <section className="manage-section">

                <h2 className="manage-section-title">
                    Event Details
                </h2>

                <div className="event-details-card">

                    <div className="event-details-grid">

                        <div className="detail-item">
                            <span className="detail-label">
                                Category
                            </span>

                            <span className="detail-value">
                                {event.category}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                Venue
                            </span>

                            <span className="detail-value">
                                {event.venue}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                Address
                            </span>

                            <span className="detail-value">
                                {event.address || "Not provided"}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                City
                            </span>

                            <span className="detail-value">
                                {event.city}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                Event Date
                            </span>

                            <span className="detail-value">
                                {formattedDate}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                Start Time
                            </span>

                            <span className="detail-value">
                                {event.startTime}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                End Time
                            </span>

                            <span className="detail-value">
                                {event.endTime || "Not provided"}
                            </span>
                        </div>


                        <div className="detail-item">
                            <span className="detail-label">
                                Ticket Price
                            </span>

                            <span className="detail-value">
                                ₹{event.ticketPrice}
                            </span>
                        </div>

                    </div>

                </div>

            </section>


            {/* DESCRIPTION */}

            <section className="manage-section">

                <h2 className="manage-section-title">
                    Description
                </h2>

                <div className="description-card">
                    {event.description}
                </div>

            </section>

        </main>
    );
}

export default ManageEvent;