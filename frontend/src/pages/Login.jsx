import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import "./Login.css";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOGIN FUNCTION
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Start loading
    setLoading(true);

    try {
      // Send login request to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      // Convert response to JSON
      const data = await response.json();

      // Check if login failed
      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Login successful
      console.log("Login successful:", data);

      // ==========================================
      // SAVE LOGIN INFORMATION
      // ==========================================


      // Login successful
      console.log("Login successful:", data);

      // Save authentication information
      login(data.token, data.user);

      // ==========================================
      // REDIRECT BASED ON USER ROLE
      // ==========================================

      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else if (data.user.role === "organizer") {
        window.location.href = "/organizer";
      } else {
        window.location.href = "/account";
      }

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ==========================================
          LEFT SIDE
      ========================================== */}

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


      {/* ==========================================
          RIGHT SIDE
      ========================================== */}

      <div className="login-form-container">

        <div className="login-form-wrapper">

          {/* ==========================================
              HEADER
          ========================================== */}

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


          {/* ==========================================
              ERROR MESSAGE
          ========================================== */}

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}


          {/* ==========================================
              LOGIN FORM
          ========================================== */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>


          {/* ==========================================
              DIVIDER
          ========================================== */}

          <div className="login-divider">
            <span>OR</span>
          </div>


          {/* ==========================================
              GOOGLE LOGIN
          ========================================== */}

          <button
            type="button"
            className="google-login"
          >

            <span className="google-icon">
              G
            </span>

            Continue with Google

          </button>


          {/* ==========================================
              SIGN UP
          ========================================== */}

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