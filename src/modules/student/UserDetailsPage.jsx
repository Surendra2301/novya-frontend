
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCamera, FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./UserDetailsPage.css";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);

  // ✅ Fetch data from localStorage only
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const storedUserData = localStorage.getItem("userData");
   
    let storedData = null;

    if (userRole === "student") {
      storedData = localStorage.getItem("studentData");
    } else if (userRole === "parent") {
      storedData = localStorage.getItem("parentData");
    }

    const defaultUserData = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userName: "",
      grade: "",
      school: "",
      course: "",
      address: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      role: userRole || "student",
      reward_points: 0,
      avatar: null,
      date_of_birth: "",
      bio: ""
    };

    // Try to parse stored user data first
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        setUserData({ ...defaultUserData, ...parsed });
        return;
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }

    // Fallback to role-specific data
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setUserData({ ...defaultUserData, ...parsed });
      } catch (error) {
        console.error("Error parsing stored data:", error);
        setUserData(defaultUserData);
      }
    } else {
      setUserData(defaultUserData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    localStorage.removeItem("studentData");
    localStorage.removeItem("parentData");
    localStorage.removeItem("studentId");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updates to localStorage only
  const handleSave = () => {
    const updatedData = tempAvatar
      ? { ...userData, avatar: tempAvatar }
      : userData;

    setUserData(updatedData);
    setEditMode(false);

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedData));
   
    if (updatedData.role === "student") {
      localStorage.setItem("studentData", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("parentData", JSON.stringify(updatedData));
    }

    // Show success message
    alert("Profile updated successfully!");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return (
      <div className="user-details-container">
        <div className="loading">
          {t("userDetails.loading", "Loading user data...")}
        </div>
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
          <h1>{t("userDetails.title", "User Details")}</h1>
          <div className="header-buttons">
            <button className="back-button" onClick={() => navigate(-1)}>
              <FaArrowLeft /> {t("userDetails.back", "Back")}
            </button>
            <button className="logout-button-page" onClick={handleLogout}>
              {t("navbar.logout", "Logout")}
            </button>
          </div>
        </div>

        <div className="user-details-content">
          <div className="avatar-section">
            <div className="user-avatar">
              {userData.avatar || tempAvatar ? (
                <img
                  src={tempAvatar || userData.avatar}
                  alt={t("userDetails.avatarAlt", "User Avatar")}
                  className="avatar-img"
                />
              ) : (
                <span className="avatar-initial">
                  {userData.firstName?.charAt(0) || userData.username?.charAt(0) || "U"}
                </span>
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
                  placeholder={t("userDetails.firstNamePlaceholder", "First Name")}
                />
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName || ""}
                  onChange={handleInputChange}
                  placeholder={t("userDetails.lastNamePlaceholder", "Last Name")}
                />
              </div>
            ) : (
              <div className="name-display">
                <h2>
                  {userData.firstName || userData.first_name} {userData.lastName || userData.last_name}
                </h2>
                <p className="username">@{userData.userName || userData.username}</p>
              </div>
            )}
           
            <p className="user-role">
              {userData.role === "student"
                ? t("userDetails.studentRole", "Student")
                : t("userDetails.parentRole", "Parent")}
            </p>

            {userData.reward_points > 0 && (
              <div className="reward-badge">
                🎯 {userData.reward_points} Reward Points
              </div>
            )}
          </div>

          <div className="details-section">
            <h3>{t("userDetails.personalInfo", "Personal Information")}</h3>
           
            {[
              { label: t("userDetails.email", "Email"), name: "email", type: "email" },
              { label: t("userDetails.phone", "Phone"), name: "phone", type: "tel" },
              { label: t("userDetails.userName", "Username"), name: "userName", type: "text" },
              { label: t("userDetails.bio", "About Me"), name: "bio", type: "textarea" },
              { label: t("userDetails.dateOfBirth", "Date of Birth"), name: "date_of_birth", type: "date" },
            ].map((field) => (
              <div className="detail-row" key={field.name}>
                <span className="detail-label">{field.label}:</span>
                {editMode ? (
                  field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={userData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.label}
                      rows="3"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={userData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.label}
                    />
                  )
                ) : (
                  <span className="detail-value">
                    {userData[field.name] ||
                      t("userDetails.notProvided", "Not provided")}
                  </span>
                )}
              </div>
            ))}

            {userData.role === "student" && (
              <>
                <h4>{t("userDetails.academicInfo", "Academic Information")}</h4>
                {[
                  { label: t("userDetails.grade", "Grade"), name: "grade" },
                  { label: t("userDetails.school", "School"), name: "school" },
                  { label: t("userDetails.course", "Course"), name: "course" },
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
                        {userData[field.name] ||
                          t("userDetails.notProvided", "Not provided")}
                      </span>
                    )}
                  </div>
                ))}
              </>
            )}

            <div className="detail-row">
              <span className="detail-label">{t("userDetails.address", "Address")}:</span>
              {editMode ? (
                <textarea
                  name="address"
                  value={userData.address || ""}
                  onChange={handleInputChange}
                  placeholder={t("userDetails.address", "Address")}
                  rows="3"
                />
              ) : (
                <span className="detail-value">
                  {userData.address ||
                    t("userDetails.notProvided", "Not provided")}
                </span>
              )}
            </div>

            {userData.role === "student" && (
              <section className="parent-info-section">
                <h3>{t("userDetails.parentInfo", "Parent/Guardian Information")}</h3>
                {[
                  { label: t("userDetails.parentName", "Parent Name"), key: "parentName" },
                  { label: t("userDetails.parentEmail", "Parent Email"), key: "parentEmail" },
                  { label: t("userDetails.parentPhone", "Parent Phone"), key: "parentPhone" },
                ].map(({ label, key }) => (
                  <div className="detail-row" key={key}>
                    <span className="detail-label">{label}:</span>
                    {editMode ? (
                      <input
                        type="text"
                        name={key}
                        value={userData[key] || ""}
                        onChange={handleInputChange}
                        placeholder={t("userDetails.enterField", "Enter {{field}}", { field: label })}
                      />
                    ) : (
                      <span className="detail-value">
                        {userData[key] ||
                          t("userDetails.notProvided", "Not provided")}
                      </span>
                    )}
                  </div>
                ))}
              </section>
            )}

            <div className="edit-save-buttons">
              {editMode ? (
                <div className="button-group">
                  <button className="save-button" onClick={handleSave}>
                    <FaSave /> {t("userDetails.save", "Save Changes")}
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setEditMode(false);
                      setTempAvatar(null);
                    }}
                  >
                    {t("userDetails.cancel", "Cancel")}
                  </button>
                </div>
              ) : (
                <button className="edit-button" onClick={() => setEditMode(true)}>
                  <FaEdit /> {t("userDetails.edit", "Edit Profile")}
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

