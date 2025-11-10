
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBell, FaClock, FaTimes } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

// const Notifications = ({ isMobile, onClose }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadNotifications, setUnreadNotifications] = useState(0);
//   const [selectedClass, setSelectedClass] = useState('7th');
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   // Function to set user class
//   const setUserClass = (selectedClass) => {
//     const currentProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
//     currentProgress.userClass = selectedClass;
//     localStorage.setItem('learningProgress', JSON.stringify(currentProgress));
//     setSelectedClass(selectedClass);
//   };

//   // Class selector component
//   const ClassSelector = () => (
//     <div style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
//     </div>
//   );

//   // Notification generator function
//   const generateDailyAgendaNotification = () => {
//     const currentProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
//     const userClass = currentProgress.userClass || '7th';

//     return {
//       id: `daily-${Date.now()}`,
//       title: `Today's Learning Section`,
//       message: `Keep your streak going! All Subjects Related Topic, Quizzes, Mock Tests for Class ${userClass}.`,
//       date: new Date(),
//       read: false,
//       type: 'daily_challenge',
//       data: {
//         class: userClass,
//       }
//     };
//   };

//   // Function to check and add daily agenda
//   const checkAndAddDailyAgenda = () => {
//     const lastNotificationDate = localStorage.getItem('lastDailyAgendaDate');
//     const today = new Date().toDateString();
    
//     if (lastNotificationDate !== today) {
//       const dailyNotification = generateDailyAgendaNotification();
//       addNotification(dailyNotification);
//       localStorage.setItem('lastDailyAgendaDate', today);
//     }
//   };

//   // Function to add notification to localStorage
//   const addNotification = (notification) => {
//     try {
//       const savedNotifications = localStorage.getItem('studyNotifications');
//       const notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
      
//       // Check if notification already exists to avoid duplicates
//       const notificationExists = notifications.some(notif => 
//         notif.type === 'daily_challenge' && 
//         new Date(notif.date).toDateString() === new Date().toDateString()
//       );
      
//       if (!notificationExists) {
//         notifications.unshift(notification);
//         localStorage.setItem('studyNotifications', JSON.stringify(notifications));
        
//         // Trigger storage event to update other components
//         window.dispatchEvent(new StorageEvent('storage', {
//           key: 'studyNotifications',
//           newValue: JSON.stringify(notifications)
//         }));
//       }
//     } catch (error) {
//       console.error('Error adding notification:', error);
//     }
//   };

//   useEffect(() => {
//     loadNotifications();
    
//     // Check for daily agenda every time component mounts
//     checkAndAddDailyAgenda();
    
//     // Also check every hour for users who keep the app open
//     const interval = setInterval(() => {
//       checkAndAddDailyAgenda();
//       loadNotifications();
//     }, 60 * 60 * 1000);

//     const handleStorageChange = (e) => {
//       if (e.key === 'studyNotifications') {
//         loadNotifications();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     const quickInterval = setInterval(() => {
//       loadNotifications();
//     }, 2000);
   
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//       clearInterval(quickInterval);
//     };
//   }, []);

//   const loadNotifications = () => {
//     try {
//       const savedNotifications = localStorage.getItem('studyNotifications');
//       if (savedNotifications) {
//         const notifs = JSON.parse(savedNotifications);
//         const uniqueNotifs = notifs.filter((notif, index, self) =>
//           index === self.findIndex(n => n.id === notif.id)
//         );
//         setNotifications(uniqueNotifs);
//         const unread = uniqueNotifs.filter(notif => !notif.read).length;
//         setUnreadNotifications(unread);
//       } else {
//         setNotifications([]);
//         setUnreadNotifications(0);
//       }
//     } catch (error) {
//       console.error('Error loading notifications:', error);
//       setNotifications([]);
//       setUnreadNotifications(0);
//     }
//   };

//   const markNotificationAsRead = (notificationId) => {
//     try {
//       const updatedNotifications = notifications.map(notif =>
//         notif.id === notificationId ? { ...notif, read: true } : notif
//       );
//       localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
//       setNotifications(updatedNotifications);
//       const unread = updatedNotifications.filter(notif => !notif.read).length;
//       setUnreadNotifications(unread);
     
//       window.dispatchEvent(new StorageEvent('storage', {
//         key: 'studyNotifications',
//         newValue: JSON.stringify(updatedNotifications)
//       }));
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   const deleteNotification = (notificationId) => {
//     try {
//       const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
//       localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
//       setNotifications(updatedNotifications);
//       const unread = updatedNotifications.filter(notif => !notif.read).length;
//       setUnreadNotifications(unread);
     
//       window.dispatchEvent(new StorageEvent('storage', {
//         key: 'studyNotifications',
//         newValue: JSON.stringify(updatedNotifications)
//       }));
//     } catch (error) {
//       console.error('Error deleting notification:', error);
//     }
//   };

//   const markAllNotificationsAsRead = () => {
//     try {
//       const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
//       localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
//       setNotifications(updatedNotifications);
//       setUnreadNotifications(0);
     
//       window.dispatchEvent(new StorageEvent('storage', {
//         key: 'studyNotifications',
//         newValue: JSON.stringify(updatedNotifications)
//       }));
//     } catch (error) {
//       console.error('Error marking all notifications as read:', error);
//     }
//   };

//   const clearAllNotifications = () => {
//     try {
//       localStorage.removeItem('studyNotifications');
//       setNotifications([]);
//       setUnreadNotifications(0);
     
//       window.dispatchEvent(new StorageEvent('storage', {
//         key: 'studyNotifications',
//         newValue: null
//       }));
//     } catch (error) {
//       console.error('Error clearing notifications:', error);
//     }
//   };

//   // Enhanced notification item with daily agenda support
//   const renderNotificationItem = (notification) => (
//     <div
//       key={notification.id}
//       className={`notification-item ${!notification.read ? 'unread' : ''} ${notification.type === 'daily_challenge' ? 'daily-agenda' : ''}`}
//       onClick={() => !notification.read && markNotificationAsRead(notification.id)}
//       style={{
//         padding: '12px 16px',
//         borderBottom: '1px solid #f3f4f6',
//         cursor: !notification.read ? 'pointer' : 'default',
//         backgroundColor: !notification.read ? 
//           (notification.type === 'daily_challenge' ? '#f0f9ff' : '#fef7cd') : 'transparent',
//         position: 'relative',
//         transition: 'background-color 0.2s',
//         borderLeft: notification.type === 'daily_challenge' ? '4px solid #10b981' : '4px solid transparent'
//       }}
//     >
//       <button
//         className="notification-delete-btn"
//         onClick={(e) => {
//           e.stopPropagation();
//           deleteNotification(notification.id);
//         }}
//         style={{
//           position: 'absolute',
//           top: '8px',
//           right: '8px',
//           background: 'none',
//           border: 'none',
//           cursor: 'pointer',
//           color: '#9ca3af',
//           padding: '4px',
//           borderRadius: '4px',
//           fontSize: '10px'
//         }}
//       >
//         <FaTimes size={10} />
//       </button>

//       <div style={{ 
//         fontSize: '13px', 
//         fontWeight: '600', 
//         marginBottom: '4px', 
//         color: notification.type === 'daily_challenge' ? '#065f46' : '#1f2937'
//       }}>
//         {notification.title}
//         {notification.type === 'daily_challenge' && (
//           <span style={{
//             marginLeft: '8px',
//             background: '#10b981',
//             color: 'white',
//             padding: '2px 6px',
//             borderRadius: '12px',
//             fontSize: '10px',
//             fontWeight: 'normal'
//           }}>
//             Daily Goal
//           </span>
//         )}
//       </div>
//       <div style={{ 
//         fontSize: '12px', 
//         color: notification.type === 'daily_challenge' ? '#047857' : '#4b5563', 
//         marginBottom: '6px', 
//         lineHeight: '1.4' 
//       }}>
//         {notification.message}
//       </div>
//       <div style={{ 
//         fontSize: '11px', 
//         color: '#9ca3af', 
//         display: 'flex', 
//         alignItems: 'center', 
//         gap: '4px' 
//       }}>
//         <FaClock size={10} />
//         {new Date(notification.date).toLocaleDateString()} at {' '}
//         {new Date(notification.date).toLocaleTimeString([], { 
//           hour: '2-digit', 
//           minute: '2-digit' 
//         })}
//       </div>
      
//       {/* Action button for daily challenges */}
//       {notification.type === 'daily_challenge' && !notification.read && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             // Navigate to learning page with the suggested class
//             navigate(`/learn/class${notification.data.class}`);
//             markNotificationAsRead(notification.id);
//             if (isMobile && onClose) {
//               onClose();
//             }
//           }}
//           style={{
//             marginTop: '8px',
//             background: '#10b981',
//             color: 'white',
//             border: 'none',
//             padding: '6px 12px',
//             borderRadius: '4px',
//             fontSize: '11px',
//             cursor: 'pointer',
//             fontWeight: '500'
//           }}
//         >
//           Start Learning →
//         </button>
//       )}
//     </div>
//   );

//   // Desktop Notifications Dropdown
//   const DesktopNotifications = () => (
//     <AnimatePresence>
//       <motion.div
//         className="nav-dropdown notifications-dropdown"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//       >
//         <ClassSelector />
//         <div className="notifications-container">
//           <div className="notifications-header" style={{
//             padding: '12px 16px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             borderBottom: '1px solid #e5e7eb'
//           }}>
//             <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
//               {t('nav-notifications')}
//             </h3>
//             {unreadNotifications > 0 && (
//               <span style={{
//                 background: '#ef4444',
//                 color: 'white',
//                 borderRadius: '12px',
//                 padding: '2px 8px',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 {unreadNotifications} new
//               </span>
//             )}
//           </div>

//           <div className="notifications-actions" style={{
//             padding: '8px 16px',
//             display: 'flex',
//             gap: '8px',
//             borderBottom: '1px solid #e5e7eb',
//             background: '#f8fafc'
//           }}>
//             {unreadNotifications > 0 && (
//               <button
//                 onClick={markAllNotificationsAsRead}
//                 style={{
//                   background: 'none',
//                   border: '1px solid #3b82f6',
//                   color: '#3b82f6',
//                   padding: '4px 8px',
//                   borderRadius: '4px',
//                   fontSize: '12px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 {t('mark_all_read')}
//               </button>
//             )}
//             {notifications.length > 0 && (
//               <button
//                 onClick={clearAllNotifications}
//                 style={{
//                   background: 'none',
//                   border: '1px solid #ef4444',
//                   color: '#ef4444',
//                   padding: '4px 8px',
//                   borderRadius: '4px',
//                   fontSize: '12px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 {t('clear_all')}
//               </button>
//             )}
//           </div>

//           <div style={{ maxHeight: '300px', overflow: 'auto' }}>
//             {notifications.length === 0 ? (
//               <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280' }}>
//                 <FaBell size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
//                 <p style={{ margin: 0, fontSize: '14px' }}>{t('no_notifications_yet')}</p>
//                 <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>{t('study_plans_will_appear_here')}</p>
//               </div>
//             ) : (
//               notifications.map((notification) => renderNotificationItem(notification))
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );

//   // Mobile Notifications Modal
//   const MobileNotificationsModal = () => (
//     <>
//       <motion.div
//         className="mobile-notifications-overlay"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 9998
//         }}
//       />
//       <motion.div
//         className="mobile-notifications-content"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '90%',
//           maxWidth: '400px',
//           maxHeight: '80vh',
//           backgroundColor: 'white',
//           borderRadius: '12px',
//           zIndex: 9999,
//           overflow: 'hidden',
//           boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
//         }}
//       >
//         <ClassSelector />
//         <div className="notifications-container">
//           <div className="notifications-header" style={{
//             padding: '16px 20px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             borderBottom: '1px solid #e5e7eb',
//             backgroundColor: '#3b82f6',
//             color: 'white'
//           }}>
//             <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
//               Notifications
//             </h3>
//             <button 
//               onClick={onClose} 
//               style={{ 
//                 background: 'none', 
//                 border: 'none', 
//                 cursor: 'pointer', 
//                 color: 'white', 
//                 fontSize: '18px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '32px',
//                 height: '32px',
//                 borderRadius: '4px'
//               }}
//             >
//               <FaTimes />
//             </button>
//           </div>

//           <div className="notifications-actions" style={{
//             padding: '12px 16px',
//             display: 'flex',
//             gap: '8px',
//             borderBottom: '1px solid #e5e7eb',
//             background: '#f8fafc'
//           }}>
//             {unreadNotifications > 0 && (
//               <button
//                 onClick={markAllNotificationsAsRead}
//                 style={{
//                   background: '#3b82f6',
//                   border: 'none',
//                   color: 'white',
//                   padding: '8px 12px',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   cursor: 'pointer',
//                   fontWeight: '500'
//                 }}
//               >
//                 Mark all read
//               </button>
//             )}
//             {notifications.length > 0 && (
//               <button
//                 onClick={clearAllNotifications}
//                 style={{
//                   background: '#ef4444',
//                   border: 'none',
//                   color: 'white',
//                   padding: '8px 12px',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   cursor: 'pointer',
//                   fontWeight: '500'
//                 }}
//               >
//                 Clear all
//               </button>
//             )}
//           </div>

//           <div style={{ maxHeight: '400px', overflow: 'auto' }}>
//             {notifications.length === 0 ? (
//               <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6b7280' }}>
//                 <FaBell size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
//                 <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>No notifications yet</p>
//                 <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>You're all caught up!</p>
//               </div>
//             ) : (
//               notifications.map((notification) => renderNotificationItem(notification))
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );

//   if (isMobile) {
//     return <MobileNotificationsModal />;
//   }

//   return <DesktopNotifications />;
// };

// export default Notifications;










import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaClock, FaTimes, FaCheck, FaPlay } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ isMobile, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selectedClass, setSelectedClass] = useState('7th');
  const [todayProgress, setTodayProgress] = useState({
    completed: 0,
    total: 8,
    subjects: [
      { name: 'Math', completed: false },
      { name: 'Science', completed: false },
      { name: 'English', completed: false },
      { name: 'Social', completed: false },
      { name: 'Physics', completed: false },
      { name: 'Chemistry', completed: false },
      { name: 'Biology', completed: false },
      { name: 'Computer', completed: false }
    ]
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Function to set user class
  const setUserClass = (selectedClass) => {
    const currentProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    currentProgress.userClass = selectedClass;
    localStorage.setItem('learningProgress', JSON.stringify(currentProgress));
    setSelectedClass(selectedClass);
  };

  // Class selector component
  const ClassSelector = () => (
    <div style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
    </div>
  );

  // Load today's progress from localStorage
  const loadTodayProgress = () => {
    try {
      const today = new Date().toDateString();
      const savedProgress = localStorage.getItem(`dailyProgress_${today}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const completedCount = progress.subjects.filter(subject => subject.completed).length;
        setTodayProgress({
          ...progress,
          completed: completedCount
        });
      } else {
        // Initialize today's progress
        const initialProgress = {
          completed: 0,
          total: 8,
          subjects: [
            { name: 'Math', completed: false },
            { name: 'Science', completed: false },
            { name: 'English', completed: false },
            { name: 'Social', completed: false },
            { name: 'Physics', completed: false },
            { name: 'Chemistry', completed: false },
            { name: 'Biology', completed: false },
            { name: 'Computer', completed: false }
          ]
        };
        localStorage.setItem(`dailyProgress_${today}`, JSON.stringify(initialProgress));
        setTodayProgress(initialProgress);
      }
    } catch (error) {
      console.error('Error loading today progress:', error);
    }
  };

  // Enhanced notification generator with real progress tracking
  const generateDailyProgressNotification = () => {
    const currentProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    const learningStatus = JSON.parse(localStorage.getItem('learningStatus') || '{}');
    const userClass = currentProgress.userClass || '7';
    const today = new Date().toDateString();

    // Calculate real progress from learningStatus
    const completedSubjects = new Set();
    
    Object.values(learningStatus).forEach(status => {
      if (status.date === today && status.status === 'TASK_DONE' && status.subject) {
        completedSubjects.add(status.subject);
      }
    });

    // Get available subjects for the class
    const allChapters = {
      '7': ['Maths', 'Science', 'English', 'History', 'Civics', 'Geography', 'Computer'],
      '8': ['Maths', 'Science', 'English', 'History', 'Civics', 'Geography', 'Computer'],
      '9': ['Maths', 'Science', 'English', 'History', 'Civics', 'Geography', 'Computer', 'Economics'],
      '10': ['Maths', 'Science', 'English', 'History', 'Civics', 'Geography', 'Computer', 'Economics']
    };

    const availableSubjects = allChapters[userClass] || [];
    const totalSubjects = availableSubjects.length;
    const completedCount = completedSubjects.size;
    const completionPercentage = totalSubjects > 0 ? Math.round((completedCount / totalSubjects) * 100) : 0;
    const isCompleted = completedCount === totalSubjects && totalSubjects > 0;

    // Create subject status array
    const subjectsStatus = availableSubjects.map(subject => ({
      name: subject,
      completed: completedSubjects.has(subject)
    }));

    return {
      id: `daily-progress-${Date.now()}`,
      title: isCompleted ? `🎉 Today's Learning Completed!` : `Today's Learning Progress`,
      message: isCompleted 
        ? `Great job! You've completed all ${totalSubjects} subjects for Class ${userClass}.`
        : `Keep learning! ${completedCount}/${totalSubjects} subjects completed for Class ${userClass}.`,
      date: new Date(),
      read: false,
      type: 'daily_progress',
      data: {
        class: userClass,
        progress: completionPercentage,
        completed: completedCount,
        total: totalSubjects,
        isCompleted: isCompleted,
        subjects: subjectsStatus
      }
    };
  };

  // Function to check and add daily agenda
  const checkAndAddDailyAgenda = () => {
    const lastNotificationDate = localStorage.getItem('lastDailyAgendaDate');
    const today = new Date().toDateString();
    
    if (lastNotificationDate !== today) {
      const dailyNotification = generateDailyProgressNotification();
      addNotification(dailyNotification);
      localStorage.setItem('lastDailyAgendaDate', today);
    } else {
      // Update existing daily notification with current progress
      updateDailyNotificationProgress();
    }
  };

  // Update daily notification with current progress
  const updateDailyNotificationProgress = () => {
    try {
      const savedNotifications = localStorage.getItem('studyNotifications');
      if (savedNotifications) {
        const notifications = JSON.parse(savedNotifications);
        const today = new Date().toDateString();
        
        const updatedNotifications = notifications.map(notif => {
          if (notif.type === 'daily_progress' && 
              new Date(notif.date).toDateString() === today) {
            return generateDailyProgressNotification();
          }
          return notif;
        });
        
        localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
        setNotifications(updatedNotifications);
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'studyNotifications',
          newValue: JSON.stringify(updatedNotifications)
        }));
      }
    } catch (error) {
      console.error('Error updating daily notification:', error);
    }
  };

  // Function to add notification to localStorage
  const addNotification = (notification) => {
    try {
      const savedNotifications = localStorage.getItem('studyNotifications');
      const notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
      
      // Remove any existing daily notification for today
      const today = new Date().toDateString();
      const filteredNotifications = notifications.filter(notif => 
        !(notif.type === 'daily_progress' && 
          new Date(notif.date).toDateString() === today)
      );
      
      filteredNotifications.unshift(notification);
      localStorage.setItem('studyNotifications', JSON.stringify(filteredNotifications));
      
      // Trigger storage event to update other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'studyNotifications',
        newValue: JSON.stringify(filteredNotifications)
      }));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
    loadTodayProgress();
    
    // Check for daily agenda every time component mounts
    checkAndAddDailyAgenda();
    
    // Also check every hour for users who keep the app open
    const interval = setInterval(() => {
      checkAndAddDailyAgenda();
      loadNotifications();
      loadTodayProgress();
    }, 60 * 60 * 1000);

    const handleStorageChange = (e) => {
      if (e.key === 'studyNotifications') {
        loadNotifications();
      }
      if (e.key && e.key.startsWith('dailyProgress_')) {
        loadTodayProgress();
        checkAndAddDailyAgenda();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const quickInterval = setInterval(() => {
      loadNotifications();
      loadTodayProgress();
    }, 2000);
   
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
      clearInterval(quickInterval);
    };
  }, []);

  const loadNotifications = () => {
    try {
      const savedNotifications = localStorage.getItem('studyNotifications');
      if (savedNotifications) {
        const notifs = JSON.parse(savedNotifications);
        const uniqueNotifs = notifs.filter((notif, index, self) =>
          index === self.findIndex(n => n.id === notif.id)
        );
        setNotifications(uniqueNotifs);
        const unread = uniqueNotifs.filter(notif => !notif.read).length;
        setUnreadNotifications(unread);
      } else {
        setNotifications([]);
        setUnreadNotifications(0);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      setNotifications([]);
      setUnreadNotifications(0);
    }
  };

  const markNotificationAsRead = (notificationId) => {
    try {
      const updatedNotifications = notifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
      const unread = updatedNotifications.filter(notif => !notif.read).length;
      setUnreadNotifications(unread);
     
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'studyNotifications',
        newValue: JSON.stringify(updatedNotifications)
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = (notificationId) => {
    try {
      const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
      localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
      const unread = updatedNotifications.filter(notif => !notif.read).length;
      setUnreadNotifications(unread);
     
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'studyNotifications',
        newValue: JSON.stringify(updatedNotifications)
      }));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markAllNotificationsAsRead = () => {
    try {
      const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
      localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
      setUnreadNotifications(0);
     
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'studyNotifications',
        newValue: JSON.stringify(updatedNotifications)
      }));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const clearAllNotifications = () => {
    try {
      localStorage.removeItem('studyNotifications');
      setNotifications([]);
      setUnreadNotifications(0);
     
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'studyNotifications',
        newValue: null
      }));
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  // Fixed Progress Bar Component with null checks
  const ProgressBar = ({ progress, completed, total, subjects }) => {
    // Add null checks and default values
    const safeSubjects = subjects || [];
    const safeCompleted = completed || 0;
    const safeTotal = total || 1;
    const completionPercentage = Math.round((safeCompleted / safeTotal) * 100);
    
    return (
      <div style={{ marginTop: '12px' }}>
        {/* Main Progress Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <div style={{
            flex: 1,
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${completionPercentage}%`,
              height: '100%',
              backgroundColor: completionPercentage === 100 ? '#10b981' : '#3b82f6',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            color: completionPercentage === 100 ? '#10b981' : '#3b82f6',
            minWidth: '40px'
          }}>
            {completionPercentage}%
          </span>
        </div>

        {/* Subjects Progress - Only render if we have subjects */}
        {safeSubjects.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '8px'
          }}>
            {safeSubjects.map((subject, index) => (
              <div
                key={index}
                title={subject.name || `Subject ${index + 1}`}
                style={{
                  flex: 1,
                  height: '6px',
                  backgroundColor: subject.completed ? '#10b981' : '#e5e7eb',
                  borderRadius: '3px',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        )}

        {/* Progress Text */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#6b7280'
        }}>
          <span>
            {safeCompleted === safeTotal ? 'All subjects completed! 🎉' : `${safeCompleted}/${safeTotal} subjects completed`}
          </span>
          {safeCompleted === safeTotal && (
            <FaCheck size={12} color="#10b981" />
          )}
        </div>
      </div>
    );
  };

  // Enhanced notification item with progress bar
  const renderNotificationItem = (notification) => {
    // Ensure notification data exists
    const notificationData = notification.data || {};
    const subjects = notificationData.subjects || [];
    const completed = notificationData.completed || 0;
    const total = notificationData.total || 0;
    const isCompleted = notificationData.isCompleted || false;
    
    return (
      <div
        key={notification.id}
        className={`notification-item ${!notification.read ? 'unread' : ''} ${notification.type?.includes('daily') ? 'daily-agenda' : ''}`}
        onClick={() => !notification.read && markNotificationAsRead(notification.id)}
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f3f4f6',
          cursor: !notification.read ? 'pointer' : 'default',
          backgroundColor: !notification.read ? 
            (notification.type?.includes('daily') ? '#f0f9ff' : '#fef7cd') : 'transparent',
          position: 'relative',
          transition: 'background-color 0.2s',
          borderLeft: notification.type?.includes('daily') ? 
            (isCompleted ? '4px solid #10b981' : '4px solid #3b82f6') : '4px solid transparent'
        }}
      >
        <button
          className="notification-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNotification(notification.id);
          }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af',
            padding: '4px',
            borderRadius: '4px',
            fontSize: '10px'
          }}
        >
          <FaTimes size={10} />
        </button>

        <div style={{ 
          fontSize: '13px', 
          fontWeight: '600', 
          marginBottom: '4px', 
          color: notification.type?.includes('daily') ? 
            (isCompleted ? '#065f46' : '#1e40af') : '#1f2937'
        }}>
          {notification.title || 'Notification'}
          {notification.type?.includes('daily') && (
            <span style={{
              marginLeft: '8px',
              background: isCompleted ? '#10b981' : '#3b82f6',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: 'normal'
            }}>
              {isCompleted ? 'Completed' : 'Daily Goal'}
            </span>
          )}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: notification.type?.includes('daily') ? 
            (isCompleted ? '#047857' : '#1e40af') : '#4b5563', 
          marginBottom: '6px', 
          lineHeight: '1.4' 
        }}>
          {notification.message || 'No message'}
        </div>

        {/* Progress Bar for Daily Challenges */}
        {notification.type?.includes('daily') && notificationData && (
          <ProgressBar 
            progress={notificationData.progress}
            completed={completed}
            total={total}
            subjects={subjects}
          />
        )}

        <div style={{ 
          fontSize: '11px', 
          color: '#9ca3af', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          marginTop: '8px'
        }}>
          <FaClock size={10} />
          {new Date(notification.date).toLocaleDateString()} at {' '}
          {new Date(notification.date).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        
        {/* Action button for daily challenges */}
        {notification.type?.includes('daily') && !isCompleted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to learning page with the suggested class
              navigate(`/learn/class${notificationData.class || '7'}`);
              markNotificationAsRead(notification.id);
              if (isMobile && onClose) {
                onClose();
              }
            }}
            style={{
              marginTop: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <FaPlay size={10} />
            Continue Learning
          </button>
        )}

        {/* Completed state */}
        {notification.type?.includes('daily') && isCompleted && (
          <div style={{
            marginTop: '12px',
            padding: '8px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: '#065f46'
          }}>
            <FaCheck size={12} />
            All tasks completed for today!
          </div>
        )}
      </div>
    );
  };

  // Desktop Notifications Dropdown
  const DesktopNotifications = () => (
    <AnimatePresence>
      <motion.div
        className="nav-dropdown notifications-dropdown"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        
      >
        <ClassSelector />
        <div className="notifications-container">
          <div className="notifications-header" style={{
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
              {t('nav-notifications')}
            </h3>
            {unreadNotifications > 0 && (
              <span style={{
                background: '#ef4444',
                color: 'white',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {unreadNotifications} new
              </span>
            )}
          </div>

          <div className="notifications-actions" style={{
            padding: '8px 16px',
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #e5e7eb',
            background: '#f8fafc'
          }}>
            {unreadNotifications > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                style={{
                  background: 'none',
                  border: '1px solid #3b82f6',
                  color: '#3b82f6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {t('mark_all_read')}
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                style={{
                  background: 'none',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {t('clear_all')}
              </button>
            )}
          </div>

          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280' }}>
                <FaBell size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>{t('no_notifications_yet')}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>{t('study_plans_will_appear_here')}</p>
              </div>
            ) : (
              notifications.map((notification) => renderNotificationItem(notification))
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  // Mobile Notifications Modal
  const MobileNotificationsModal = () => (
    <>
      <motion.div
        className="mobile-notifications-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
      />
      <motion.div
        className="mobile-notifications-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'none',
          width: '90%',
          maxWidth: '400px',
          maxHeight: '80vh',
          backgroundColor: 'white',
          borderRadius: '12px',
          zIndex: 9999,
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <ClassSelector />
        <div className="notifications-container">
          <div className="notifications-header" style={{
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#3b82f6',
            color: 'white'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Notifications
            </h3>
            <button 
              onClick={onClose} 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: 'white', 
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px'
              }}
            >
              <FaTimes />
            </button>
          </div>

          <div className="notifications-actions" style={{
            padding: '12px 16px',
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #e5e7eb',
            background: '#f8fafc'
          }}>
            {unreadNotifications > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                style={{
                  background: '#3b82f6',
                  border: 'none',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                style={{
                  background: '#ef4444',
                  border: 'none',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear all
              </button>
            )}
          </div>

          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6b7280' }}>
                <FaBell size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>No notifications yet</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => renderNotificationItem(notification))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );

  if (isMobile) {
    return <MobileNotificationsModal />;
  }

  return <DesktopNotifications />;
};

export default Notifications;