

//// UserDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCamera, FaEdit, FaSave } from "react-icons/fa";
import "./UserDetailsPage.css";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);

  // Fetch user data based on role
  useEffect(() => {
    const userRole = localStorage.getItem("userRole"); // "student" or "parent"
    let storedData = null;

    if (userRole === "student") {
      storedData = localStorage.getItem("studentData");
    } else if (userRole === "parent") {
      storedData = localStorage.getItem("parentData");
    }

    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  // Logout function
 const handleLogout = () => {
  // ❌ Do NOT remove studentData/parentData here
  localStorage.removeItem("userRole"); 
  localStorage.removeItem("userToken");
  navigate("/");
};


  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated data
  const handleSave = () => {
    setEditMode(false);
    const updatedData = tempAvatar
      ? { ...userData, avatar: tempAvatar }
      : userData;

    setUserData(updatedData);

    if (userData.role === "student") {
      localStorage.setItem("studentData", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("parentData", JSON.stringify(updatedData));
    }
  };

  // Avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return (
      <div className="user-details-container">
        <div className="loading">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <motion.div
        className="user-details-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="user-details-header">
          <h1>User Details</h1>
          <div className="header-buttons">
            <button className="back-button" onClick={() => navigate(-1)}>
              &larr; Back
            </button>
            <button className="logout-button-page" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="user-details-content">
          <div className="avatar-section">
            <div className="user-avatar">
              {userData.avatar || tempAvatar ? (
                <img
                  src={tempAvatar || userData.avatar}
                  alt="User Avatar"
                  className="avatar-img"
                />
              ) : (
                <span>{userData.firstName?.charAt(0) || "U"}</span>
              )}
              {editMode && (
                <label className="avatar-upload">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
            {editMode ? (
              <div className="name-inputs">
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
            ) : (
              <h2>
                {userData.firstName} {userData.lastName}
              </h2>
            )}
            <p className="user-role">
              {userData.role === "student" ? "Student" : "Parent"}
            </p>
          </div>

          <div className="details-section">
            <h3>Personal Information</h3>
            {[
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "User Name", name: "userName" },
              ...(userData.role === "student"
                ? [
                    { label: "Grade", name: "grade" },
                 
                    { label: "Course", name: "course" },
                  ]
                : []),
              { label: "Address", name: "address" },
            ].map((field) => (
              <div className="detail-row" key={field.name}>
                <span className="detail-label">{field.label}:</span>
                {editMode ? (
                  <input
                    type="text"
                    name={field.name}
                    value={userData[field.name] || ""}
                    onChange={handleInputChange}
                    placeholder={field.label}
                  />
                ) : (
                  <span className="detail-value">
                    {userData[field.name] || "Not provided"}
                  </span>
                )}
              </div>
            ))}

            {userData.role === "student" && (
              <section className="parent-info-section">
                <h3>Parent/Guardian Information</h3>
                {[
                  { label: "Parent Name", key: "parentName" },
                  { label: "Parent Email", key: "parentEmail" },
                  { label: "Parent Phone", key: "parentPhone" },
                ].map(({ label, key }) => (
                  <div className="detail-row" key={key}>
                    <span className="detail-label">{label}:</span>
                    {editMode ? (
                      <input
                        type="text"
                        name={key}
                        value={userData[key] || ""}
                        onChange={handleInputChange}
                        placeholder={`Enter ${label}`}
                      />
                    ) : (
                      <span className="detail-value">
                        {userData[key] || "Not provided"}
                      </span>
                    )}
                  </div>
                ))}
              </section>
            )}

            <div className="edit-save-buttons">
              {editMode ? (
                <button className="save-button" onClick={handleSave}>
                  <FaSave /> Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => setEditMode(true)}
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsPage;









