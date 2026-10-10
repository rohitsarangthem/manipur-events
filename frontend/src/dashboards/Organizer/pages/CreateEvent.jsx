import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateEvent.css";


function CreateEvent() {

  const navigate = useNavigate();


  // =========================================
  // FORM DATA
  // =========================================

  const [formData, setFormData] = useState({

    title: "",

    category: "",

    date: "",

    time: "",

    location: "",

    description: "",

    ticketType: "General Admission",

    ticketPrice: "",

    ticketQuantity: ""

  });


  // =========================================
  // IMAGE
  // =========================================

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);


  // =========================================
  // LOADING
  // =========================================

  const [loading, setLoading] = useState(false);


  // =========================================
  // FORM CHANGE
  // =========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

  };


  // =========================================
  // IMAGE CHANGE
  // =========================================

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check file type
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

    // Check file size - 5MB maximum
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    try {
      setUploadingImage(true);

      // Local preview
      setImagePreview(
        URL.createObjectURL(file)
      );

      // Cloudinary settings
      const cloudName =
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const uploadPreset =
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary configuration is missing."
        );
      }

      // Create upload data
      const uploadData = new FormData();

      uploadData.append("file", file);
      uploadData.append(
        "upload_preset",
        uploadPreset
      );

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Cloudinary error:",
          data
        );

        throw new Error(
          data.error?.message ||
          "Image upload failed."
        );
      }

      // Save Cloudinary URL
      setImage(data.secure_url);

      console.log(
        "Cloudinary image uploaded:",
        data.secure_url
      );

    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      // Remove preview if upload fails
      setImagePreview(null);
      setImage("");

      alert(
        error.message ||
        "Failed to upload image."
      );

    } finally {
      setUploadingImage(false);
    }
  };


  // =========================================
  // REMOVE IMAGE
  // =========================================

  const handleRemoveImage = () => {
    setImage("");
    setImagePreview(null);
  };


  // =========================================
  // CREATE EVENT
  // =========================================

  const handleSubmit = async () => {
    if (uploadingImage) {
      alert(
        "Please wait for the image to finish uploading."
      );
      return;
    }
    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    if (
      !formData.title ||
      !formData.category ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.description ||
      !formData.ticketPrice ||
      !formData.ticketQuantity
    ) {

      alert(
        "Please fill in all required fields."
      );

      return;

    }


    // -----------------------------------------
    // START LOADING
    // -----------------------------------------

    setLoading(true);


    try {

      // ---------------------------------------
      // GET LOGIN TOKEN
      // ---------------------------------------

      const token =
        localStorage.getItem("token");


      if (!token) {

        alert(
          "You are not logged in."
        );

        navigate("/login");

        return;

      }


      // ---------------------------------------
      // PREPARE EVENT DATA
      // ---------------------------------------

      const eventData = {

        title: formData.title,

        description: formData.description,

        category: formData.category,

        // Image upload will be added later
        image: image || "",

        // Frontend location → backend venue
        venue: formData.location,

        address: "",

        city: "Imphal",

        // Frontend date → backend eventDate
        eventDate: formData.date,

        // Frontend time → backend startTime
        startTime: formData.time,

        endTime: "",

        ticketPrice:
          Number(formData.ticketPrice),

        // Frontend ticketQuantity
        // → backend totalTickets
        totalTickets:
          Number(formData.ticketQuantity)

      };


      console.log(
        "Sending event:",
        eventData
      );


      // ---------------------------------------
      // SEND EVENT TO BACKEND
      // ---------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/events",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`

          },

          body:
            JSON.stringify(eventData)

        }
      );


      // ---------------------------------------
      // GET RESPONSE
      // ---------------------------------------

      const data =
        await response.json();


      // ---------------------------------------
      // HANDLE ERROR
      // ---------------------------------------

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to create event"
        );

      }


      // ---------------------------------------
      // SUCCESS
      // ---------------------------------------

      console.log(
        "Event created successfully:",
        data
      );


      alert(
        "Event submitted successfully! It is now waiting for admin approval."
      );


      // ---------------------------------------
      // REDIRECT
      // ---------------------------------------

      navigate(
        "/organizer/events"
      );


    } catch (error) {

      console.error(
        "Create event error:",
        error
      );


      alert(
        error.message ||
        "Unable to create event. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // SAVE DRAFT
  // =========================================

  const handleSaveDraft = () => {

    alert(
      "Draft saving will be added soon."
    );

  };


  // =========================================
  // JSX
  // =========================================

  return (

    <div className="create-event-page">


      {/* =========================================
          HEADER
      ========================================= */}

      <div className="create-event-header">

        <div>

          <p className="create-event-label">
            EVENT MANAGEMENT
          </p>

          <h1>
            Create Event
          </h1>

          <p>
            Create and publish a new event
            for your audience.
          </p>

        </div>


        <button
          type="button"
          className="back-events-btn"
          onClick={() =>
            navigate("/organizer/events")
          }
        >
          ← My Events
        </button>

      </div>


      {/* =========================================
          MAIN LAYOUT
      ========================================= */}

      <div className="create-event-layout">


        {/* =======================================
            FORM
        ======================================= */}

        <main className="create-event-form">


          {/* =====================================
              EVENT INFORMATION
          ===================================== */}

          <section className="event-form-card">

            <div className="form-card-header">

              <p>
                EVENT INFORMATION
              </p>

              <h2>
                Basic Details
              </h2>

            </div>


            {/* EVENT NAME */}

            <div className="form-group">

              <label>
                Event Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Hills Music Festival 2026"
                value={formData.title}
                onChange={handleChange}
              />

            </div>


            {/* CATEGORY + EVENT TYPE */}

            <div className="form-row">


              {/* CATEGORY */}

              <div className="form-group">

                <label>
                  Category
                  <span>*</span>
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


              {/* EVENT TYPE */}

              <div className="form-group">

                <label>
                  Event Type
                </label>

                <select>

                  <option>
                    Music Event
                  </option>

                  <option>
                    Concert
                  </option>

                  <option>
                    Festival
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
                <span>*</span>
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


          {/* =====================================
              EVENT IMAGE
          ===================================== */}

          <section className="event-form-card">

            <div className="form-card-header">

              <p>
                EVENT MEDIA
              </p>

              <h2>
                Event Banner
              </h2>

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
                    onClick={handleRemoveImage}
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
                    {uploadingImage
                      ? "Uploading image..."
                      : "Upload Event Banner"}
                    <span>
                      {uploadingImage
                        ? "Please wait while your image is being uploaded."
                        : "JPG, PNG or WEBP · Recommended 1200 × 600px"}
                    </span>
                  </strong>

                  <span>
                    JPG, PNG or WEBP ·
                    Recommended 1200 × 600px
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


          {/* =====================================
              DATE & LOCATION
          ===================================== */}

          <section className="event-form-card">

            <div className="form-card-header">

              <p>
                EVENT SCHEDULE
              </p>

              <h2>
                Date & Location
              </h2>

            </div>


            <div className="form-row">


              {/* DATE */}

              <div className="form-group">

                <label>
                  Event Date
                  <span>*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>


              {/* TIME */}

              <div className="form-group">

                <label>
                  Event Time
                  <span>*</span>
                </label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* LOCATION */}

            <div className="form-group">

              <label>
                Location
                <span>*</span>
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


          {/* =====================================
              TICKETS
          ===================================== */}

          <section className="event-form-card">

            <div className="form-card-header">

              <p>
                TICKETING
              </p>

              <h2>
                Ticket Details
              </h2>

            </div>


            <div className="form-row">


              {/* TICKET TYPE */}

              <div className="form-group">

                <label>
                  Ticket Type
                </label>

                <select
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                >

                  <option value="General Admission">
                    General Admission
                  </option>

                  <option value="VIP Ticket">
                    VIP Ticket
                  </option>

                  <option value="Early Bird">
                    Early Bird
                  </option>

                  <option value="Premium">
                    Premium
                  </option>

                </select>

              </div>


              {/* TICKET PRICE */}

              <div className="form-group">

                <label>
                  Ticket Price (₹)
                  <span>*</span>
                </label>

                <input
                  type="number"
                  name="ticketPrice"
                  placeholder="999"
                  min="0"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* AVAILABLE TICKETS */}

            <div className="form-group">

              <label>
                Available Tickets
                <span>*</span>
              </label>

              <input
                type="number"
                name="ticketQuantity"
                placeholder="500"
                min="1"
                value={formData.ticketQuantity}
                onChange={handleChange}
              />

            </div>

          </section>


          {/* =====================================
              ACTIONS
          ===================================== */}

          <div className="create-event-actions">


            {/* SAVE DRAFT */}

            <button
              type="button"
              className="draft-btn"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              Save as Draft
            </button>


            {/* PUBLISH */}

            <button
              type="button"
              className="publish-btn"
              onClick={handleSubmit}
              disabled={loading}
            >

              {loading
                ? "Submitting..."
                : "Publish Event →"}

            </button>

          </div>


        </main>


        {/* =======================================
            LIVE PREVIEW
        ======================================= */}

        <aside className="event-preview-card">

          <p className="preview-label">
            LIVE PREVIEW
          </p>


          <h3>
            {formData.title ||
              "Your Event Name"}
          </h3>


          {/* PREVIEW IMAGE */}

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


          {/* PREVIEW INFO */}

          <div className="preview-info">


            <div>

              📅

              <span>
                {formData.date ||
                  "Event date"}
              </span>

            </div>


            <div>

              🕐

              <span>
                {formData.time ||
                  "Event time"}
              </span>

            </div>


            <div>

              📍

              <span>
                {formData.location ||
                  "Event location"}
              </span>

            </div>


          </div>


          {/* PREVIEW TICKET */}

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