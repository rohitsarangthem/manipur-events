import { useState } from "react";
import CustomerSidebar from "../CustomerSidebar";

import "./Profile.css";


function Profile() {

  const [profile, setProfile] = useState({
    firstName: "Rohit",
    lastName: "Sarangthem",
    email: "rohit@example.com",
    phone: "+91 98765 43210",
    location: "Imphal, Manipur",
  });


  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleProfileChange = (e) => {

    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });

  };


  const handlePasswordChange = (e) => {

    const { name, value } = e.target;

    setPasswords({
      ...passwords,
      [name]: value,
    });

  };


  const handleProfileSubmit = (e) => {

    e.preventDefault();

    alert("Profile updated successfully!");

  };


  const handlePasswordSubmit = (e) => {

    e.preventDefault();


    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {

      alert("Please fill in all password fields.");

      return;
    }


    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {

      alert("New passwords do not match.");

      return;
    }


    alert("Password updated successfully!");


    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  };


  return (

    <div className="customer-dashboard">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <CustomerSidebar />


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="customer-page-main profile-page">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="customer-page-header">

          <div>

            <p className="customer-page-label">
              ACCOUNT SETTINGS
            </p>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information and account security.
            </p>

          </div>

        </header>


        {/* =========================================
            PROFILE CONTENT
        ========================================= */}

        <div className="profile-layout">


          {/* =========================================
              PERSONAL INFORMATION
          ========================================= */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <p>
                  PERSONAL INFORMATION
                </p>

                <h2>
                  Profile Details
                </h2>

              </div>

            </div>


            {/* Profile Image */}

            <div className="profile-picture-section">

              <div className="profile-picture">
                R
              </div>

              <div>

                <h3>
                  Profile Picture
                </h3>

                <p>
                  JPG, PNG or WEBP. Maximum size 2MB.
                </p>

                <button
                  type="button"
                  className="profile-picture-button"
                >
                  Change Photo
                </button>

              </div>

            </div>


            {/* Profile Form */}

            <form
              className="profile-form"
              onSubmit={handleProfileSubmit}
            >

              <div className="profile-form-grid">


                {/* First Name */}

                <div className="profile-field">

                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                  />

                </div>


                {/* Last Name */}

                <div className="profile-field">

                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                  />

                </div>


                {/* Email */}

                <div className="profile-field">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />

                </div>


                {/* Phone */}

                <div className="profile-field">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />

                </div>


                {/* Location */}

                <div className="profile-field profile-field-full">

                  <label htmlFor="location">
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={profile.location}
                    onChange={handleProfileChange}
                  />

                </div>

              </div>


              <div className="profile-form-footer">

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  Save Changes →
                </button>

              </div>

            </form>

          </section>


          {/* =========================================
              SECURITY
          ========================================= */}

          <section className="profile-card security-card">

            <div className="profile-card-header">

              <div>

                <p>
                  ACCOUNT SECURITY
                </p>

                <h2>
                  Change Password
                </h2>

              </div>

            </div>


            <p className="security-description">
              Keep your account secure by using a strong,
              unique password.
            </p>


            <form
              className="password-form"
              onSubmit={handlePasswordSubmit}
            >


              {/* Current Password */}

              <div className="profile-field">

                <label htmlFor="currentPassword">
                  Current Password
                </label>

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                />

              </div>


              {/* New Password */}

              <div className="profile-field">

                <label htmlFor="newPassword">
                  New Password
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />

              </div>


              {/* Confirm Password */}

              <div className="profile-field">

                <label htmlFor="confirmPassword">
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />

              </div>


              <div className="password-requirements">

                <strong>
                  Password requirements
                </strong>

                <span>
                  • At least 8 characters
                </span>

                <span>
                  • Include uppercase and lowercase letters
                </span>

                <span>
                  • Include at least one number
                </span>

              </div>


              <button
                type="submit"
                className="password-button"
              >
                Update Password →
              </button>

            </form>

          </section>

        </div>

      </main>

    </div>

  );
}

export default Profile;