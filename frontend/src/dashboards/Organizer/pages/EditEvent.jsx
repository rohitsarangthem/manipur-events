import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useAuth } from "../../../context/AuthContext.jsx";

import "./EditEvent.css";

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [error, setError] = useState("");

  const [imagePreview, setImagePreview] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    venue: "",
    address: "",
    city: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    ticketPrice: "",
    totalTickets: ""
  });

  // LOAD EVENT
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

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
            data.message ||
              "Failed to load event"
          );
        }

        const event = data.event;

        setFormData({
          title: event.title || "",
          description:
            event.description || "",
          category: event.category || "",
          image: event.image || "",
          venue: event.venue || "",
          address: event.address || "",
          city: event.city || "",
          eventDate: event.eventDate
            ? event.eventDate.split("T")[0]
            : "",
          startTime: event.startTime || "",
          endTime: event.endTime || "",
          ticketPrice:
            event.ticketPrice ?? "",
          totalTickets:
            event.totalTickets ?? ""
        });

        setImagePreview(event.image || "");

      } catch (error) {
        console.error(
          "Fetch edit event error:",
          error
        );

        setError(
          error.message ||
            "Unable to load event"
        );

      } finally {
        setLoading(false);
      }
    };

    if (token && eventId) {
      fetchEvent();
    }
  }, [token, eventId]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // IMAGE UPLOAD
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please upload a JPG, PNG, or WEBP image."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Image size must be less than 5MB."
      );
      return;
    }

    try {
      setUploadingImage(true);

      setImagePreview(
        URL.createObjectURL(file)
      );

      const cloudName =
        import.meta.env
          .VITE_CLOUDINARY_CLOUD_NAME;

      const uploadPreset =
        import.meta.env
          .VITE_CLOUDINARY_UPLOAD_PRESET;

      const uploadData = new FormData();

      uploadData.append("file", file);

      uploadData.append(
        "upload_preset",
        uploadPreset
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            "Image upload failed"
        );
      }

      setFormData((previous) => ({
        ...previous,
        image: data.secure_url
      }));

      setImagePreview(data.secure_url);

    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      alert(
        error.message ||
          "Failed to upload image."
      );

    } finally {
      setUploadingImage(false);
    }
  };

  // SAVE EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadingImage) {
      alert(
        "Please wait for the image to finish uploading."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/events/organizer/my-events/${eventId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            ...formData,
            ticketPrice:
              Number(formData.ticketPrice),
            totalTickets:
              Number(formData.totalTickets)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update event"
        );
      }

      alert("Event updated successfully!");

      navigate(
        `/organizer/events/${eventId}`
      );

    } catch (error) {
      console.error(
        "Update event error:",
        error
      );

      setError(
        error.message ||
          "Failed to update event"
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="edit-event-page">
        <p>Loading event...</p>
      </main>
    );
  }

  return (
    <main className="edit-event-page">

      <div className="edit-event-header">

        <div>
          <button
            className="edit-back-btn"
            type="button"
            onClick={() =>
              navigate(
                `/organizer/events/${eventId}`
              )
            }
          >
            ← Back to Manage Event
          </button>

          <h1>Edit Event</h1>

          <p>
            Update your event information
          </p>
        </div>

      </div>

      {error && (
        <div className="edit-error">
          {error}
        </div>
      )}

      <form
        className="edit-event-form"
        onSubmit={handleSubmit}
      >

        {/* IMAGE */}

        <section className="edit-card">

          <h2>Event Image</h2>

          {imagePreview && (
            <img
              className="edit-event-image"
              src={imagePreview}
              alt="Event preview"
            />
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
          />

          {uploadingImage && (
            <p>Uploading image...</p>
          )}

        </section>


        {/* BASIC INFORMATION */}

        <section className="edit-card">

          <h2>Basic Information</h2>

          <div className="edit-form-grid">

            <div className="edit-field">
              <label>
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>


            <div className="edit-field">
              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="edit-field">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
            />

          </div>

        </section>


        {/* LOCATION */}

        <section className="edit-card">

          <h2>Location</h2>

          <div className="edit-form-grid">

            <div className="edit-field">
              <label>
                Venue
              </label>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>


            <div className="edit-field">
              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

          </div>


          <div className="edit-field">

            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>

        </section>


        {/* DATE AND TIME */}

        <section className="edit-card">

          <h2>Date & Time</h2>

          <div className="edit-form-grid">

            <div className="edit-field">
              <label>
                Event Date
              </label>

              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>


            <div className="edit-field">
              <label>
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>


            <div className="edit-field">
              <label>
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>

          </div>

        </section>


        {/* TICKETS */}

        <section className="edit-card">

          <h2>Tickets</h2>

          <div className="edit-form-grid">

            <div className="edit-field">
              <label>
                Ticket Price
              </label>

              <input
                type="number"
                name="ticketPrice"
                min="0"
                value={formData.ticketPrice}
                onChange={handleChange}
                required
              />
            </div>


            <div className="edit-field">
              <label>
                Total Tickets
              </label>

              <input
                type="number"
                name="totalTickets"
                min="1"
                value={formData.totalTickets}
                onChange={handleChange}
                required
              />
            </div>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="edit-event-actions">

          <button
            type="button"
            className="edit-cancel-btn"
            onClick={() =>
              navigate(
                `/organizer/events/${eventId}`
              )
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="edit-save-btn"
            disabled={
              saving || uploadingImage
            }
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </main>
  );
}

export default EditEvent;