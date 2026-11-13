
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, user, token } = useAuth();

  const dashboardPath = {
    admin: "/admin",
    organizer: "/organizer",
    customer: "/customer",
  }[user?.role?.toLowerCase()];

  const mobileMenuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    const links = menuLinksRef.current.filter(Boolean);

    const lines = [
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
    ].filter(Boolean);

    // Prevent overlapping animations
    gsap.killTweensOf([menu, ...links, ...lines]);

    if (menuOpen) {
      gsap.to(menu, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.fromTo(
        links,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.07,
          delay: 0.1,
          ease: "power3.out",
        }
      );

      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 7,
        duration: 0.3,
      });

      gsap.to(line2Ref.current, {
        opacity: 0,
        duration: 0.2,
      });

      gsap.to(line3Ref.current, {
        rotate: -45,
        y: -7,
        duration: 0.3,
      });
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
      });

      gsap.to(line2Ref.current, {
        opacity: 1,
        duration: 0.2,
      });

      gsap.to(line3Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
      });
    }

    return () => {
      gsap.killTweensOf([menu, ...links, ...lines]);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const setMenuLinkRef = (index) => (element) => {
    menuLinksRef.current[index] = element;
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <span>Manipur Events</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/categories">Categories</Link>
      </nav>

      {/* Desktop Actions */}
      <div className="nav-actions">

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {dashboardPath && (
              <Link
                to={dashboardPath}
                className="dashboard-nav-btn"
              >
                Dashboard
              </Link>
            )}

            <Link to="/contact" className="signup-btn contact-nav-btn">
              Contact Us
            </Link>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          <span ref={line1Ref}></span>
          <span ref={line2Ref}></span>
          <span ref={line3Ref}></span>
        </button>

      </div>

      {/* Mobile Navigation */}
      <nav
        id="mobile-navigation"
        ref={mobileMenuRef}
        className="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >

        {/* Main Links */}
        <div className="mobile-nav-links">

          <Link
            to="/"
            ref={setMenuLinkRef(0)}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/events"
            ref={setMenuLinkRef(1)}
            onClick={closeMenu}
          >
            Events
          </Link>

          <Link
            to="/categories"
            ref={setMenuLinkRef(2)}
            onClick={closeMenu}
          >
            Categories
          </Link>

        </div>

        {/* Mobile Actions */}
        <div className="mobile-nav-actions">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                ref={setMenuLinkRef(3)}
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/signup"
                ref={setMenuLinkRef(4)}
                className="mobile-signup"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {dashboardPath && (
                <Link
                  to={dashboardPath}
                  ref={setMenuLinkRef(3)}
                  className="mobile-dashboard"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/contact"
                ref={setMenuLinkRef(4)}
                className="mobile-signup"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </>
          )}

        </div>
      </nav>

    </header>
  );
}

export default Navbar;
