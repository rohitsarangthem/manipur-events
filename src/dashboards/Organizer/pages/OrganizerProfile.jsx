import { useState } from "react";
import "./OrganizerProfile.css";

function OrganizerProfile() {
  const [profile, setProfile] = useState({
    firstName: "Organizer",
    lastName: "",
    email: "organizer@example.com",
    phone: "+91 98765 43210",
    organization: "Manipur Events",
    location: "Imphal, Manipur",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
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

    alert("Profile changes saved!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    alert("Password updated!");

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  return (
    <div className="organizer-profile-page">

      {/* PAGE HEADER */}
      <div className="organizer-profile-header">
        <div>
          <p className="organizer-profile-label">
            ACCOUNT SETTINGS
          </p>

          <h1>Organizer Profile</h1>

          <p>
            Manage your organizer information and account security.
          </p>
        </div>
      </div>


      {/* PROFILE GRID */}
      <div className="organizer-profile-grid">

        {/* PERSONAL INFORMATION */}
        <section className="organizer-profile-card">

          <div className="organizer-card-heading">
            <p>ORGANIZER INFORMATION</p>
            <h2>Profile Details</h2>
          </div>


          {/* PROFILE IMAGE */}
          <div className="organizer-profile-picture">

            <div className="organizer-profile-avatar">
              O
            </div>

            <div>
              <h3>Profile Picture</h3>

              <span>
                JPG, PNG or WEBP. Maximum size 2MB.
              </span>

              <button type="button">
                Change Photo
              </button>
            </div>

          </div>


          <form onSubmit={handleProfileSubmit}>

            <div className="organizer-form-divider"></div>


            {/* FIRST + LAST NAME */}
            <div className="organizer-form-row">

              <div className="organizer-form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                />
              </div>


              <div className="organizer-form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                />
              </div>

            </div>


            {/* EMAIL + PHONE */}
            <div className="organizer-form-row">

              <div className="organizer-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </div>


              <div className="organizer-form-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />
              </div>

            </div>


            {/* ORGANIZATION */}
            <div className="organizer-form-group">
              <label>Organization Name</label>

              <input
                type="text"
                name="organization"
                value={profile.organization}
                onChange={handleProfileChange}
              />
            </div>


            {/* LOCATION */}
            <div className="organizer-form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleProfileChange}
              />
            </div>


            <div className="organizer-profile-actions">
              <button type="submit">
                Save Changes →
              </button>
            </div>

          </form>

        </section>


        {/* SECURITY */}
        <section className="organizer-profile-card security-card">

          <div className="organizer-card-heading">
            <p>ACCOUNT SECURITY</p>
            <h2>Change Password</h2>
          </div>

          <p className="security-description">
            Keep your organizer account secure by using a strong,
            unique password.
          </p>


          <form onSubmit={handlePasswordSubmit}>

            {/* CURRENT PASSWORD */}
            <div className="organizer-form-group">
              <label>Current Password</label>

              <input
                type="password"
                name="current"
                placeholder="Enter current password"
                value={passwords.current}
                onChange={handlePasswordChange}
              />
            </div>


            {/* NEW PASSWORD */}
            <div className="organizer-form-group">
              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
            </div>


            {/* CONFIRM PASSWORD */}
            <div className="organizer-form-group">
              <label>Confirm New Password</label>

              <input
                type="password"
                name="confirm"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
              />
            </div>


            {/* PASSWORD REQUIREMENTS */}
            <div className="password-requirements">

              <strong>Password requirements</strong>

              <p>• At least 8 characters</p>
              <p>• Include uppercase and lowercase letters</p>
              <p>• Include at least one number</p>

            </div>


            <button
              type="submit"
              className="update-password-button"
            >
              Update Password →
            </button>

          </form>

        </section>

      </div>

    </div>
  );
}

export default OrganizerProfile;