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

  console.log("Navbar authentication:", {
    isAuthenticated,
    user,
    tokenExists: !!token,
  });



  const mobileMenuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    const links = menuLinksRef.current.filter(Boolean);

    if (menuOpen) {
      gsap.to(menu, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.fromTo(
        links,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.1,
          ease: "power3.out",
        }
      );

      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 7,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(line2Ref.current, {
        opacity: 0,
        duration: 0.2,
      });

      gsap.to(line3Ref.current, {
        rotate: -45,
        y: -7,
        duration: 0.3,
        ease: "power2.out",
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
  }, [menuOpen, isAuthenticated]);

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
      <nav className="nav-links">
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/events" onClick={closeMenu}>
          Events
        </Link>

        <Link to="/categories" onClick={closeMenu}>
          Categories
        </Link>
      </nav>

      {/* Desktop Actions */}

      {/* Desktop Actions */}
      <div className="nav-actions">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="login-link"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
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
                className="dashboard-nav-btn"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/contact"
              className="signup-btn contact-nav-btn"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          type="button"
        >
          <span ref={line1Ref}></span>
          <span ref={line2Ref}></span>
          <span ref={line3Ref}></span>
        </button>
      </div>


      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu"
        aria-hidden={!menuOpen}
      >
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
    </header>
  );
}

export default Navbar;