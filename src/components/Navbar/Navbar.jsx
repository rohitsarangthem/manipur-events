import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const menuLinksRef = useRef([]);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);


  /* =========================================
     MOBILE MENU ANIMATION
  ========================================= */

  useEffect(() => {

    const menu = mobileMenuRef.current;
    const links = menuLinksRef.current;

    if (!menu) return;


    if (menuOpen) {

      /* Open menu */

      gsap.to(menu, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });


      /* Animate links */

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


      /* Hamburger → X */

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

      /* Close menu */

      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });


      /* Reset hamburger */

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


  /* =========================================
     CLOSE MOBILE MENU
  ========================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    <header className="navbar">


      {/* =====================================
          LOGO
      ===================================== */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <span>
          Manipur Events
        </span>
      </Link>



      {/* =====================================
          DESKTOP NAVIGATION
      ===================================== */}

      <nav className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/categories">
          Categories
        </Link>

        {/* <Link to="/about">
          About
        </Link> */}


      </nav>



      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="nav-actions">

        <Link
          to="/login"
          className="login-link"
        >
          Login
        </Link>


        <Link
          to="/register"
          className="signup-btn"
        >
          Sign Up
        </Link>



        {/* =================================
            MOBILE MENU BUTTON
        ================================= */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          type="button"
        >

          <span ref={line1Ref}></span>

          <span ref={line2Ref}></span>

          <span ref={line3Ref}></span>

        </button>

      </div>



      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <div
        ref={mobileMenuRef}
        className="mobile-menu"
      >

        <nav className="mobile-nav-links">


          {/* Home */}

          <Link
            to="/"
            ref={(el) => (menuLinksRef.current[0] = el)}
            onClick={closeMenu}
          >
            Home
          </Link>


          {/* Events */}

          <Link
            to="/events"
            ref={(el) => (menuLinksRef.current[1] = el)}
            onClick={closeMenu}
          >
            Events
          </Link>


          {/* Categories */}

          <Link
            to="/categories"
            ref={(el) => (menuLinksRef.current[2] = el)}
            onClick={closeMenu}
          >
            Categories
          </Link>


          {/* About */}

          <Link
            to="/about"
            ref={(el) => (menuLinksRef.current[3] = el)}
            onClick={closeMenu}
          >
            About
          </Link>


          {/* Login */}

          <Link
            to="/login"
            ref={(el) => (menuLinksRef.current[4] = el)}
            onClick={closeMenu}
          >
            Login
          </Link>


          {/* Sign Up */}

          <Link
            to="/register"
            ref={(el) => (menuLinksRef.current[5] = el)}
            onClick={closeMenu}
            className="mobile-signup"
          >
            Sign Up
          </Link>

        </nav>

      </div>

    </header>

  );

}

export default Navbar;