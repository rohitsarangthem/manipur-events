import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Footer.css";

function Footer() {

  const glowOneRef = useRef(null);
  const glowTwoRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {

    // Main background glow
    gsap.to(glowOneRef.current, {
      x: 120,
      y: -40,
      scale: 1.2,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });


    // Secondary glow
    gsap.to(glowTwoRef.current, {
      x: -100,
      y: 60,
      scale: 1.3,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });


    // Subtle grid movement
    gsap.to(gridRef.current, {
      y: -35,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, []);


  return (
    <footer className="site-footer">

      {/* =================================
          ANIMATED BACKGROUND
      ================================= */}

      <div className="footer-background">

        <div
          ref={glowOneRef}
          className="footer-glow footer-glow-one"
        ></div>

        <div
          ref={glowTwoRef}
          className="footer-glow footer-glow-two"
        ></div>

        <div
          ref={gridRef}
          className="footer-grid"
        ></div>

      </div>


      {/* =================================
          FOOTER CONTENT
      ================================= */}

      <div className="footer-container">


        {/* =================================
            CTA
        ================================= */}

        <div className="footer-cta">

          <p className="footer-eyebrow">
            YOUR NEXT EXPERIENCE AWAITS
          </p>

          <h2>
            Ready for your next
            <span> live experience?</span>
          </h2>

          <p className="footer-cta-text">
            Discover concerts, festivals and unforgettable
            music experiences happening around you.
          </p>

          <a
            href="/events"
            className="footer-cta-button"
          >
            Explore Events
            <span>→</span>
          </a>

        </div>


        {/* =================================
            FOOTER LINKS
        ================================= */}

        <div className="footer-links">


          {/* Brand */}

          <div className="footer-column footer-brand">

            <div className="logo-text"><a href="/" className="footer-logo">Manipur Events</a></div>

            <p>
              Discover live music, concerts and unforgettable
              experiences across Manipur.
            </p>

          </div>


          {/* Explore */}

          <div className="footer-column">

            <h3>
              Explore
            </h3>

            <a href="/events">
              Events
            </a>

            <a href="/artists">
              Artists
            </a>

            <a href="/genres">
              Music Genres
            </a>

            <a href="/venues">
              Venues
            </a>

          </div>


          {/* Support */}

          <div className="footer-column">

            <h3>
              Support
            </h3>

            <a href="/help">
              Help Center
            </a>

            <a href="/contact">
              Contact Us
            </a>

            <a href="/faq">
              FAQs
            </a>

            <a href="/terms">
              Terms & Conditions
            </a>

          </div>


          {/* Company */}

          <div className="footer-column">

            <h3>
              Company
            </h3>

            <a href="/about">
              About Us
            </a>

            <a href="/careers">
              Careers
            </a>

            <a href="/privacy">
              Privacy Policy
            </a>

            <a href="/contact">
              Contact
            </a>

          </div>

        </div>


        {/* =================================
            NEWSLETTER
        ================================= */}

        <div className="footer-newsletter">

          <div className="newsletter-content">

            <h3>
              Never miss a concert
            </h3>

            <p>
              Get the latest music events, artist announcements
              and ticket updates directly in your inbox.
            </p>

          </div>


          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
            />

            <button type="submit">
              Join
            </button>

          </form>

        </div>


        {/* =================================
            BOTTOM
        ================================= */}

        <div className="footer-bottom">

          <p>
            © 2026 Manipur Events. All rights reserved.
          </p>


          <div className="footer-bottom-links">

            <a href="/privacy">
              Privacy
            </a>

            <a href="/terms">
              Terms
            </a>

          </div>

        </div>


      </div>

    </footer>
  );
}

export default Footer;