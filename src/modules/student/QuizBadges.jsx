import React, { useState } from 'react';
import './Badges.css';
import { FaLock, FaUnlock, FaTrophy, FaAward } from 'react-icons/fa';

const QuizBadgesGuide = () => {
  const [activeTab, setActiveTab] = useState('quick-practice');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  const quickPracticeBadges = [
    {
      id: 1,
      name: "Quick Learner",
      requirements: "Complete 10 Quick Practices with ≥60% accuracy",
      description: "Beginner-level badge",
      difficulty: "★",
      difficultyLevel: 1,
      tips: ["Start with easier topics", "Focus on understanding concepts", "Practice regularly"],
      icon: "⚡"
    },
    {
      id: 2,
      name: "Quick Thinker",
      requirements: "Complete 30 Quick Practices with ≥75% accuracy",
      description: "Intermediate level",
      difficulty: "★★★",
      difficultyLevel: 3,
      tips: ["Time yourself", "Review mistakes", "Build consistency"],
      icon: "⚡"
    },
    {
      id: 3,
      name: "Quick Pro",
      requirements: "Complete 75 Quick Practices with ≥85% accuracy",
      description: "Advanced level",
      difficulty: "★★★",
      difficultyLevel: 3,
      tips: ["Master key topics", "Improve speed", "Aim for high accuracy"],
      icon: "⚡"
    },
    {
      id: 4,
      name: "Quick Master",
      requirements: "Complete 150 Quick Practices with ≥90% accuracy and average completion time under 2 minutes/question",
      description: "Expert level, very hard to get",
      difficulty: "★★★★",
      difficultyLevel: 4,
      tips: ["Perfect your timing", "Eliminate careless errors", "Practice daily"],
      icon: "⚡"
    }
  ];

  const mockTestBadges = [
    {
      id: 5,
      name: "Mock Rookie",
      requirements: "Attempt 5 Mock Tests",
      description: "First step badge",
      difficulty: "💬",
      difficultyLevel: 1,
      tips: ["Complete all 5 tests", "No minimum score required", "Get familiar with test format"],
      icon: "📊"
    },
    {
      id: 6,
      name: "Mock Challenger",
      requirements: "Attempt 15 Mock Tests and score ≥70% in at least 10 of them",
      description: "Shows persistence",
      difficulty: "💬",
      difficultyLevel: 2,
      tips: ["Maintain consistent scores", "Don't skip tests", "Aim for 70%+ in most attempts"],
      icon: "📊"
    },
    {
      id: 7,
      name: "Mock Pro",
      requirements: "Attempt 30 Mock Tests and score ≥80% in at least 20",
      description: "Advanced",
      difficulty: "💬",
      difficultyLevel: 3,
      tips: ["Focus on weak areas", "Analyze performance", "Build test endurance"],
      icon: "📊"
    },
    {
      id: 8,
      name: "Mock Master",
      requirements: "Attempt 50 Mock Tests and maintain average ≥90% score",
      description: "Top-tier badge, hard to achieve",
      difficulty: "💬",
      difficultyLevel: 4,
      tips: ["Perfect your strategy", "Minimize errors", "Consistent high performance"],
      icon: "📊"
    }
  ];

  const currentBadges = activeTab === 'quick-practice' ? quickPracticeBadges : mockTestBadges;

  const handleBadgeClick = (badge) => {
    setSelectedBadge(selectedBadge?.id === badge.id ? null : badge);
  };

  const isBadgeUnlocked = (badgeId) => {
    return unlockedBadges.includes(badgeId);
  };

  const unlockBadge = (badgeId) => {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges([...unlockedBadges, badgeId]);
    }
  };

  const lockBadge = (badgeId) => {
    setUnlockedBadges(unlockedBadges.filter(id => id !== badgeId));
  };

  return (
    <div className="badges-guide-container">
      <br /><br /><br />
      <h1>🎯 How to Earn Quiz & Mock Test Badges</h1>
      
      {/* Tab Navigation */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'quick-practice' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('quick-practice');
            setSelectedBadge(null);
          }}
        >
          🚀 Quick Practice Badges
        </button>
        <button 
          className={`tab ${activeTab === 'mock-tests' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('mock-tests');
            setSelectedBadge(null);
          }}
        >
          📝 Mock Test Badges
        </button>
      </div>

      <div className="badges-layout">
        {/* Badges List */}
        <div className="badges-list">
          <h2>{activeTab === 'quick-practice' ? 'Quick Practice Badges' : 'Mock Test Badges'}</h2>
          <div className="badges-grid">
            {currentBadges.map((badge) => (
              <div
                key={badge.id}
                className={`badge-card ${selectedBadge?.id === badge.id ? 'selected' : ''} ${isBadgeUnlocked(badge.id) ? 'unlocked' : 'locked'}`}
                onClick={() => handleBadgeClick(badge)}
              >
                <div className="badge-header">
                  <span className="badge-icon">{badge.icon}</span>
                  <span className="badge-name">{badge.name}</span>
                  <span className="lock-icon">
                    {isBadgeUnlocked(badge.id) ? <FaUnlock /> : <FaLock />}
                  </span>
                </div>
                <div className="badge-status">
                  {isBadgeUnlocked(badge.id) ? 'Unlocked' : 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Details */}
        <div className="badge-details">
          {selectedBadge ? (
            <div className="details-card">
              <div className="details-header">
                <span className="badge-icon-large">{selectedBadge.icon}</span>
                <h3>{selectedBadge.name}</h3>
                <span className={`difficulty difficulty-${selectedBadge.difficultyLevel}`}>
                  {selectedBadge.difficulty}
                </span>
              </div>
              
              <div className="details-content">
                <div className="detail-item">
                  <strong>Requirements:</strong>
                  <p>{selectedBadge.requirements}</p>
                </div>
                
                <div className="detail-item">
                  <strong>Description:</strong>
                  <p>{selectedBadge.description}</p>
                </div>
                
                <div className="detail-item">
                  <strong>Tips to Earn:</strong>
                  <ul>
                    {selectedBadge.tips.map((tip, index) => (
                      <li key={index}>✓ {tip}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="badge-actions">
                  {isBadgeUnlocked(selectedBadge.id) ? (
                    <button 
                      className="lock-btn"
                      onClick={() => lockBadge(selectedBadge.id)}
                    >
                      <FaLock /> Lock Badge
                    </button>
                  ) : (
                    <button 
                      className="unlock-btn"
                      onClick={() => unlockBadge(selectedBadge.id)}
                    >
                      <FaUnlock /> Unlock Badge
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <FaTrophy size={48} color="#ccc" />
              <h3>Select a Badge</h3>
              <p>Click on any badge to view its requirements and details</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Calculator */}
      <div className="progress-calculator">
        <h3>📈 Track Your Progress</h3>
        
        {activeTab === 'quick-practice' ? (
          <div className="quick-practice-inputs">
            <div className="input-group">
              <label>Quick Practices Completed:</label>
              <input type="number" min="0" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Average Accuracy (%):</label>
              <input type="number" min="0" max="100" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Avg Time per Question (min):</label>
              <input type="number" min="0" step="0.1" placeholder="0.0" />
            </div>
          </div>
        ) : (
          <div className="mock-test-inputs">
            <div className="input-group">
              <label>Mock Tests Attempted:</label>
              <input type="number" min="0" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Tests with ≥70% score:</label>
              <input type="number" min="0" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Tests with ≥80% score:</label>
              <input type="number" min="0" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Average Score (%):</label>
              <input type="number" min="0" max="100" placeholder="0" />
            </div>
          </div>
        )}
        
        <button className="calculate-btn">
          Check Which Badges You Can Earn
        </button>
      </div>

      {/* General Tips */}
      <div className="general-tips">
        <h3>💡 General Tips to Earn Badges Faster</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>🚀 For Quick Practice</h4>
            <ul>
              <li>Practice daily in short sessions</li>
              <li>Focus on accuracy first, then speed</li>
              <li>Review incorrect answers</li>
              <li>Use timers to improve speed</li>
            </ul>
          </div>
          <div className="tip-card">
            <h4>📝 For Mock Tests</h4>
            <ul>
              <li>Simulate real test conditions</li>
              <li>Take full-length tests regularly</li>
              <li>Analyze performance reports</li>
              <li>Focus on consistent improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBadgesGuide;