
// import { createContext, useContext, useState, useEffect } from 'react';

// const QuizContext = createContext();

// export const QuizProvider = ({ children }) => {
//   const [quizResults, setQuizResults] = useState({
//     totalQuizzes: 0,
//     totalScore: 0,
//     totalQuestions: 0,
//     byLevel: {},
//   });

//   const [mockTestResults, setMockTestResults] = useState({
//     totalTests: 0,
//     totalScore: 0,
//     totalQuestions: 0,
//   });

//   // History arrays for detailed tracking
//   const [quizHistory, setQuizHistory] = useState([]);
//   const [mockHistory, setMockHistory] = useState([]);
//   const [lessonHistory, setLessonHistory] = useState([]);

//   // Track if quiz is active
//   const [isQuizActive, setIsQuizActive] = useState(false);

//   // Reward points state and management
//   const [rewardPoints, setRewardPoints] = useState(
//     parseInt(localStorage.getItem("rewardPoints")) || 0
//   );

//   const [earnedPoints, setEarnedPoints] = useState({
//     basePoints: 0,
//     bonusPoints: 0,
//     totalPoints: 0,
//   });

//   const [pointsAwarded, setPointsAwarded] = useState(false);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [hasAwardedPoints, setHasAwardedPoints] = useState(false);

//   // Initialize all histories from localStorage
//   useEffect(() => {
//     const savedQuizHistory = localStorage.getItem("quizHistory");
//     const savedMockHistory = localStorage.getItem("mockHistory");
//     const savedLessonHistory = localStorage.getItem("lessonHistory");
    
//     if (savedQuizHistory) setQuizHistory(JSON.parse(savedQuizHistory));
//     if (savedMockHistory) setMockHistory(JSON.parse(savedMockHistory));
//     if (savedLessonHistory) setLessonHistory(JSON.parse(savedLessonHistory));
//   }, []);

//   // Save histories to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
//   }, [quizHistory]);

//   useEffect(() => {
//     localStorage.setItem("mockHistory", JSON.stringify(mockHistory));
//   }, [mockHistory]);

//   useEffect(() => {
//     localStorage.setItem("lessonHistory", JSON.stringify(lessonHistory));
//   }, [lessonHistory]);

//   // Save rewardPoints persistently and sync across components
//   useEffect(() => {
//     localStorage.setItem("rewardPoints", rewardPoints.toString());
//     // Dispatch event to sync across all components
//     window.dispatchEvent(new CustomEvent('rewardPointsUpdated', {
//       detail: { rewardPoints }
//     }));
//   }, [rewardPoints]);

//   // Initialize reward points from localStorage on component mount
//   useEffect(() => {
//     const savedPoints = parseInt(localStorage.getItem('rewardPoints')) || 0;
//     if (savedPoints !== rewardPoints) {
//       setRewardPoints(savedPoints);
//     }
//   }, []);

//   // Function to calculate earned points - UPDATED BONUS LOGIC
//   const calculateEarnedPoints = (score, totalQuestions) => {
//     const basePoints = score; // 1 point per correct answer
//     const percentage = (score / totalQuestions) * 100;
//     // Fixed 10 points bonus for 80%+ scores instead of 50%
//     const bonusPoints = percentage >= 80 ? 10 : 0;
//     const totalPoints = basePoints + bonusPoints;
//     const earnedPointsData = {
//       basePoints,
//       bonusPoints,
//       totalPoints
//     };
//     setEarnedPoints(earnedPointsData);
//     return earnedPointsData;
//   };

//   // Function to update global reward points
//   const updateRewardPoints = (points) => {
//     setRewardPoints(points);
//     localStorage.setItem("rewardPoints", points.toString());
//   };

//   // Function to add earned points after quiz (with protection against multiple awards)
//   const addEarnedPoints = (earned) => {
//     if (!hasAwardedPoints && earned.totalPoints > 0) {
//       const total = rewardPoints + earned.totalPoints;
//       setEarnedPoints(earned);
//       setRewardPoints(total);
//       setHasAwardedPoints(true);
//       setPointsAwarded(true);
//       return true; // Points were awarded
//     }
//     return false; // Points were not awarded (already awarded or zero)
//   };

//   // Function to start quiz
//   const startQuiz = () => {
//     console.log("Quiz started!");
//     setQuizStarted(true);
//     setIsQuizActive(true);
//     setHasAwardedPoints(false); // Reset points awarded flag when starting new quiz
//     setPointsAwarded(false);
//     setEarnedPoints({ basePoints: 0, bonusPoints: 0, totalPoints: 0 }); // Reset earned points
//   };

//   // Function to reset quiz
//   const resetQuiz = () => {
//     setQuizStarted(false);
//     setPointsAwarded(false);
//     setHasAwardedPoints(false);
//     setEarnedPoints({ basePoints: 0, bonusPoints: 0, totalPoints: 0 });
//   };

//   // Reset points awarded flag (for retry scenarios)
//   const resetPointsAwarded = () => {
//     setHasAwardedPoints(false);
//     setPointsAwarded(false);
//   };

//   const updateQuizResults = (score, totalQuestions, level, className, subject, subtopic) => {
//     setQuizResults(prev => ({
//       totalQuizzes: prev.totalQuizzes + 1,
//       totalScore: prev.totalScore + score,
//       totalQuestions: prev.totalQuestions + totalQuestions,
//       byLevel: {
//         ...prev.byLevel,
//         [level]: (prev.byLevel[level] || 0) + 1,
//       },
//     }));

//     // Add to history
//     const historyItem = {
//       id: Date.now(),
//       class: className,
//       subject,
//       topic: subtopic,
//       score: Math.round((score / totalQuestions) * 100),
//       questions: totalQuestions,
//       date: new Date().toISOString().split('T')[0]
//     };
//     setQuizHistory(prev => [...prev, historyItem]);

//     // Award points only if user passed and points haven't been awarded yet
//     if (score >= 5 && !hasAwardedPoints) {
//       const earned = calculateEarnedPoints(score, totalQuestions);
//       const pointsAwarded = addEarnedPoints(earned);
//       console.log(`Points awarded for quiz: ${pointsAwarded ? 'Yes' : 'No'}, Total: ${earned.totalPoints}`);
//     }
//   };

//   const getQuizHistory = () => {
//     return quizHistory;
//   };

//   const updateMockTestResults = (score, totalQuestions, className, subject, chapter) => {
//     setMockTestResults(prev => ({
//       totalTests: prev.totalTests + 1,
//       totalScore: prev.totalScore + score,
//       totalQuestions: prev.totalQuestions + totalQuestions,
//     }));

//     // Add to history
//     const historyItem = {
//       id: Date.now(),
//       class: className,
//       subject,
//       topic: chapter,
//       score: Math.round((score / totalQuestions) * 100),
//       questions: totalQuestions,
//       date: new Date().toISOString().split('T')[0]
//     };
//     setMockHistory(prev => [...prev, historyItem]);
//   };

//   const getMockHistory = () => {
//     return mockHistory;
//   };

//   // UPDATED: Enhanced Lesson History Functions to track all activity types
//   const getLessonHistory = () => {
//     return lessonHistory;
//   };

//   const addLessonToHistory = (lessonData) => {
//     try {
//       // Create a unique identifier for the activity
//       const activityId = `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
//       const newActivity = {
//         id: activityId,
//         date: new Date().toISOString().split('T')[0],
//         timestamp: new Date().toISOString(),
//         videoCompleted: lessonData.activityType === 'video' ? true : false,
//         completed: true,
//         rewardPoints: lessonData.rewardPoints || 0,
//         duration: lessonData.duration || 15, // Default 15 minutes
//         ...lessonData
//       };

//       const updatedHistory = [newActivity, ...lessonHistory];
//       setLessonHistory(updatedHistory);

//       // Award reward points if any
//       if (lessonData.rewardPoints && lessonData.rewardPoints > 0) {
//         const total = rewardPoints + lessonData.rewardPoints;
//         setRewardPoints(total);
//       }

//       // Dispatch storage event to notify LearningReports component
//       window.dispatchEvent(new Event('storage'));
      
//       return true;
//     } catch (error) {
//       console.error('Error saving lesson history:', error);
//       return false;
//     }
//   };

//   // NEW: Function to track specific activity types
//   const trackLearningActivity = (activityData) => {
//     const defaultData = {
//       activityType: 'general',
//       subject: 'General',
//       chapter: 'General',
//       title: 'Learning Activity',
//       duration: 15,
//       rewardPoints: 5, // Default points for any learning activity
//       completed: true,
//       timestamp: new Date().toISOString()
//     };

//     const activityToSave = { ...defaultData, ...activityData };
//     return addLessonToHistory(activityToSave);
//   };

//   // NEW: Specific functions for different activity types
//   const trackVideoCompletion = (videoData) => {
//     const activityData = {
//       activityType: 'video',
//       title: videoData.title || `${videoData.subject} - ${videoData.chapter}`,
//       rewardPoints: 10, // More points for video completion
//       duration: videoData.duration || 20,
//       ...videoData
//     };
//     return trackLearningActivity(activityData);
//   };

//   const trackAIAssistantUsage = (aiData) => {
//     const activityData = {
//       activityType: 'ai_assistant',
//       title: aiData.title || 'AI Assistant Session',
//       rewardPoints: 5,
//       duration: aiData.duration || 10,
//       ...aiData
//     };
//     return trackLearningActivity(activityData);
//   };

//   const trackNotesCreation = (notesData) => {
//     const activityData = {
//       activityType: 'notes',
//       title: notesData.title || 'Notes Created',
//       rewardPoints: 3,
//       duration: notesData.duration || 5,
//       ...notesData
//     };
//     return trackLearningActivity(activityData);
//   };

//   const trackQuickPractice = (practiceData) => {
//     const activityData = {
//       activityType: 'quick_practice',
//       title: practiceData.title || 'Quick Practice',
//       rewardPoints: 7,
//       duration: practiceData.duration || 15,
//       ...practiceData
//     };
//     return trackLearningActivity(activityData);
//   };

//   // NEW: Function to track feedback submission
//   const trackFeedbackSubmission = (feedbackData) => {
//     const activityData = {
//       activityType: 'feedback',
//       title: feedbackData.title || 'Platform Feedback',
//       rewardPoints: feedbackData.rewardPoints || 0, // No points for regular feedback, only first time
//       duration: 5, // Quick activity
//       rating: feedbackData.rating,
//       comment: feedbackData.comment,
//       ...feedbackData
//     };
//     return trackLearningActivity(activityData);
//   };

//   // NEW: Function to track typing practice
//   const trackTypingPractice = (typingData) => {
//     const activityData = {
//       activityType: 'typing_practice',
//       title: typingData.title || `Typing Practice - ${typingData.difficulty} Level`,
//       rewardPoints: typingData.rewardPoints || 0,
//       duration: typingData.duration || 5,
//       subject: 'Typing',
//       chapter: 'Keyboard Skills',
//       speed: typingData.speed,
//       accuracy: typingData.accuracy,
//       difficulty: typingData.difficulty,
//       keystrokes: typingData.keystrokes,
//       correctKeystrokes: typingData.correctKeystrokes,
//       ...typingData
//     };
//     return trackLearningActivity(activityData);
//   };

//   // NEW: Function to track spin wheel activity
//   const trackSpinWheel = (spinData) => {
//     const activityData = {
//       activityType: 'spin_wheel',
//       title: spinData.title || 'Daily Spin Wheel',
//       rewardPoints: spinData.rewardPoints || 0,
//       duration: spinData.duration || 1,
//       subject: 'Rewards',
//       chapter: 'Daily Bonus',
//       rewardName: spinData.rewardName,
//       rewardValue: spinData.rewardValue,
//       spinsRemaining: spinData.spinsRemaining,
//       ...spinData
//     };
//     return trackLearningActivity(activityData);
//   };

//   const updateLessonCompletion = (lessonId, updates) => {
//     try {
//       const updatedHistory = lessonHistory.map(lesson => 
//         lesson.id === lessonId ? { ...lesson, ...updates } : lesson
//       );
//       setLessonHistory(updatedHistory);
//       return true;
//     } catch (error) {
//       console.error('Error updating lesson:', error);
//       return false;
//     }
//   };

//   // Original endQuiz
//   const endQuiz = () => setIsQuizActive(false);

//   return (
//     <QuizContext.Provider
//       value={{
//         quizResults,
//         mockTestResults,
//         updateQuizResults,
//         updateMockTestResults,
//         getQuizHistory,
//         getMockHistory,
        
//         // Lesson history functions
//         getLessonHistory,
//         addLessonToHistory,
//         updateLessonCompletion,
        
//         // NEW: Enhanced activity tracking functions
//         trackLearningActivity,
//         trackVideoCompletion,
//         trackAIAssistantUsage,
//         trackNotesCreation,
//         trackQuickPractice,
//         trackFeedbackSubmission,
//         trackTypingPractice,
//         trackSpinWheel, // NEW: Added spin wheel tracking

//         isQuizActive,
//         startQuiz,
//         endQuiz,

//         // Reward points management
//         rewardPoints,
//         updateRewardPoints,
//         calculateEarnedPoints,
//         earnedPoints,
//         pointsAwarded,
//         addEarnedPoints,
//         quizStarted,
//         resetQuiz,
//         resetPointsAwarded,
//         hasAwardedPoints,
//       }}
//     >
//       {children}
//     </QuizContext.Provider>
//   );
// };

// export const useQuiz = () => useContext(QuizContext);













// ////test code
// import { createContext, useContext, useState, useEffect } from 'react';
// import { calculateQuickBadges, calculateMockBadges } from "./badgeUtils";

// const QuizContext = createContext();

// export const QuizProvider = ({ children }) => {
//   const [quizResults, setQuizResults] = useState({
//     totalQuizzes: 0,
//     totalScore: 0,
//     totalQuestions: 0,
//     byLevel: {},
//   });

//   const [mockTestResults, setMockTestResults] = useState({
//     totalTests: 0,
//     totalScore: 0,
//     totalQuestions: 0,
//   });

//   // History arrays for detailed tracking
//   const [quizHistory, setQuizHistory] = useState([]);
//   const [mockHistory, setMockHistory] = useState([]);
//   const [lessonHistory, setLessonHistory] = useState([]);

//   // Track if quiz is active
//   const [isQuizActive, setIsQuizActive] = useState(false);

//   // Reward points state and management
//   const [rewardPoints, setRewardPoints] = useState(
//     parseInt(localStorage.getItem("rewardPoints")) || 0
//   );

//   const [earnedPoints, setEarnedPoints] = useState({
//     basePoints: 0,
//     bonusPoints: 0,
//     totalPoints: 0,
//   });

//   const [pointsAwarded, setPointsAwarded] = useState(false);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [hasAwardedPoints, setHasAwardedPoints] = useState(false);

//   // ⭐ NEW — BADGES
//   const [badges, setBadges] = useState({
//     quickBadges: [],
//     mockBadges: [],
//     quickHighest: null,
//     mockHighest: null
//   });

//   // ---------------------------------------------
//   // ⭐ TEST MODE — Display All Badges Immediately
//   // ---------------------------------------------
//   useEffect(() => {
//     console.log("⚠️ TEST MODE ENABLED: Fake data loaded to show ALL badges");

//     // Fake Quick Practice History → 25 high scores
//     const fakeQuiz = Array(25).fill({
//       score: 95,
//       avgTimePerQuestion: 60
//     });

//     // Fake Mock Test History → 25 high scores
//     const fakeMock = Array(25).fill({
//       score: 92
//     });

//     const quickBadges = calculateQuickBadges(fakeQuiz);
//     const mockBadges = calculateMockBadges(fakeMock);

//     setBadges({
//       quickBadges,
//       mockBadges,
//       quickHighest: quickBadges[quickBadges.length - 1] || null,
//       mockHighest: mockBadges[mockBadges.length - 1] || null
//     });
//   }, []);

//   // Initialize all histories from localStorage
//   useEffect(() => {
//     const savedQuizHistory = localStorage.getItem("quizHistory");
//     const savedMockHistory = localStorage.getItem("mockHistory");
//     const savedLessonHistory = localStorage.getItem("lessonHistory");

//     if (savedQuizHistory) setQuizHistory(JSON.parse(savedQuizHistory));
//     if (savedMockHistory) setMockHistory(JSON.parse(savedMockHistory));
//     if (savedLessonHistory) setLessonHistory(JSON.parse(savedLessonHistory));
//   }, []);

//   // Save histories to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
//   }, [quizHistory]);

//   useEffect(() => {
//     localStorage.setItem("mockHistory", JSON.stringify(mockHistory));
//   }, [mockHistory]);

//   useEffect(() => {
//     localStorage.setItem("lessonHistory", JSON.stringify(lessonHistory));
//   }, [lessonHistory]);

//   // Save rewardPoints persistently and sync across components
//   useEffect(() => {
//     localStorage.setItem("rewardPoints", rewardPoints.toString());
//     window.dispatchEvent(new CustomEvent("rewardPointsUpdated", {
//       detail: { rewardPoints }
//     }));
//   }, [rewardPoints]);

//   useEffect(() => {
//     const savedPoints = parseInt(localStorage.getItem("rewardPoints")) || 0;
//     if (savedPoints !== rewardPoints) {
//       setRewardPoints(savedPoints);
//     }
//   }, []);

//   // --------------------------------------------
//   // POINTS CALCULATION
//   // --------------------------------------------
//   const calculateEarnedPoints = (score, totalQuestions) => {
//     const basePoints = score;
//     const percentage = (score / totalQuestions) * 100;
//     const bonusPoints = percentage >= 80 ? 10 : 0;
//     const totalPoints = basePoints + bonusPoints;

//     const earned = { basePoints, bonusPoints, totalPoints };
//     setEarnedPoints(earned);
//     return earned;
//   };

//   const updateRewardPoints = (points) => {
//     setRewardPoints(points);
//     localStorage.setItem("rewardPoints", points.toString());
//   };

//   const addEarnedPoints = (earned) => {
//     if (!hasAwardedPoints && earned.totalPoints > 0) {
//       const total = rewardPoints + earned.totalPoints;
//       setRewardPoints(total);
//       setHasAwardedPoints(true);
//       setPointsAwarded(true);
//       return true;
//     }
//     return false;
//   };

//   const startQuiz = () => {
//     setQuizStarted(true);
//     setIsQuizActive(true);
//     setHasAwardedPoints(false);
//     setEarnedPoints({ basePoints: 0, bonusPoints: 0, totalPoints: 0 });
//   };

//   const resetQuiz = () => {
//     setQuizStarted(false);
//     setPointsAwarded(false);
//     setHasAwardedPoints(false);
//     setEarnedPoints({ basePoints: 0, bonusPoints: 0, totalPoints: 0 });
//   };

//   const resetPointsAwarded = () => {
//     setHasAwardedPoints(false);
//     setPointsAwarded(false);
//   };

//   // --------------------------------------------
//   // UPDATE QUIZ RESULTS
//   // --------------------------------------------
//   const updateQuizResults = (score, totalQuestions, level, className, subject, subtopic) => {
//     setQuizResults(prev => ({
//       totalQuizzes: prev.totalQuizzes + 1,
//       totalScore: prev.totalScore + score,
//       totalQuestions: prev.totalQuestions + totalQuestions,
//       byLevel: {
//         ...prev.byLevel,
//         [level]: (prev.byLevel[level] || 0) + 1,
//       },
//     }));

//     const historyItem = {
//       id: Date.now(),
//       class: className,
//       subject,
//       topic: subtopic,
//       score: Math.round((score / totalQuestions) * 100),
//       questions: totalQuestions,
//       date: new Date().toISOString().split("T")[0],
//     };

//     setQuizHistory(prev => [...prev, historyItem]);

//     // Update Quick Practice badges
//     const newQuick = calculateQuickBadges([...quizHistory, historyItem]);

//     setBadges(prev => ({
//       ...prev,
//       quickBadges: newQuick,
//       quickHighest: newQuick[newQuick.length - 1] || null
//     }));

//     if (score >= 5 && !hasAwardedPoints) {
//       const earned = calculateEarnedPoints(score, totalQuestions);
//       addEarnedPoints(earned);
//     }
//   };

//   const getQuizHistory = () => quizHistory;

//   // --------------------------------------------
//   // UPDATE MOCK TEST RESULTS
//   // --------------------------------------------
//   const updateMockTestResults = (score, totalQuestions, className, subject, chapter) => {
//     setMockTestResults(prev => ({
//       totalTests: prev.totalTests + 1,
//       totalScore: prev.totalScore + score,
//       totalQuestions: prev.totalQuestions + totalQuestions,
//     }));

//     const historyItem = {
//       id: Date.now(),
//       class: className,
//       subject,
//       topic: chapter,
//       score: Math.round((score / totalQuestions) * 100),
//       questions: totalQuestions,
//       date: new Date().toISOString().split("T")[0],
//     };

//     setMockHistory(prev => [...prev, historyItem]);

//     const newMock = calculateMockBadges([...mockHistory, historyItem]);

//     setBadges(prev => ({
//       ...prev,
//       mockBadges: newMock,
//       mockHighest: newMock[newMock.length - 1] || null
//     }));
//   };

//   const getMockHistory = () => mockHistory;

//   // --------------------------------------------
//   // LESSON / ACTIVITY TRACKING (UNCHANGED)
//   // --------------------------------------------
//   const getLessonHistory = () => lessonHistory;

//   const addLessonToHistory = (lessonData) => {
//     try {
//       const newActivity = {
//         id: "activity-" + Date.now(),
//         date: new Date().toISOString().split("T")[0],
//         timestamp: new Date().toISOString(),
//         videoCompleted: lessonData.activityType === "video",
//         completed: true,
//         rewardPoints: lessonData.rewardPoints || 0,
//         duration: lessonData.duration || 15,
//         ...lessonData,
//       };

//       const updated = [newActivity, ...lessonHistory];
//       setLessonHistory(updated);

//       if (lessonData.rewardPoints > 0) {
//         setRewardPoints(rewardPoints + lessonData.rewardPoints);
//       }

//       window.dispatchEvent(new Event("storage"));
//       return true;
//     } catch (err) {
//       console.error("Error saving lesson:", err);
//       return false;
//     }
//   };

//   const trackLearningActivity = (data) => {
//     const activity = {
//       activityType: "general",
//       subject: "General",
//       chapter: "General",
//       title: "Learning Activity",
//       duration: 15,
//       rewardPoints: 5,
//       completed: true,
//       timestamp: new Date().toISOString(),
//       ...data,
//     };
//     return addLessonToHistory(activity);
//   };

//   const trackVideoCompletion = (data) =>
//     trackLearningActivity({
//       activityType: "video",
//       rewardPoints: 10,
//       duration: data.duration || 20,
//       ...data
//     });

//   const trackAIAssistantUsage = (data) =>
//     trackLearningActivity({
//       activityType: "ai_assistant",
//       rewardPoints: 5,
//       duration: data.duration || 10,
//       ...data
//     });

//   const trackNotesCreation = (data) =>
//     trackLearningActivity({
//       activityType: "notes",
//       rewardPoints: 3,
//       duration: data.duration || 5,
//       ...data
//     });

//   const trackQuickPractice = (data) =>
//     trackLearningActivity({
//       activityType: "quick_practice",
//       rewardPoints: 7,
//       duration: data.duration || 15,
//       ...data
//     });

//   const trackFeedbackSubmission = (data) =>
//     trackLearningActivity({
//       activityType: "feedback",
//       rewardPoints: data.rewardPoints || 0,
//       duration: 5,
//       ...data
//     });

//   const trackTypingPractice = (data) =>
//     trackLearningActivity({
//       activityType: "typing_practice",
//       subject: "Typing",
//       chapter: "Keyboard Skills",
//       duration: data.duration || 5,
//       rewardPoints: data.rewardPoints || 0,
//       ...data
//     });

//   const trackSpinWheel = (data) =>
//     trackLearningActivity({
//       activityType: "spin_wheel",
//       subject: "Rewards",
//       chapter: "Daily Bonus",
//       duration: data.duration || 1,
//       rewardPoints: data.rewardPoints || 0,
//       ...data
//     });

//   const updateLessonCompletion = (id, updates) => {
//     try {
//       const updated = lessonHistory.map(l =>
//         l.id === id ? { ...l, ...updates } : l
//       );
//       setLessonHistory(updated);
//       return true;
//     } catch (err) {
//       console.error("Error updating lesson:", err);
//       return false;
//     }
//   };

//   const endQuiz = () => setIsQuizActive(false);

//   return (
//     <QuizContext.Provider
//       value={{
//         quizResults,
//         mockTestResults,
//         updateQuizResults,
//         updateMockTestResults,
//         getQuizHistory,
//         getMockHistory,

//         // badge system
//         badges,

//         // Lesson history
//         getLessonHistory,
//         addLessonToHistory,
//         updateLessonCompletion,

//         // activity tracking
//         trackLearningActivity,
//         trackVideoCompletion,
//         trackAIAssistantUsage,
//         trackNotesCreation,
//         trackQuickPractice,
//         trackFeedbackSubmission,
//         trackTypingPractice,
//         trackSpinWheel,

//         isQuizActive,
//         startQuiz,
//         endQuiz,

//         // reward points
//         rewardPoints,
//         updateRewardPoints,
//         calculateEarnedPoints,
//         earnedPoints,
//         pointsAwarded,
//         addEarnedPoints,
//         quizStarted,
//         resetQuiz,
//         resetPointsAwarded,
//         hasAwardedPoints,
//       }}
//     >
//       {children}
//     </QuizContext.Provider>
//   );
// };

// export const useQuiz = () => useContext(QuizContext);














//badges
import { createContext, useContext, useState, useEffect } from 'react';
import { calculateQuickBadges, calculateMockBadges } from "./badgeUtils";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizResults, setQuizResults] = useState({
    totalQuizzes: 0,
    totalScore: 0,
    totalQuestions: 0,
    byLevel: {},
  });

  const [mockTestResults, setMockTestResults] = useState({
    totalTests: 0,
    totalScore: 0,
    totalQuestions: 0,
  });

  // History arrays for detailed tracking
  const [quizHistory, setQuizHistory] = useState([]);
  const [mockHistory, setMockHistory] = useState([]);
  const [lessonHistory, setLessonHistory] = useState([]);

  // Track if quiz is active
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Reward points state and management
  const [rewardPoints, setRewardPoints] = useState(
    parseInt(localStorage.getItem("rewardPoints")) || 0
  );

  const [earnedPoints, setEarnedPoints] = useState({
    basePoints: 0,
    bonusPoints: 0,
    totalPoints: 0,
  });

  const [pointsAwarded, setPointsAwarded] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false);
// ⭐ NEW — BADGES
const [badges, setBadges] = useState({
  quickBadges: [],
  mockBadges: []
});

  // Initialize all histories from localStorage
  useEffect(() => {
    const savedQuizHistory = localStorage.getItem("quizHistory");
    const savedMockHistory = localStorage.getItem("mockHistory");
    const savedLessonHistory = localStorage.getItem("lessonHistory");
    
    if (savedQuizHistory) setQuizHistory(JSON.parse(savedQuizHistory));
    if (savedMockHistory) setMockHistory(JSON.parse(savedMockHistory));
    if (savedLessonHistory) setLessonHistory(JSON.parse(savedLessonHistory));
  }, []);

  // Save histories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
  }, [quizHistory]);

  useEffect(() => {
    localStorage.setItem("mockHistory", JSON.stringify(mockHistory));
  }, [mockHistory]);

  useEffect(() => {
    localStorage.setItem("lessonHistory", JSON.stringify(lessonHistory));
  }, [lessonHistory]);

  // Save rewardPoints persistently and sync across components
  useEffect(() => {
    localStorage.setItem("rewardPoints", rewardPoints.toString());
    // Dispatch event to sync across all components
    window.dispatchEvent(new CustomEvent('rewardPointsUpdated', {
      detail: { rewardPoints }
    }));
  }, [rewardPoints]);

  // Initialize reward points from localStorage on component mount
  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem('rewardPoints')) || 0;
    if (savedPoints !== rewardPoints) {
      setRewardPoints(savedPoints);
    }
  }, []);

  // Function to calculate earned points - UPDATED BONUS LOGIC
  const calculateEarnedPoints = (score, totalQuestions) => {
    const basePoints = score; // 1 point per correct answer
    const percentage = (score / totalQuestions) * 100;
    // Fixed 10 points bonus for 80%+ scores instead of 50%
    const bonusPoints = percentage >= 80 ? 10 : 0;
    const totalPoints = basePoints + bonusPoints;
    const earnedPointsData = {
      basePoints,
      bonusPoints,
      totalPoints
    };
    setEarnedPoints(earnedPointsData);
    return earnedPointsData;
  };

  // Function to update global reward points
  const updateRewardPoints = (points) => {
    setRewardPoints(points);
    localStorage.setItem("rewardPoints", points.toString());
  };

  // Function to add earned points after quiz (with protection against multiple awards)
  const addEarnedPoints = (earned) => {
    if (!hasAwardedPoints && earned.totalPoints > 0) {
      const total = rewardPoints + earned.totalPoints;
      setEarnedPoints(earned);
      setRewardPoints(total);
      setHasAwardedPoints(true);
      setPointsAwarded(true);
      return true; // Points were awarded
    }
    return false; // Points were not awarded (already awarded or zero)
  };

  // Function to start quiz
  const startQuiz = () => {
    console.log("Quiz started!");
    setQuizStarted(true);
    setIsQuizActive(true);
    setHasAwardedPoints(false); // Reset points awarded flag when starting new quiz
    setPointsAwarded(false);
    setEarnedPoints({ basePoints: 0, bonusPoints: 0, totalPoints: 0 }); // Reset earned points
  };

  // Function to reset quiz
  const resetQuiz = () => {
    setQuizStarted(false);
    setPointsAwarded(false);
    setHasAwardedPoints(false);
    setEarnedPoints({ basePoints: 0, bonusPoints: 0, totalPoints: 0 });
  };

  // Reset points awarded flag (for retry scenarios)
  const resetPointsAwarded = () => {
    setHasAwardedPoints(false);
    setPointsAwarded(false);
  };

  const updateQuizResults = (score, totalQuestions, level, className, subject, subtopic) => {
    setQuizResults(prev => ({
      totalQuizzes: prev.totalQuizzes + 1,
      totalScore: prev.totalScore + score,
      totalQuestions: prev.totalQuestions + totalQuestions,
      byLevel: {
        ...prev.byLevel,
        [level]: (prev.byLevel[level] || 0) + 1,
      },
    }));

    // Add to history
    const historyItem = {
      id: Date.now(),
      class: className,
      subject,
      topic: subtopic,
      score: Math.round((score / totalQuestions) * 100),
      questions: totalQuestions,
      date: new Date().toISOString().split('T')[0]
    };
    setQuizHistory(prev => [...prev, historyItem]);
// ⭐ UPDATE QUICK PRACTICE BADGES
const newQuickBadges = calculateQuickBadges([...quizHistory, historyItem]);
setBadges(prev => ({ ...prev, quickBadges: newQuickBadges }));

    // Award points only if user passed and points haven't been awarded yet
    if (score >= 5 && !hasAwardedPoints) {
      const earned = calculateEarnedPoints(score, totalQuestions);
      const pointsAwarded = addEarnedPoints(earned);
      console.log(`Points awarded for quiz: ${pointsAwarded ? 'Yes' : 'No'}, Total: ${earned.totalPoints}`);
    }
  };

  const getQuizHistory = () => {
    return quizHistory;
  };

  const updateMockTestResults = (score, totalQuestions, className, subject, chapter) => {
    setMockTestResults(prev => ({
      totalTests: prev.totalTests + 1,
      totalScore: prev.totalScore + score,
      totalQuestions: prev.totalQuestions + totalQuestions,
    }));

    // Add to history
    const historyItem = {
      id: Date.now(),
      class: className,
      subject,
      topic: chapter,
      score: Math.round((score / totalQuestions) * 100),
      questions: totalQuestions,
      date: new Date().toISOString().split('T')[0]
    };
    setMockHistory(prev => [...prev, historyItem]);
    // ⭐ UPDATE MOCK TEST BADGES
const newMockBadges = calculateMockBadges([...mockHistory, historyItem]);
setBadges(prev => ({ ...prev, mockBadges: newMockBadges }));

  };

  const getMockHistory = () => {
    return mockHistory;
  };

  // UPDATED: Enhanced Lesson History Functions to track all activity types
  const getLessonHistory = () => {
    return lessonHistory;
  };

  const addLessonToHistory = (lessonData) => {
    try {
      // Create a unique identifier for the activity
      const activityId = `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newActivity = {
        id: activityId,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        videoCompleted: lessonData.activityType === 'video' ? true : false,
        completed: true,
        rewardPoints: lessonData.rewardPoints || 0,
        duration: lessonData.duration || 15, // Default 15 minutes
        ...lessonData
      };

      const updatedHistory = [newActivity, ...lessonHistory];
      setLessonHistory(updatedHistory);

      // Award reward points if any
      if (lessonData.rewardPoints && lessonData.rewardPoints > 0) {
        const total = rewardPoints + lessonData.rewardPoints;
        setRewardPoints(total);
      }

      // Dispatch storage event to notify LearningReports component
      window.dispatchEvent(new Event('storage'));
      
      return true;
    } catch (error) {
      console.error('Error saving lesson history:', error);
      return false;
    }
  };

  // NEW: Function to track specific activity types
  const trackLearningActivity = (activityData) => {
    const defaultData = {
      activityType: 'general',
      subject: 'General',
      chapter: 'General',
      title: 'Learning Activity',
      duration: 15,
      rewardPoints: 5, // Default points for any learning activity
      completed: true,
      timestamp: new Date().toISOString()
    };

    const activityToSave = { ...defaultData, ...activityData };
    return addLessonToHistory(activityToSave);
  };

  // NEW: Specific functions for different activity types
  const trackVideoCompletion = (videoData) => {
    const activityData = {
      activityType: 'video',
      title: videoData.title || `${videoData.subject} - ${videoData.chapter}`,
      rewardPoints: 10, // More points for video completion
      duration: videoData.duration || 20,
      ...videoData
    };
    return trackLearningActivity(activityData);
  };

  const trackAIAssistantUsage = (aiData) => {
    const activityData = {
      activityType: 'ai_assistant',
      title: aiData.title || 'AI Assistant Session',
      rewardPoints: 5,
      duration: aiData.duration || 10,
      ...aiData
    };
    return trackLearningActivity(activityData);
  };

  const trackNotesCreation = (notesData) => {
    const activityData = {
      activityType: 'notes',
      title: notesData.title || 'Notes Created',
      rewardPoints: 3,
      duration: notesData.duration || 5,
      ...notesData
    };
    return trackLearningActivity(activityData);
  };

  const trackQuickPractice = (practiceData) => {
    const activityData = {
      activityType: 'quick_practice',
      title: practiceData.title || 'Quick Practice',
      rewardPoints: 7,
      duration: practiceData.duration || 15,
      ...practiceData
    };
    return trackLearningActivity(activityData);
  };

  // NEW: Function to track feedback submission
  const trackFeedbackSubmission = (feedbackData) => {
    const activityData = {
      activityType: 'feedback',
      title: feedbackData.title || 'Platform Feedback',
      rewardPoints: feedbackData.rewardPoints || 0, // No points for regular feedback, only first time
      duration: 5, // Quick activity
      rating: feedbackData.rating,
      comment: feedbackData.comment,
      ...feedbackData
    };
    return trackLearningActivity(activityData);
  };

  // NEW: Function to track typing practice
  const trackTypingPractice = (typingData) => {
    const activityData = {
      activityType: 'typing_practice',
      title: typingData.title || `Typing Practice - ${typingData.difficulty} Level`,
      rewardPoints: typingData.rewardPoints || 0,
      duration: typingData.duration || 5,
      subject: 'Typing',
      chapter: 'Keyboard Skills',
      speed: typingData.speed,
      accuracy: typingData.accuracy,
      difficulty: typingData.difficulty,
      keystrokes: typingData.keystrokes,
      correctKeystrokes: typingData.correctKeystrokes,
      ...typingData
    };
    return trackLearningActivity(activityData);
  };

  // NEW: Function to track spin wheel activity
  const trackSpinWheel = (spinData) => {
    const activityData = {
      activityType: 'spin_wheel',
      title: spinData.title || 'Daily Spin Wheel',
      rewardPoints: spinData.rewardPoints || 0,
      duration: spinData.duration || 1,
      subject: 'Rewards',
      chapter: 'Daily Bonus',
      rewardName: spinData.rewardName,
      rewardValue: spinData.rewardValue,
      spinsRemaining: spinData.spinsRemaining,
      ...spinData
    };
    return trackLearningActivity(activityData);
  };

  const updateLessonCompletion = (lessonId, updates) => {
    try {
      const updatedHistory = lessonHistory.map(lesson => 
        lesson.id === lessonId ? { ...lesson, ...updates } : lesson
      );
      setLessonHistory(updatedHistory);
      return true;
    } catch (error) {
      console.error('Error updating lesson:', error);
      return false;
    }
  };

  // Original endQuiz
  const endQuiz = () => setIsQuizActive(false);

  return (
    <QuizContext.Provider
      value={{
        quizResults,
        mockTestResults,
        updateQuizResults,
        updateMockTestResults,
        getQuizHistory,
        getMockHistory,
        
        // Lesson history functions
        getLessonHistory,
        addLessonToHistory,
        updateLessonCompletion,
        
        // NEW: Enhanced activity tracking functions
        trackLearningActivity,
        trackVideoCompletion,
        trackAIAssistantUsage,
        trackNotesCreation,
        trackQuickPractice,
        trackFeedbackSubmission,
        trackTypingPractice,
        trackSpinWheel, // NEW: Added spin wheel tracking

        isQuizActive,
        startQuiz,
        endQuiz,

        // Reward points management
        rewardPoints,
        updateRewardPoints,
        calculateEarnedPoints,
        earnedPoints,
        pointsAwarded,
        addEarnedPoints,
        quizStarted,
        resetQuiz,
        resetPointsAwarded,
        hasAwardedPoints,
        badges,

      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);








