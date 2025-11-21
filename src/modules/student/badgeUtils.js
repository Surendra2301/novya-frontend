// src/modules/student/badgeUtils.js

// -------------------------------
// QUICK PRACTICE BADGES
// -------------------------------
export const calculateQuickBadges = (quizHistory = []) => {
  const attempts = quizHistory.map(q => ({
    score: q.score,
    avgTime: q.avgTimePerQuestion || 120 // fallback: 2 minutes if not recorded
  }));

  const count60 = attempts.filter(a => a.score >= 60).length;
  const count75 = attempts.filter(a => a.score >= 75).length;
  const count85 = attempts.filter(a => a.score >= 85).length;
  const count90 = attempts.filter(a => a.score >= 90 && a.avgTime <= 120).length;

  const quickBadges = [];

  if (count60 >= 3) quickBadges.push("Quick Learner");
  if (count75 >= 8) quickBadges.push("Quick Thinker");
  if (count85 >= 15) quickBadges.push("Quick Pro");
  if (count90 >= 20) quickBadges.push("Quick Master");

  return quickBadges;
};

// -------------------------------
// MOCK TEST BADGES
// -------------------------------
export const calculateMockBadges = (mockHistory = []) => {
  const total = mockHistory.length;
  const score70 = mockHistory.filter(m => m.score >= 70).length;
  const score80 = mockHistory.filter(m => m.score >= 80).length;

  const avg =
    mockHistory.reduce((acc, m) => acc + m.score, 0) / (total || 1);

  const mockBadges = [];

  if (total >= 5) mockBadges.push("Mock Rookie");
  if (total >= 8 && score70 >= 10) mockBadges.push("Mock Challenger");
  if (total >= 15 && score80 >= 20) mockBadges.push("Mock Pro");
  if (total >= 20 && avg >= 90) mockBadges.push("Mock Master");

  return mockBadges;
};

// -------------------------------
// GET HIGHEST BADGE (OPTIONAL)
// -------------------------------
export const getHighestBadge = (badgesArray = []) => {
  if (!badgesArray.length) return null;
  return badgesArray[badgesArray.length - 1];
};

