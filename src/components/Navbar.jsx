import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const menuLinksRef = useRef([]);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    const links = menuLinksRef.current;

    if (menuOpen) {
      // Open mobile menu
      gsap.to(menu, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      // Animate menu links
      gsap.fromTo(
        links,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.1,
          ease: "power3.out",
        }
      );

      // Hamburger → X
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
      // Close mobile menu
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Reset hamburger
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
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <a href="/" className="navbar-logo">
        <span>Manipur Events</span>
      </a>

      {/* Desktop Navigation */}
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/categories">Categories</a>
        <a href="/about">About</a>
      </nav>

      {/* Right Side */}
      <div className="nav-actions">

        <a href="/login" className="login-link">
          Login
        </a>

        <a href="/register" className="signup-btn">
          Sign Up
        </a>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span ref={line1Ref}></span>
          <span ref={line2Ref}></span>
          <span ref={line3Ref}></span>
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu"
      >
        <nav className="mobile-nav-links">

          <a
            href="/"
            ref={(el) => (menuLinksRef.current[0] = el)}
            onClick={closeMenu}
          >
            Home
          </a>

          <a
            href="/events"
            ref={(el) => (menuLinksRef.current[1] = el)}
            onClick={closeMenu}
          >
            Events
          </a>

          <a
            href="/categories"
            ref={(el) => (menuLinksRef.current[2] = el)}
            onClick={closeMenu}
          >
            Categories
          </a>

          <a
            href="/about"
            ref={(el) => (menuLinksRef.current[3] = el)}
            onClick={closeMenu}
          >
            About
          </a>

          <a
            href="/login"
            ref={(el) => (menuLinksRef.current[4] = el)}
            onClick={closeMenu}
          >
            Login
          </a>

          <a
            href="/register"
            ref={(el) => (menuLinksRef.current[5] = el)}
            onClick={closeMenu}
            className="mobile-signup"
          >
            Sign Up
          </a>

        </nav>
      </div>

    </header>
  );
}

export default Navbar;