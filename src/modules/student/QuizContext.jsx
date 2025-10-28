
// ////quiz coins working
import { createContext, useContext, useState, useEffect } from 'react';

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
  };

  const getMockHistory = () => {
    return mockHistory;
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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);







