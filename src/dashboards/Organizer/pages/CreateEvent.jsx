import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    ticketType: "General Admission",
    ticketPrice: "",
    ticketQuantity: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (status) => {
    if (!formData.title || !formData.category || !formData.date) {
      alert("Please fill in the required fields.");
      return;
    }

    const eventData = {
      ...formData,
      image,
      status,
      createdAt: new Date().toISOString(),
    };

    console.log("Event Created:", eventData);

    if (status === "Published") {
      alert("Event published successfully!");
    } else {
      alert("Event saved as draft!");
    }

    navigate("/organizer/events");
  };

  return (
    <div className="create-event-page">

      {/* HEADER */}
      <div className="create-event-header">
        <div>
          <p className="create-event-label">
            EVENT MANAGEMENT
          </p>

          <h1>Create Event</h1>

          <p>
            Create and publish a new event for your audience.
          </p>
        </div>

        <button
          className="back-events-btn"
          onClick={() => navigate("/organizer/events")}
        >
          ← My Events
        </button>
      </div>


      {/* FORM */}
      <div className="create-event-layout">

        <main className="create-event-form">


          {/* EVENT INFORMATION */}
          <section className="event-form-card">

            <div className="form-card-header">
              <p>EVENT INFORMATION</p>
              <h2>Basic Details</h2>
            </div>


            <div className="form-group">

              <label>
                Event Name <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Hills Music Festival 2026"
                value={formData.title}
                onChange={handleChange}
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Category <span>*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Music Festival">
                    Music Festival
                  </option>

                  <option value="DJ Night">
                    DJ Night
                  </option>

                  <option value="Live Music">
                    Live Music
                  </option>

                  <option value="Concert">
                    Concert
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

              </div>


              <div className="form-group">

                <label>
                  Event Type
                </label>

                <select>
                  <option>Music Event</option>
                  <option>Concert</option>
                  <option>Festival</option>
                  <option>Other</option>
                </select>

              </div>

            </div>


            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Tell people about your event..."
                value={formData.description}
                onChange={handleChange}
                rows="6"
              />

            </div>

          </section>



          {/* EVENT IMAGE */}
          <section className="event-form-card">

            <div className="form-card-header">
              <p>EVENT MEDIA</p>
              <h2>Event Banner</h2>
            </div>


            <div className="image-upload">

              {imagePreview ? (

                <div className="image-preview">

                  <img
                    src={imagePreview}
                    alt="Event preview"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </button>

                </div>

              ) : (

                <label className="upload-box">

                  <div className="upload-icon">
                    +
                  </div>

                  <strong>
                    Upload Event Banner
                  </strong>

                  <span>
                    JPG, PNG or WEBP · Recommended 1200 × 600px
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                  />

                </label>

              )}

            </div>

          </section>



          {/* DATE & LOCATION */}
          <section className="event-form-card">

            <div className="form-card-header">
              <p>EVENT SCHEDULE</p>
              <h2>Date & Location</h2>
            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Event Date <span>*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  Event Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Imphal, Manipur"
                value={formData.location}
                onChange={handleChange}
              />

            </div>

          </section>



          {/* TICKETS */}
          <section className="event-form-card">

            <div className="form-card-header">
              <p>TICKETING</p>
              <h2>Ticket Details</h2>
            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Ticket Type
                </label>

                <select
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                >
                  <option>
                    General Admission
                  </option>

                  <option>
                    VIP Ticket
                  </option>

                  <option>
                    Early Bird
                  </option>

                  <option>
                    Premium
                  </option>
                </select>

              </div>


              <div className="form-group">

                <label>
                  Ticket Price (₹)
                </label>

                <input
                  type="number"
                  name="ticketPrice"
                  placeholder="999"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>
                Available Tickets
              </label>

              <input
                type="number"
                name="ticketQuantity"
                placeholder="500"
                value={formData.ticketQuantity}
                onChange={handleChange}
              />

            </div>

          </section>



          {/* ACTIONS */}
          <div className="create-event-actions">

            <button
              type="button"
              className="draft-btn"
              onClick={() => handleSubmit("Draft")}
            >
              Save as Draft
            </button>


            <button
              type="button"
              className="publish-btn"
              onClick={() => handleSubmit("Published")}
            >
              Publish Event →
            </button>

          </div>

        </main>



        {/* RIGHT SIDE PREVIEW */}
        <aside className="event-preview-card">

          <p className="preview-label">
            LIVE PREVIEW
          </p>

          <h3>
            {formData.title || "Your Event Name"}
          </h3>

          <div className="preview-image">

            {imagePreview ? (

              <img
                src={imagePreview}
                alt="Event"
              />

            ) : (

              <span>
                Event Banner
              </span>

            )}

          </div>


          <div className="preview-info">

            <div>
              📅
              <span>
                {formData.date || "Event date"}
              </span>
            </div>

            <div>
              🕐
              <span>
                {formData.time || "Event time"}
              </span>
            </div>

            <div>
              📍
              <span>
                {formData.location || "Event location"}
              </span>
            </div>

          </div>


          <div className="preview-ticket">

            <span>
              {formData.ticketType}
            </span>

            <strong>
              ₹{formData.ticketPrice || "0"}
            </strong>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default CreateEvent;