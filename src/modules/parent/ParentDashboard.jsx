
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChildProfile from './ChildProfile';
import Attendance from './Attendance';
import Progress from './Progress';
import Homework from './HomeWork';
import MockTestReports from './MockTestReports';
import StudyPlanner from './StudyPlanner';
import ContactUs from './ContactUs';
import { Typewriter } from 'react-simple-typewriter';
import {
  FiLogOut,        
  FiBell,          
  FiSettings,
  FiGlobe,        
  FiTrendingUp,
  FiMenu,
  FiX
} from 'react-icons/fi';
import {
  HiOutlineUserCircle,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineAcademicCap,
  HiOutlineClipboardDocumentList,
  HiOutlineLightBulb,
  HiOutlineHome
} from 'react-icons/hi2';
import novyaLogo from '../home/assets/NOVYA LOGO.png';
import { FaPhoneAlt } from 'react-icons/fa';

const ParentDashboard = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedParentData, setEditedParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userName: '',
    address: ''
  });

  const [selectedSection, setSelectedSection] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [parentName, setParentName] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mainContentRef = useRef(null);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
 
  const { t, i18n } = useTranslation();

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
     
      // Auto-close mobile menu when resizing to desktop
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    const username = localStorage.getItem('parentUsername') || localStorage.getItem('username') || 'Parent';
    setParentName(username);
   
    // Initialize edited parent data
    const parentData = JSON.parse(localStorage.getItem("parentData")) || {};
    setEditedParentData({
      firstName: parentData.firstName || "",
      lastName: parentData.lastName || "",
      email: parentData.email || "",
      phone: parentData.phone || "",
      userName: parentData.userName || "",
      address: parentData.address || ""
    });
   
    setNotifications([
      { id: 1, title: t('notifications.newAssignment'), message: t('notifications.assignmentMessage'), time: t('notifications.hoursAgo', { count: 2 }), read: false },
      { id: 2, title: t('notifications.progressReport'), message: t('notifications.progressMessage'), time: t('notifications.daysAgo', { count: 1 }), read: false },
      { id: 3, title: t('notifications.parentMeeting'), message: t('notifications.meetingMessage'), time: t('notifications.daysAgo', { count: 2 }), read: false },
      { id: 4, title: t('notifications.attendance'), message: t('notifications.attendanceMessage'), time: t('notifications.daysAgo', { count: 2 }), read: false },
    ]);
   
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
   
    return () => clearTimeout(timer);
  }, [t]);

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const titles = {
      profile: t('sections.profile'),
      attendance: t('sections.attendance'),
      grades: t('sections.progress'),
      homework: t('sections.assignments'),
      mockreports: t('sections.mockTests'),
      studyplanner: t('sections.studyPlan'),
      faq: t('sections.contact')
    };
    document.title = selectedSection && titles[selectedSection]
      ? `${titles[selectedSection]} | NOVYA - ${t('parentdashboard.platform')}`
      : `${t('parentdashboard.title')} | NOVYA - ${t('parentdashboard.platform')}`;
  }, [selectedSection, t]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('themePreference', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('themePreference', 'light');
    }
  }, [darkMode]);

  // Update notifications when language changes
  useEffect(() => {
    setNotifications([
      { id: 1, title: t('notifications.newAssignment'), message: t('notifications.assignmentMessage'), time: t('notifications.hoursAgo', { count: 2 }), read: false },
      { id: 2, title: t('notifications.progressReport'), message: t('notifications.progressMessage'), time: t('notifications.daysAgo', { count: 1 }), read: false },
      { id: 3, title: t('notifications.parentMeeting'), message: t('notifications.meetingMessage'), time: t('notifications.daysAgo', { count: 2 }), read: false },
      { id: 4, title: t('notifications.attendance'), message: t('notifications.attendanceMessage'), time: t('notifications.daysAgo', { count: 2 }), read: false },
    ]);
  }, [i18n.language, t]);

  const handleInputChange = (field, value) => {
    setEditedParentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    const parentData = JSON.parse(localStorage.getItem("parentData")) || {};
    const updatedData = {
      ...parentData,
      ...editedParentData
    };
   
    localStorage.setItem("parentData", JSON.stringify(updatedData));
   
    if (editedParentData.firstName) {
      setParentName(`${editedParentData.firstName} ${editedParentData.lastName}`.trim());
    }
   
    setIsEditingProfile(false);
  };

  const handleEditProfile = () => {
    const parentData = JSON.parse(localStorage.getItem("parentData")) || {};
    setEditedParentData({
      firstName: parentData.firstName || "",
      lastName: parentData.lastName || "",
      email: parentData.email || "",
      phone: parentData.phone || "",
      userName: parentData.userName || "",
      address: parentData.address || ""
    });
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    const parentData = JSON.parse(localStorage.getItem("parentData")) || {};
    setEditedParentData({
      firstName: parentData.firstName || "",
      lastName: parentData.lastName || "",
      email: parentData.email || "",
      phone: parentData.phone || "",
      userName: parentData.userName || "",
      address: parentData.address || ""
    });
    setIsEditingProfile(false);
  };

  // Translated sections with proper translation keys
  const sections = [
    {
      key: '',
      label: t('sections.home'),
      translationKey: 'home',
      icon: HiOutlineHome,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      key: 'profile',
      label: t('sections.profile'),
      translationKey: 'profile',
      icon: HiOutlineUserCircle,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      key: 'attendance',
      label: t('sections.attendance'),
      translationKey: 'attendance',
      icon: HiOutlineCalendarDays,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      key: 'grades',
      label: t('sections.progress'),
      translationKey: 'progress',
      icon: HiOutlineChartBarSquare,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      key: 'homework',
      label: t('sections.assignments'),
      translationKey: 'assignments',
      icon: HiOutlineAcademicCap,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      key: 'mockreports',
      label: t('sections.mockTests'),
      translationKey: 'mockTests',
      icon: HiOutlineClipboardDocumentList,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      key: 'studyplanner',
      label: t('sections.studyPlan'),
      translationKey: 'studyPlan',
      icon: HiOutlineLightBulb,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
    {
      key: 'faq',
      label: t('sections.contact'),
      translationKey: 'contact',
      icon: FaPhoneAlt,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(i18n.language, {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t('parentdashboard.greeting.morning');
    if (hour < 17) return t('parentdashboard.greeting.afternoon');
    return t('parentdashboard.greeting.evening');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
    localStorage.setItem('preferredLanguage', lng);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSectionSelect = (sectionKey) => {
    setSelectedSection(sectionKey);
    setMobileMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-container')) {
        setShowNotifications(false);
      }
      if (showSettings && !event.target.closest('.settings-container')) {
        setShowSettings(false);
      }
      if (showLanguageDropdown && !event.target.closest('.language-container')) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showSettings, showLanguageDropdown]);

  const renderSection = () => {
    switch (selectedSection) {
      case 'profile': return <ChildProfile />;
      case 'attendance': return <Attendance />;
      case 'grades': return <Progress />;
      case 'homework': return <Homework />;
      case 'mockreports': return <MockTestReports />;
      case 'studyplanner': return <StudyPlanner />;
      case 'faq': return <ContactUs />;
      default:
        return (
          <div className="dashboard-home">
            <div className="welcome-section">
              <div className="welcome-content">
                <div className="welcome-text">
                  <h1>{t('parentdashboard.welcome', { name: parentName })}</h1>
                  <div className="typewriter-container">
                    <Typewriter
                      key={i18n.language}
                      words={[
                        t('typewriter.monitorProgress'),
                        t('typewriter.stayConnected'),
                        t('typewriter.celebrateMilestones'),
                        t('typewriter.supportJourney')
                      ]}
                      loop
                      typeSpeed={50}
                      deleteSpeed={30}
                      delaySpeed={2500}
                    />
                  </div>
                </div>
                <div className="welcome-image">
                  <img
                    src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/d92aaad8-daf4-48e8-9313-bc4d45f82b91.png"
                    alt="Parent and child learning together"
                    className="parent-child-image"
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <h2>{t('parentdashboard.overview')}</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <FiTrendingUp />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">85%</div>
                    <div className="stat-label">{t('stats.overallProgress')}</div>
                    <div className="stat-change positive">+5% {t('stats.thisWeek')}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                    <HiOutlineCalendarDays />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">92%</div>
                    <div className="stat-label">{t('stats.attendanceRate')}</div>
                    <div className="stat-change positive">+2% {t('stats.thisMonth')}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                    <HiOutlineClipboardDocumentList />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">15</div>
                    <div className="stat-label">{t('stats.achievements')}</div>
                    <div className="stat-change positive">+3 {t('stats.thisWeek')}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    <HiOutlineAcademicCap />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">8/10</div>
                    <div className="stat-label">{t('stats.assignments')}</div>
                    <div className="stat-change neutral">2 {t('stats.pending')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-section">
              <h2>{t('parentdashboard.features')}</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🧠</div>
                  <h3>{t('parentdashboard.featuresList.aiLearning.title')}</h3>
                  <p>{t('parentdashboard.featuresList.aiLearning.description')}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>{t('parentdashboard.featuresList.analytics.title')}</h3>
                  <p>{t('parentdashboard.featuresList.analytics.description')}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🎯</div>
                  <h3>{t('parentdashboard.featuresList.goalLearning.title')}</h3>
                  <p>{t('parentdashboard.featuresList.goalLearning.description')}</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`parent-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
     
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={novyaLogo} alt="NOVYA" />
            {!sidebarCollapsed && <span>NOVYA</span>}
          </div>
       
          <button
            className="sidebar-toggle mobile-only"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.key}
                className={`nav-item ${selectedSection === section.key ? 'active' : ''}`}
                onClick={() => handleSectionSelect(section.key)}
                title={sidebarCollapsed ? section.label : ''}
              >
                <div className="nav-icon">
                  <IconComponent />
                </div>
                {!sidebarCollapsed && (
                  <div className="nav-content">
                    <span className="nav-label">{section.label}</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            {!sidebarCollapsed && <span>{t('common.logout')}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={handleMobileMenuToggle}
            >
              <FiMenu />
            </button>
            <div className="header-title">
              <h1>
                {selectedSection
                  ? sections.find(s => s.key === selectedSection)?.label || t('sections.home')
                  : t('sections.home')
                }
              </h1>
              <p>{getGreeting()}! {t('parentdashboard.subtitle')}</p>
            </div>
          </div>
         
          <div className="header-right">
            {!isMobile && (
              <div className="time-display">
                <div className="current-time">{formatTime(currentTime)}</div>
                <div className="current-date">{currentTime.toLocaleDateString(i18n.language, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
              </div>
            )}

            <div className="header-actions">
              {/* Language Selector */}
              <div className="language-container">
                <button
                  className="action-btn"
                  onClick={() => {
                    setShowLanguageDropdown(!showLanguageDropdown);
                    setShowNotifications(false);
                    setShowSettings(false);
                  }}
                >
                  <FiGlobe />
                </button>

                {showLanguageDropdown && (
                  <div className="language-dropdown">
                    <div className="dropdown-header">
                      <h3>{t('common.language')}</h3>
                      <button
                        className="close-dropdown-btn"
                        onClick={() => setShowLanguageDropdown(false)}
                      >
                        <FiX />
                      </button>
                    </div>
                    <div className="language-options">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
                          onClick={() => changeLanguage(lang.code)}
                        >
                          <span className="language-native">{lang.nativeName}</span>
                          <span className="language-name">({lang.name})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="notification-container">
                <button
                  className="action-btn"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowSettings(false);
                    setShowLanguageDropdown(false);
                  }}
                >
                  <FiBell />
                  {unreadNotificationsCount > 0 && (
                    <span className="notification-badge">{unreadNotificationsCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="dropdown-header">
                      <h3>{t('common.notifications')}</h3>
                      <div className="header-actions-right">
                        <button
                          className="clear-all-btn"
                          onClick={() => setNotifications([])}
                        >
                          {t('common.clear')}
                        </button>
                        <button
                          className="close-dropdown-btn"
                          onClick={() => setShowNotifications(false)}
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                    <div className="notification-list">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="notification-content">
                              <h4>{notification.title}</h4>
                              <p>{notification.message}</p>
                              <span className="notification-time">{notification.time}</span>
                            </div>
                            {!notification.read && <div className="unread-dot"></div>}
                          </div>
                        ))
                      ) : (
                        <p className="no-notifications">{t('common.noNotifications')}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
             
              {/* Settings */}
              <div className="settings-container">
                <button
                  className="action-btn"
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowNotifications(false);
                    setShowLanguageDropdown(false);
                  }}
                >
                  <FiSettings />
                </button>
               
                {showSettings && (
                  <div className="settings-dropdown">
                    <div className="dropdown-header">
                      <h3>{t('common.settings')}</h3>
                      <button
                        className="close-dropdown-btn"
                        onClick={() => setShowSettings(false)}
                      >
                        <FiX />
                      </button>
                    </div>
                   
                    <div className="settings-option">
                      <div className="settings-label">
                        <span>{t('common.darkMode')}</span>
                      </div>
                      <div className="theme-toggle">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>

                    <div className="settings-option">
                      <div className="settings-label">
                        <span>{t('common.language')}</span>
                      </div>
                      <div className="language-preview">
                        <span>{languages.find(lang => lang.code === i18n.language)?.nativeName}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
             
              {/* User Profile */}
              <div
                className="user-profile"
                onClick={() => setShowProfile(true)}
              >
                <img
                  src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/d92aaad8-daf4-48e8-9313-bc4d45f82b91.png"
                  alt="Parent"
                  className="profile-avatar"
                />
                {!isMobile && (
                  <div className="profile-info">
                    <span className="profile-name">{parentName}</span>
                    <span className="profile-role">{t('common.role')}: {t('common.parent')}</span>
                  </div>
                )}
              </div>

              {showProfile && (
                <div
                  className="profile-modal-overlay"
                  onClick={() => {
                    setShowProfile(false);
                    setIsEditingProfile(false);
                  }}
                >
                  <div
                    className="profile-modal-content"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="profile-close-btn"
                      onClick={() => {
                        setShowProfile(false);
                        setIsEditingProfile(false);
                      }}
                      aria-label="Close"
                    >
                      ×
                    </button>

                    <div className="profile-modal-header">
                      <img
                        src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/d92aaad8-daf4-48e8-9313-bc4d45f82b91.png"
                        alt="Parent"
                        className="profile-modal-avatar"
                      />
                      {isEditingProfile ? (
                        <div className="profile-edit-inputs">
                          <input
                            type="text"
                            value={editedParentData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder={t('profile.firstName')}
                            className="profile-input"
                          />
                          <input
                            type="text"
                            value={editedParentData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder={t('profile.lastName')}
                            className="profile-input"
                          />
                        </div>
                      ) : (
                        <div className="profile-modal-info">
                          <h3>
                            {editedParentData.firstName || t('common.parent')} {editedParentData.lastName || ""}
                          </h3>
                          <p>{t('common.role')}: {t('common.parent')}</p>
                        </div>
                      )}
                    </div>

                    <div className="profile-modal-details">
                      {isEditingProfile ? (
                        <>
                          <div className="profile-input-group">
                            <label>{t('profile.email')}:</label>
                            <input
                              type="email"
                              value={editedParentData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="profile-input"
                            />
                          </div>
                         
                          <div className="profile-input-group">
                            <label>{t('profile.contact')}:</label>
                            <input
                              type="tel"
                              value={editedParentData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="profile-input"
                            />
                          </div>
                         
                          <div className="profile-input-group">
                            <label>{t('profile.username')}:</label>
                            <input
                              type="text"
                              value={editedParentData.userName}
                              onChange={(e) => handleInputChange("userName", e.target.value)}
                              className="profile-input"
                            />
                          </div>
                         
                          <div className="profile-input-group">
                            <label>{t('profile.address')}:</label>
                            <textarea
                              value={editedParentData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              rows="3"
                              className="profile-textarea"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <p>
                            <strong>{t('profile.email')}:</strong> {editedParentData.email || t('common.notProvided')}
                          </p>
                          <p>
                            <strong>{t('profile.contact')}:</strong> {editedParentData.phone || t('common.notProvided')}
                          </p>
                          <p>
                            <strong>{t('profile.username')}:</strong> {editedParentData.userName || t('common.notProvided')}
                          </p>
                          <p>
                            <strong>{t('profile.address')}:</strong> {editedParentData.address || t('common.notProvided')}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="profile-modal-actions">
                      {isEditingProfile ? (
                        <>
                          <button
                            onClick={handleCancelEdit}
                            className="profile-btn profile-btn-cancel"
                          >
                            {t('common.cancel')}
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            className="profile-btn profile-btn-save"
                          >
                            {t('common.saveChanges')}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleEditProfile}
                          className="profile-btn profile-btn-edit"
                        >
                          {t('common.editProfile')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="content-area" ref={mainContentRef}>
          {renderSection()}
        </main>
      </div>

      <style jsx>{`
        .parent-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: all 0.3s ease;
          opacity: ${isLoaded ? 1 : 0};
        }

        .parent-dashboard.dark-mode {
          background: #0f172a;
          color: #e2e8f0;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1040;
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-overlay {
            display: block;
          }
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: fixed;
          height: 100vh;
          z-index: 1050;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .dark-mode .sidebar {
          background: #1e293b;
          border-right: 1px solid #334155;
        }

        /* Mobile Sidebar */
        @media (max-width: 768px) {
          .sidebar {
            left: -280px;
            transition: left 0.3s ease;
          }
         
          .sidebar.mobile-open {
            left: 0;
          }
         
          .sidebar.collapsed {
            width: 280px;
            left: -280px;
          }
         
          .sidebar.collapsed.mobile-open {
            left: 0;
          }
        }

        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
        }

        .dark-mode .sidebar-header {
          border-bottom: 1px solid #334155;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: #1e293b;
        }

        .dark-mode .sidebar-logo {
          color: #e2e8f0;
        }

        .sidebar-logo img {
          width: 32px;
          height: 32px;
        }

        .sidebar-toggle {
          background: #f1f5f9;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark-mode .sidebar-toggle {
          background: #334155;
          color: #e2e8f0;
        }

        .sidebar-toggle:hover {
          background: #e2e8f0;
          transform: scale(1.05);
        }

        .dark-mode .sidebar-toggle:hover {
          background: #475569;
        }

        /* Desktop/Mobile Toggle Visibility */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
         
          .mobile-only {
            display: flex;
          }
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 1rem;
          margin-bottom: 0.5rem;
          border: none;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          gap: 1rem;
        }

        .nav-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }

        .dark-mode .nav-item:hover {
          background: #334155;
        }

        .nav-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .nav-icon {
          font-size: 1.25rem;
          min-width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .dark-mode .sidebar-footer {
          border-top: 1px solid #334155;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        /* Main Container */
        .main-container {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .sidebar.collapsed + .main-container {
          margin-left: 70px;
        }

        @media (max-width: 768px) {
          .main-container {
            margin-left: 0;
          }
         
          .sidebar.collapsed + .main-container {
            margin-left: 0;
          }
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          background: #f1f5f9;
          border: none;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #1e293b;
          font-size: 1.2rem;
        }

        .dark-mode .mobile-menu-btn {
          background: #334155;
          color: #e2e8f0;
        }

        .mobile-menu-btn:hover {
          background: #e2e8f0;
          transform: scale(1.05);
        }

        .dark-mode .mobile-menu-btn:hover {
          background: #475569;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
        }

        /* Top Header */
        .top-header {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .dark-mode .top-header {
          background: #1e293b;
          border-bottom: 1px solid #334155;
        }

        @media (max-width: 768px) {
          .top-header {
            padding: 0.75rem 1rem;
          }
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-title h1 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .header-title h1 {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .header-title h1 {
            font-size: 1.1rem;
          }
        }

        .header-title p {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0.25rem 0 0 0;
        }

        .dark-mode .header-title p {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .header-title p {
            font-size: 0.8rem;
          }
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .header-right {
            gap: 0.5rem;
          }
        }

        .time-display {
          text-align: right;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .dark-mode .time-display {
          background: #334155;
          border: 1px solid #475569;
        }

        @media (max-width: 768px) {
          .time-display {
            display: none;
          }
        }

        .current-time {
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
        }

        .dark-mode .current-time {
          color: #e2e8f0;
        }

        .current-date {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 2px;
        }

        .dark-mode .current-date {
          color: #94a3b8;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        @media (max-width: 768px) {
          .header-actions {
            gap: 0.5rem;
          }
        }

        .action-btn {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .dark-mode .action-btn {
          background: #334155;
          border: 1px solid #475569;
          color: #e2e8f0;
        }

        .action-btn:hover {
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .dark-mode .action-btn:hover {
          background: #475569;
        }

        @media (max-width: 480px) {
          .action-btn {
            width: 38px;
            height: 38px;
          }
        }

        .notification-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dark-mode .user-profile {
          background: #334155;
          border: 1px solid #475569;
        }

        .user-profile:hover {
          background: #e2e8f0;
        }

        .dark-mode .user-profile:hover {
          background: #475569;
        }

        @media (max-width: 768px) {
          .user-profile {
            padding: 0.5rem;
          }
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        @media (max-width: 480px) {
          .profile-avatar {
            width: 32px;
            height: 32px;
          }
        }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .profile-info {
            display: none;
          }
        }

        .profile-name {
          font-weight: 600;
          font-size: 0.9rem;
          display: block;
          color: #1e293b;
        }

        .dark-mode .profile-name {
          color: #e2e8f0;
        }

        .profile-role {
          font-size: 0.75rem;
          color: #64748b;
        }

        .dark-mode .profile-role {
          color: #94a3b8;
        }

        /* Dropdown Styles */
        .notification-container, .settings-container, .language-container {
          position: relative;
        }

        .notification-dropdown, .settings-dropdown, .language-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          margin-top: 10px;
        }

        .notification-dropdown {
          width: 320px;
          padding: 1rem;
        }

        .settings-dropdown {
          width: 280px;
          padding: 1rem;
        }

        .language-dropdown {
          width: 200px;
          padding: 1rem;
        }

        .dark-mode .notification-dropdown,
        .dark-mode .settings-dropdown,
        .dark-mode .language-dropdown {
          background: #1e293b;
          border: 1px solid #334155;
        }

        /* Mobile Dropdown Positioning */
        @media (max-width: 768px) {
          .notification-dropdown, .settings-dropdown, .language-dropdown {
            position: fixed;
            top: 70px !important;
            left: 1rem !important;
            right: 1rem !important;
            width: auto !important;
            max-width: none !important;
            margin-top: 0 !important;
            z-index: 1100 !important;
            transform: translateY(-10px);
            animation: slideDown 0.3s ease forwards;
          }
         
          @keyframes slideDown {
            to {
              transform: translateY(0);
            }
          }
        }

        @media (max-width: 480px) {
          .notification-dropdown, .settings-dropdown, .language-dropdown {
            left: 0.5rem !important;
            right: 0.5rem !important;
            top: 65px !important;
          }
         
          .notification-dropdown {
            width: calc(100vw - 1rem) !important;
          }
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .dark-mode .dropdown-header {
          border-bottom: 1px solid #334155;
        }

        .dropdown-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .header-actions-right {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .clear-all-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.8rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .clear-all-btn:hover {
          color: #1e293b;
        }

        .dark-mode .clear-all-btn:hover {
          color: #e2e8f0;
        }

        .close-dropdown-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #64748b;
          font-size: 1.2rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: color 0.2s ease;
        }

        .close-dropdown-btn:hover {
          color: #1e293b;
        }

        .dark-mode .close-dropdown-btn:hover {
          color: #e2e8f0;
        }

        .notification-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e2e8f0;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .dark-mode .notification-item {
          border-bottom: 1px solid #334155;
        }

        .notification-item:hover {
          background: #f1f5f9;
        }

        .dark-mode .notification-item:hover {
          background: #334155;
        }

        .notification-item.unread {
          font-weight: 600;
        }

        .notification-content {
          flex: 1;
        }

        .notification-content h4 {
          margin: 0 0 0.2rem 0;
          font-size: 0.9rem;
        }

        .notification-content p {
          margin: 0 0 0.3rem 0;
          font-size: 0.8rem;
          color: #64748b;
        }

        .dark-mode .notification-content p {
          color: #94a3b8;
        }

        .notification-time {
          font-size: 0.7rem;
          color: #94a3b8;
        }

        .dark-mode .notification-time {
          color: #cbd5e1;
        }

        .unread-dot {
          width: 10px;
          height: 10px;
          background: #ef4444;
          border-radius: 50%;
          align-self: center;
          margin-left: 0.5rem;
        }

        .no-notifications {
          text-align: center;
          font-size: 0.85rem;
          color: #64748b;
          padding: 1rem 0;
        }

        .dark-mode .no-notifications {
          color: #94a3b8;
        }

        .language-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .language-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .language-option:hover {
          background: #f1f5f9;
        }

        .dark-mode .language-option:hover {
          background: #334155;
        }

        .language-option.active {
          background: #667eea;
          color: white;
        }

        .language-native {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .language-name {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .settings-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .settings-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #1e293b;
        }

        .dark-mode .settings-label {
          color: #e2e8f0;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .language-preview {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
        }

        .dark-mode .language-preview {
          color: #94a3b8;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 22px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 22px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #667eea;
        }

        input:checked + .slider:before {
          transform: translateX(18px);
        }

        /* Profile Modal Styles */
        .profile-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.3);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .profile-modal-content {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 1.5rem;
          min-width: 320px;
          max-width: 90vw;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .dark-mode .profile-modal-content {
          background: #1e293b;
          color: #e2e8f0;
        }

        @media (max-width: 480px) {
          .profile-modal-content {
            padding: 1rem;
            min-width: 280px;
          }
        }

        .profile-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
        }

        .profile-close-btn:hover {
          color: #1e293b;
        }

        .dark-mode .profile-close-btn:hover {
          color: #e2e8f0;
        }

        .profile-modal-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .profile-modal-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 0.5rem;
          object-fit: cover;
        }

        @media (max-width: 480px) {
          .profile-modal-avatar {
            width: 60px;
            height: 60px;
          }
        }

        .profile-edit-inputs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .profile-modal-info h3 {
          margin: 0.5rem 0;
          font-size: 1.3rem;
        }

        .profile-modal-info p {
          margin: 0;
          color: #666;
        }

        .dark-mode .profile-modal-info p {
          color: #94a3b8;
        }

        .profile-modal-details {
          margin-top: 1rem;
          line-height: 1.6;
        }

        .profile-input-group {
          margin-bottom: 1rem;
        }

        .profile-input-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 0.25rem;
          color: #1e293b;
        }

        .dark-mode .profile-input-group label {
          color: #e2e8f0;
        }

        .profile-input, .profile-textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          background: white;
          color: #1e293b;
        }

        .dark-mode .profile-input, .dark-mode .profile-textarea {
          background: #334155;
          border: 1px solid #475569;
          color: #e2e8f0;
        }

        .profile-textarea {
          resize: vertical;
        }

        .profile-modal-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        @media (max-width: 480px) {
          .profile-modal-actions {
            flex-direction: column;
          }
        }

        .profile-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .profile-btn-cancel {
          background: #f1f5f9;
          border: 1px solid #ddd;
          color: #64748b;
        }

        .dark-mode .profile-btn-cancel {
          background: #334155;
          border: 1px solid #475569;
          color: #94a3b8;
        }

        .profile-btn-save, .profile-btn-edit {
          background: #6366f1;
          color: white;
        }

        .profile-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        /* Content Area */
        .content-area {
          flex: 1;
          overflow-y: auto;
        }

        /* Dashboard Home Styles */
        .dashboard-home {
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .dashboard-home {
            padding: 1rem;
          }
        }

        .welcome-section {
          margin-bottom: 2rem;
        }

        .welcome-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 2rem;
          color: white;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .welcome-content {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .welcome-content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .welcome-content {
            padding: 1rem;
            border-radius: 16px;
          }
        }

        .welcome-text h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
        }

        @media (max-width: 768px) {
          .welcome-text h1 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .welcome-text h1 {
            font-size: 1.25rem;
          }
        }

        .typewriter-container {
          font-size: 1.1rem;
          opacity: 0.9;
          min-height: 2rem;
        }

        @media (max-width: 768px) {
          .typewriter-container {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .typewriter-container {
            font-size: 0.9rem;
          }
        }

        .welcome-image {
          position: relative;
          flex-shrink: 0;
        }

        .parent-child-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          object-fit: cover;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 480px) {
          .parent-child-image {
            border-radius: 12px;
          }
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(102, 126, 234, 0.4) 0%,
            rgba(118, 75, 162, 0.4) 100%
          );
          border-radius: 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .welcome-image:hover .image-overlay {
          opacity: 1;
        }

        .stats-section {
          margin-bottom: 2rem;
        }

        .stats-section h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }

        .dark-mode .stats-section h2 {
          color: #e2e8f0;
        }

        @media (max-width: 768px) {
          .stats-section h2 {
            font-size: 1.3rem;
          }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .dark-mode .stat-card {
          background: #1e293b;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .dark-mode .stat-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 480px) {
          .stat-card {
            padding: 1rem;
          }
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }

        @media (max-width: 480px) {
          .stat-icon {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .dark-mode .stat-value {
          color: #e2e8f0;
        }

        @media (max-width: 480px) {
          .stat-value {
            font-size: 1.3rem;
          }
        }

        .stat-label {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .dark-mode .stat-label {
          color: #94a3b8;
        }

        .stat-change {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-change.neutral {
          color: #f59e0b;
        }

        .features-section h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }

        .dark-mode .features-section h2 {
          color: #e2e8f0;
        }

        @media (max-width: 768px) {
          .features-section h2 {
            font-size: 1.3rem;
          }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .feature-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .dark-mode .feature-card {
          background: #1e293b;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .dark-mode .feature-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 480px) {
          .feature-card {
            padding: 1rem;
          }
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 480px) {
          .feature-icon {
            font-size: 2rem;
          }
        }

        .feature-card h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .dark-mode .feature-card h3 {
          color: #e2e8f0;
        }

        @media (max-width: 480px) {
          .feature-card h3 {
            font-size: 1.1rem;
          }
        }

        .feature-card p {
          color: #64748b;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .dark-mode .feature-card p {
          color: #94a3b8;
        }

        /* Custom scrollbar styles */
        .sidebar-nav::-webkit-scrollbar,
        .notification-list::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-nav::-webkit-scrollbar-track,
        .notification-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-nav::-webkit-scrollbar-thumb,
        .notification-list::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .dark-mode .sidebar-nav::-webkit-scrollbar-thumb,
        .dark-mode .notification-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        .sidebar-nav::-webkit-scrollbar-thumb:hover,
        .notification-list::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .dark-mode .sidebar-nav::-webkit-scrollbar-thumb:hover,
        .dark-mode .notification-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Dark mode text color fixes */
        .dark-mode .sidebar {
          color: white;
        }

        .dark-mode .nav-item {
          color: white;
        }

        .dark-mode .nav-icon {
          color: white;
        }

        .dark-mode .sidebar-logo {
          color: white;
        }

        .dark-mode .sidebar-footer {
          color: white;
        }

        .dark-mode .logout-btn {
          color: white;
        }

        .dark-mode .stats-section > h2 {
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
};

export default ParentDashboard;
