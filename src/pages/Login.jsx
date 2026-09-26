import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="login-visual">

        <div className="login-visual-overlay"></div>

        <div className="login-brand">
          <Link to="/">
            Manipur Events
          </Link>
        </div>

        <div className="login-visual-content">

          <p>YOUR NEXT EXPERIENCE AWAITS</p>

          <h1>
            Discover.
            <br />
            Book.
            <br />
            <span>Experience.</span>
          </h1>

          <p className="login-visual-description">
            Discover amazing concerts, live performances and
            unforgettable music experiences.
          </p>

        </div>

      </div>


      {/* Right Side */}
      <div className="login-form-container">

        <div className="login-form-wrapper">

          {/* Header */}
          <div className="login-header">

            <p className="login-label">
              WELCOME BACK
            </p>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Access your tickets, events and bookings.
            </p>

          </div>


          {/* Login Form */}
          <form className="login-form">

            {/* Email */}
            <div className="login-field">

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
            <div className="login-field">

              <div className="login-password-label">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />

            </div>


            {/* Remember Me */}
            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  name="remember"
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>


          {/* Divider */}
          <div className="login-divider">
            <span>OR</span>
          </div>


          {/* Google Login */}
          <button
            type="button"
            className="google-login"
          >
            <span className="google-icon">
              G
            </span>

            Continue with Google
          </button>


          {/* Sign Up */}
          <div className="login-signup">

            <p>
              Don't have an account?
              <Link to="/signup">
                Sign Up
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;