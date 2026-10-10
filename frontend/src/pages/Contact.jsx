import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // This is frontend-only for now.
    // Connect an email service or backend to send messages.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero">
          <p className="contact-label">
            WE'RE HERE TO HELP
          </p>

          <h1>Contact Us</h1>

          <p>
            Have a question about an event, tickets, or
            your account? We'd love to hear from you.
          </p>
        </section>

        <section className="contact-content">
          <div className="contact-info">
            <p className="contact-label">
              GET IN TOUCH
            </p>

            <h2>
              Let's talk about your next experience.
            </h2>

            <p className="contact-description">
              Whether you need help with a booking or
              want to know more about Manipur Events,
              send us a message using the form.
            </p>

            <div className="contact-info-card">
              <span className="contact-icon">✉</span>

              <div>
                <h3>Email Support</h3>
                <p>
                  Send us your questions through the
                  contact form.
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-icon">♫</span>

              <div>
                <h3>Event Support</h3>
                <p>
                  Need help with an event or ticket?
                  Include the event name in your message.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h2>Send us a message</h2>

            <p className="contact-form-description">
              Fill in the details below.
            </p>

            {submitted && (
              <p
                className="contact-success"
                role="status"
              >
                Your form was submitted in this demo.
                Message delivery is not configured yet.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Full Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email Address
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
              >
                Submit Message →
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;