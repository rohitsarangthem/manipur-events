import { Link } from "react-router-dom";

import "./Signup.css";

function Signup() {
  return (
    <div className="signup-page">

      {/* =========================================
          LEFT VISUAL
      ========================================= */}

      <div className="signup-visual">

        <div className="signup-brand">
          <Link to="/">
            Manipur Events
          </Link>
        </div>


        <div className="signup-visual-content">

          <p>
            YOUR NEXT EXPERIENCE STARTS HERE
          </p>

          <h1>
            Discover.
            <br />
            Book.
            <br />
            <span>Experience.</span>
          </h1>

          <p className="signup-visual-description">
            Create your account and discover concerts,
            festivals and unforgettable live experiences.
          </p>

        </div>

      </div>


      {/* =========================================
          SIGN UP FORM
      ========================================= */}

      <div className="signup-form-container">

        <div className="signup-form-wrapper">

          {/* Header */}

          <div className="signup-header">

            <p className="signup-label">
              CREATE ACCOUNT
            </p>

            <h2>
              Create your account
            </h2>

            <p>
              Sign up to discover and book amazing events.
            </p>

          </div>


          {/* Form */}

          <form className="signup-form">

            {/* Full Name */}

            <div className="signup-field">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* Email */}

            <div className="signup-field">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />

            </div>


            {/* Password */}

            <div className="signup-field">

              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                required
              />

            </div>


            {/* Confirm Password */}

            <div className="signup-field">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
              />

            </div>


            {/* Terms */}

            <label className="signup-terms">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the Terms & Conditions
                and Privacy Policy.
              </span>

            </label>


            {/* Button */}

            <button
              type="submit"
              className="signup-button"
            >
              Create Account
            </button>

          </form>


          {/* Login */}

          <div className="signup-login">

            <p>
              Already have an account?

              <Link to="/login">
                Sign In
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;