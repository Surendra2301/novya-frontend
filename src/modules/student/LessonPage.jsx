
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CheckCircle,
  FileText,
  MessageCircle,
  X,
  AlertCircle,
  Play,
  Send,
  Bot,
  User,
  Calendar,
  StickyNote,
  Plus,
  Trash2,
  MoreHorizontal,
  Clock,
  Copy,
  Check,
  Coins,
  RefreshCw
} from 'lucide-react';
import './LessonPage.css';

const LessonPage = () => {
  const { class: classNumber, subject, chapterNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingChances, setRemainingChances] = useState(3);
 
  // AI Assistant States
  const [chatMessages, setChatMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  // Sticky Notes States
  const [stickyNotes, setStickyNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [showNotesList, setShowNotesList] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  // Active Tab State
  const [activeTab, setActiveTab] = useState('overview');
  const [showHistory, setShowHistory] = useState(false);
  // Overview States
  const [overviewContent, setOverviewContent] = useState('');
  const [isGeneratingOverview, setIsGeneratingOverview] = useState(false);
  const [overviewLoaded, setOverviewLoaded] = useState(false);
  // Centralized state for the checklist
  const [checklistStatus, setChecklistStatus] = useState({
    videoWatched: false,
    practiceAttempted: false,
    quizPassed: false
  });
  // Video reward states
  const [skipped, setSkipped] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);
 
  // Coin animation states
  const [coins, setCoins] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const chapterTitle = queryParams.get('chapterTitle') || `Chapter ${chapterNumber}`;
  const subtopicName = queryParams.get('subtopic');
  const getChapterKey = () => `quiz_chances_${classNumber}_${subject}_${chapterNumber}`;
  const getChapterDateKey = () => `quiz_date_${classNumber}_${subject}_${chapterNumber}`;
  const getVideoKey = () => `video_reward_${classNumber}_${subject}_${chapterNumber}_${subtopicName || 'main'}`;
  const getNotesKey = () => `sticky_notes_${classNumber}_${subject}_${chapterNumber}`;
  const getHistoryKey = () => `chat_history_${classNumber}_${subject}_${chapterNumber}`;
  // MARK: UPDATED - Study plan functions with current date start and enhanced notification system
  const saveStudyPlanToCalendar = (studyPlanContent) => {
    try {
      // Generate a unique ID for this study plan based on content
      const planId = `plan_${classNumber}_${subject}_${chapterNumber}_${subtopicName || 'main'}_${Date.now()}`;
     
      // Use current date (when user requests the study plan) as start date
      const startDate = new Date();
     
      // Parse the study plan and create calendar events starting from current date
      const studyPlan = {
        id: planId,
        title: `${subject} - ${chapterTitle}${subtopicName ? ` - ${subtopicName}` : ''}`,
        content: studyPlanContent,
        subject: subject,
        chapter: chapterTitle,
        subtopic: subtopicName,
        class: classNumber,
        createdDate: startDate.toISOString(),
        // Create study sessions starting from the current date (when user requested)
        studySessions: generateStudySessionsFromPlan(studyPlanContent, startDate),
        completed: false
      };
      // Save to localStorage
      const existingPlans = JSON.parse(localStorage.getItem('studyPlans') || '[]');
     
      // Check for duplicates before adding
      const isDuplicate = existingPlans.some(plan =>
        plan.title === studyPlan.title &&
        plan.subject === studyPlan.subject &&
        plan.chapter === studyPlan.chapter
      );
      if (isDuplicate) {
        console.log('Study plan already exists, skipping duplicate');
        return true;
      }
      const updatedPlans = [...existingPlans, studyPlan];
      localStorage.setItem('studyPlans', JSON.stringify(updatedPlans));
      // Create notification with enhanced event dispatch
      createStudyPlanNotification(studyPlan);
      // Dispatch events to update navbar and other components
      window.dispatchEvent(new CustomEvent('studyPlanAdded', {
        detail: { studyPlan }
      }));
     
      // Force refresh notifications in navbar
      window.dispatchEvent(new CustomEvent('refreshNotifications'));
      console.log('Study plan saved with start date:', startDate.toLocaleDateString(), studyPlan);
      return true;
    } catch (error) {
      console.error('Error saving study plan:', error);
      return false;
    }
  };
  // MARK: UPDATED - Generate study sessions starting from the provided start date (current date)
  // const generateStudySessionsFromPlan = (content, startDate) => {
  // const sessions = [];
   
  // // Use the provided start date (when user requested the study plan)
  // const studyStartDate = new Date(startDate);
   
  // // Simple parsing - you can enhance this based on your AI response format
  // const lines = content.split('\n');
  // let dayOffset = 0;
   
  // for (const line of lines) {
  // if (line.includes('Day') || line.includes('day') || line.includes('Session') || line.includes('session')) {
  // const sessionDate = new Date(studyStartDate);
  // sessionDate.setDate(studyStartDate.getDate() + dayOffset);
       
  // const session = {
  // id: Date.now() + sessions.length,
  // date: sessionDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
  // title: line.trim(),
  // duration: '60 minutes', // Default duration
  // completed: false,
  // topic: line.trim()
  // };
  // sessions.push(session);
  // dayOffset++;
  // }
  // }
  // // If no specific sessions found, create a default one starting from current date
  // if (sessions.length === 0) {
  // sessions.push({
  // id: Date.now(),
  // date: studyStartDate.toISOString().split('T')[0],
  // title: `Study ${chapterTitle}`,
  // duration: '60 minutes',
  // completed: false,
  // topic: `Review ${chapterTitle} concepts`
  // });
  // }
  // console.log('Generated study sessions starting from:', studyStartDate.toLocaleDateString(), sessions);
  // return sessions;
  // };
  // MARK: UPDATED - Generate study sessions starting from the provided start date (current date)
const generateStudySessionsFromPlan = (content, startDate) => {
  const sessions = [];
 
  // Use the provided start date (when user requested the study plan)
  const studyStartDate = new Date(startDate);
 
  // Simple parsing - you can enhance this based on your AI response format
  const lines = content.split('\n');
  let dayOffset = 0; // Start from day 0 (today)
 
  for (const line of lines) {
    if (line.includes('Day') || line.includes('day') || line.includes('Session') || line.includes('session')) {
      const sessionDate = new Date(studyStartDate);
      sessionDate.setDate(studyStartDate.getDate() + dayOffset);
     
      const session = {
        id: Date.now() + sessions.length,
        date: sessionDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        title: line.trim(),
        duration: '60 minutes', // Default duration
        completed: false,
        topic: line.trim()
      };
      sessions.push(session);
      dayOffset++; // Increment for next session
    }
  }
  // If no specific sessions found, create a default one starting from current date
  if (sessions.length === 0) {
    sessions.push({
      id: Date.now(),
      date: studyStartDate.toISOString().split('T')[0],
      title: `Study ${chapterTitle}`,
      duration: '60 minutes',
      completed: false,
      topic: `Review ${chapterTitle} concepts`
    });
  }
  console.log('Generated study sessions starting from:', studyStartDate.toLocaleDateString(), sessions);
  return sessions;
};
  // MARK: UPDATED - Enhanced notification creation with immediate dispatch
  const createStudyPlanNotification = (studyPlan) => {
    const notificationId = `notif_${studyPlan.id}`;
   
    // Check if notification already exists
    const existingNotifications = JSON.parse(localStorage.getItem('studyNotifications') || '[]');
    const isDuplicateNotification = existingNotifications.some(notif => notif.id === notificationId);
   
    if (isDuplicateNotification) {
      console.log('Notification already exists, skipping duplicate');
      return;
    }
    const notification = {
      id: notificationId,
      type: 'study_plan_created',
      title: 'New Study Plan Created',
      message: `Study plan for ${studyPlan.title} has been added to your calendar starting from ${new Date(studyPlan.createdDate).toLocaleDateString()}`,
      date: new Date().toISOString(),
      read: false,
      planId: studyPlan.id
    };
    const updatedNotifications = [notification, ...existingNotifications];
    localStorage.setItem('studyNotifications', JSON.stringify(updatedNotifications));
    // Enhanced event dispatch for immediate navbar update
    window.dispatchEvent(new CustomEvent('notificationAdded', {
      detail: { notification }
    }));
   
    // Additional event to force refresh
    window.dispatchEvent(new CustomEvent('refreshNotifications'));
   
    console.log('Notification created and events dispatched:', notification);
  };
  // MARK: UPDATED - Enhanced AI message handler to detect study plans
  const handleAIMessageResponse = (content, messageType) => {
    // Check if this is a study plan response
    if (messageType === 'study_plan' || content.toLowerCase().includes('study plan') ||
        content.toLowerCase().includes('day') && content.toLowerCase().includes('study')) {
     
      // Save the study plan to calendar
      const saved = saveStudyPlanToCalendar(content);
      if (saved) {
        // Add a note that it was saved to calendar
        const startDate = new Date().toLocaleDateString();
        // return `${content}\n\n---\n*📅 This study plan has been automatically added to your calendar starting from ${startDate}!*`;
      }
    }
    return content;
  };
  // Show toast message using React Toastify
  const showRewardToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  useEffect(() => {
    const today = new Date().toDateString();
    const chapterKey = getChapterKey();
    const chapterDateKey = getChapterDateKey();
    const videoKey = getVideoKey();
   
    const storedDate = sessionStorage.getItem(chapterDateKey);
    const storedChances = sessionStorage.getItem(chapterKey);
   
    if (storedDate === today) {
      setRemainingChances(parseInt(storedChances) || 3);
    } else {
      setRemainingChances(3);
      sessionStorage.setItem(chapterKey, '3');
      sessionStorage.setItem(chapterDateKey, today);
    }
    // Check for video reward - now specific to subtopic
    if (sessionStorage.getItem(videoKey)) {
      setIsVideoCompleted(true);
      setChecklistStatus(prev => ({ ...prev, videoWatched: true }));
      setPointsAwarded(true);
    }
    const savedNotes = sessionStorage.getItem(getNotesKey());
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setStickyNotes(parsed.length > 0 ? parsed : [{ id: Date.now(), content: '', color: '#fef3c7', timestamp: new Date().toLocaleString() }]);
      if (parsed.length > 0) {
        setActiveNoteId(parsed[0].id);
      }
    } else {
      const initialNote = { id: Date.now(), content: '', color: '#fef3c7', timestamp: new Date().toLocaleString() };
      setStickyNotes([initialNote]);
      setActiveNoteId(initialNote.id);
    }
    // Load chat history
    const savedHistory = sessionStorage.getItem(getHistoryKey());
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, [classNumber, subject, chapterNumber, subtopicName]);
  // Monitor seeking on video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleSeeked = () => setSkipped(true);
      video.addEventListener('seeked', handleSeeked);
      return () => video.removeEventListener('seeked', handleSeeked);
    }
  }, []);
  useEffect(() => {
    if (isVideoCompleted) {
      setChecklistStatus(prev => ({ ...prev, videoWatched: true }));
    }
  }, [isVideoCompleted]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isLoading]);
  // Overview generation effect
  useEffect(() => {
    if (activeTab === 'overview' && !overviewLoaded && !isGeneratingOverview) {
      generateOverview();
    }
  }, [activeTab, overviewLoaded]);
  // Coin animation effect
  useEffect(() => {
    const handleCoinAnimationEnd = (coinId) => {
      setCoins(prev => prev.filter(coin => coin.id !== coinId));
    };
    coins.forEach(coin => {
      if (coin.animationCompleted && !coin.pointsAdded) {
        // Add points to localStorage
        const currentPoints = parseInt(localStorage.getItem('rewardPoints') || '0');
        const newPoints = currentPoints + coin.value;
        localStorage.setItem('rewardPoints', newPoints.toString());
       
        // Dispatch event to update navbar
        window.dispatchEvent(new CustomEvent('rewardPointsUpdated', {
          detail: { rewardPoints: newPoints }
        }));
       
        // Mark coin as processed
        setCoins(prev => prev.map(c =>
          c.id === coin.id ? { ...c, pointsAdded: true } : c
        ));
       
        // Show toast message only once when all coins are processed
        const remainingCoins = coins.filter(c => !c.pointsAdded).length;
        if (remainingCoins === 1 && !toastShown) {
          setToastShown(true);
          if (subtopicName) {
            showRewardToast(`🎉 Congratulations! You earned 10 reward points for completing the subtopic: ${subtopicName}`);
          } else {
            showRewardToast(`🎉 Congratulations! You earned 10 reward points for completing the chapter: ${chapterTitle}`);
          }
        }
       
        // Remove coin after a delay
        setTimeout(() => {
          handleCoinAnimationEnd(coin.id);
        }, 300);
      }
    });
  }, [coins]);
  const currentLesson = {
    title: chapterTitle,
    subtopic: subtopicName,
    file: `/videos/class7/maths/MicrosoftTeams-video.mp4`,
    pdf: `/pdfs/${subject}/chapter-${chapterNumber}.pdf`,
    about: `Learn about ${subject} concepts in ${chapterTitle}${subtopicName ? ` - ${subtopicName}` : ''}. This ${subtopicName ? 'subtopic' : 'chapter'} covers important topics that will help you build a strong foundation.`
  };
  const checklistItems = [
    { id: 1, task: `Watch full video of ${currentLesson.title}${subtopicName ? ` - ${subtopicName}` : ''}`, status: checklistStatus.videoWatched ? "completed" : "in-progress" },
    { id: 2, task: "Attempt practice quiz", status: checklistStatus.practiceAttempted ? "completed" : "pending" },
  ];
  const practiceQuestions = [
    { id: 1, question: `Practice questions for ${currentLesson.title}${subtopicName ? ` - ${subtopicName}` : ''}` },
  ];
  const createCoinAnimation = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const videoRect = videoElement.getBoundingClientRect();
   
    // Create multiple coins for better visual effect
    const newCoins = Array.from({ length: 5 }, (_, index) => ({
      id: Date.now() + index,
      startX: videoRect.left + videoRect.width / 2,
      startY: videoRect.top + videoRect.height / 2,
      endX: window.innerWidth - 100,
      endY: 50,
      value: 2,
      delay: index * 100,
      animationCompleted: false,
      pointsAdded: false
    }));
    setCoins(prev => [...prev, ...newCoins]);
    setToastShown(false);
  };
  const handleVideoEnd = () => {
    setIsVideoCompleted(true);
    const videoKey = getVideoKey();
   
    if (!sessionStorage.getItem(videoKey) && !skipped && !pointsAwarded) {
      sessionStorage.setItem(videoKey, 'true');
      setPointsAwarded(true);
      createCoinAnimation();
    }
  };
  const handleStartQuiz = () => {
    if (remainingChances > 0) {
      setShowQuiz(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setQuizScore(0);
      setQuizCompleted(false);
    }
  };
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };
  const handleNextQuestion = () => {
    if (selectedAnswer === 0) {
      setQuizScore(prevScore => prevScore + 1);
    }
    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      const newChances = remainingChances - 1;
      setRemainingChances(newChances);
     
      const chapterKey = getChapterKey();
      sessionStorage.setItem(chapterKey, newChances.toString());
     
      const isPassed = quizScore >= 2;
      setChecklistStatus(prev => ({
        ...prev,
        practiceAttempted: true,
        quizPassed: isPassed
      }));
    }
  };
  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };
  const handleRetryQuiz = () => {
    if (remainingChances > 0) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setQuizScore(0);
      setQuizCompleted(false);
    }
  };
  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput.trim(),
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setShowQuickActions(false);
    try {
      const response = await fetch('http://localhost:8000/ai-assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          class_level: `Class ${classNumber}`,
          subject: subject,
          chapter: currentLesson.title,
          student_question: userInput,
          chat_history: chatMessages
        }),
      });
      const data = await response.json();
      if (data.success) {
        const processedContent = handleAIMessageResponse(data.response, data.type);
       
        const aiMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: processedContent,
          messageType: data.type,
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => {
          const newMessages = [...prev, aiMessage];
          const historyEntry = {
            id: Date.now(),
            userMessage: userMessage.content,
            aiResponse: aiMessage.content,
            timestamp: new Date().toLocaleString()
          };
          const updatedHistory = [historyEntry, ...chatHistory];
          setChatHistory(updatedHistory);
          sessionStorage.setItem(getHistoryKey(), JSON.stringify(updatedHistory));
          return newMessages;
        });
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        messageType: 'error',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleQuickAction = async (actionType) => {
    const topicText = subtopicName ? ` - ${subtopicName}` : '';
    const messages = {
      study_plan: `Can you create a study plan with topics for ${currentLesson.title}${topicText} in ${subject}?`,
      notes: `Please provide comprehensive notes on ${currentLesson.title}${topicText} in ${subject}`,
    };
    const message = messages[actionType];
    setUserInput(message);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };
  const clearChat = () => {
    setChatMessages([]);
    setShowQuickActions(true);
  };
  const copyToClipboard = async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      content: '',
      color: getRandomColor(),
      timestamp: new Date().toLocaleString()
    };
    setStickyNotes(prev => [...prev, newNote]);
    setActiveNoteId(newNote.id);
    setShowNotesList(false);
  };
  const deleteNote = (id) => {
    if (stickyNotes.length === 1) {
      const newNote = { id: Date.now(), content: '', color: '#fef3c7', timestamp: new Date().toLocaleString() };
      setStickyNotes([newNote]);
      setActiveNoteId(newNote.id);
      sessionStorage.setItem(getNotesKey(), JSON.stringify([newNote]));
    } else {
      const updatedNotes = stickyNotes.filter(note => note.id !== id);
      setStickyNotes(updatedNotes);
      if (activeNoteId === id) {
        setActiveNoteId(updatedNotes[0].id);
      }
      sessionStorage.setItem(getNotesKey(), JSON.stringify(updatedNotes));
    }
  };
  const updateNoteContent = (id, content) => {
    setStickyNotes(prev => prev.map(note =>
      note.id === id ? { ...note, content, timestamp: new Date().toLocaleString() } : note
    ));
  };
  const saveNote = () => {
    sessionStorage.setItem(getNotesKey(), JSON.stringify(stickyNotes));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };
  const selectNote = (id) => {
    setActiveNoteId(id);
    setShowNotesList(false);
  };
  const getRandomColor = () => {
    const colors = ['#fef3c7', '#fecaca', '#ddd6fe', '#bfdbfe', '#a7f3d0', '#fecdd3', '#fed7aa'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const formatResponse = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h4 key={index} className="ai-response-heading">{line.replace('# ', '')}</h4>;
      } else if (line.startsWith('## ')) {
        return <h5 key={index} className="ai-response-subheading">{line.replace('## ', '')}</h5>;
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        return <div key={index} className="ai-response-list-item">• {line.replace(/^[-•]\s*/, '')}</div>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <div key={index} className="ai-response-text">{line}</div>;
      }
    });
  };
  const generateOverview = async () => {
    setIsGeneratingOverview(true);
    try {
      const response = await fetch('http://localhost:8000/ai-assistant/generate-overview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          class_level: `Class ${classNumber}`,
          subject: subject,
          chapter: currentLesson.title,
          specific_topic: currentLesson.subtopic || null
        }),
      });
      const data = await response.json();
     
      if (data.success) {
        setOverviewContent(data.overview);
        setOverviewLoaded(true);
      } else {
        setOverviewContent(`
📖 ${currentLesson.title.toUpperCase()}${currentLesson.subtopic ? ` - ${currentLesson.subtopic.toUpperCase()}` : ''} - TOPIC OVERVIEW
══════════════════════════════════════════
🎯 QUICK SUMMARY:
• Main Focus: ${currentLesson.title}${currentLesson.subtopic ? ` focusing on ${currentLesson.subtopic}` : ''}
• Key Learning: Understanding core concepts and applications
• Real-world Connection: Practical applications in daily life
🔍 WHAT YOU'LL LEARN:
────────────────────
📚 Core Concepts:
• Fundamental principles and theories
• Key definitions and terminology
• Important relationships and patterns
🛠️ Important Skills:
• Problem-solving techniques
• Analytical thinking
• Application of concepts
💡 KEY TAKEAWAYS:
• Solid understanding of the topic
• Ability to apply knowledge
• Foundation for future learning
🌟 WHY THIS MATTERS:
• Builds essential knowledge for academic success
• Develops critical thinking skills
• Prepares for advanced topics
📝 STUDY TIPS:
• Review concepts regularly
• Practice with examples
• Ask questions when unsure
        `);
        setOverviewLoaded(true);
      }
    } catch (error) {
      console.error('Error generating overview:', error);
      setOverviewContent(`
📖 ${currentLesson.title.toUpperCase()} - OVERVIEW
══════════════════════════
This chapter covers important concepts in ${subject} that will help you build a strong foundation.
Key areas include:
• Understanding basic principles
• Learning practical applications
• Developing problem-solving skills
Study this chapter carefully to master the concepts!
      `);
      setOverviewLoaded(true);
    } finally {
      setIsGeneratingOverview(false);
    }
  };
  const formatOverview = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('📖') || line.startsWith('🎯') || line.startsWith('🔍') ||
          line.startsWith('📚') || line.startsWith('🛠️') || line.startsWith('💡') ||
          line.startsWith('🌟') || line.startsWith('📝')) {
        return <h4 key={index} className="overview-section-heading" style={{
          color: '#0f766e',
          margin: '16px 0 8px 0',
          fontSize: '16px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>{line}</h4>;
      } else if (line.includes('════')) {
        return <hr key={index} style={{ border: 'none', borderTop: '2px solid #0f766e', margin: '12px 0' }} />;
      } else if (line.startsWith('•')) {
        return <div key={index} className="overview-list-item" style={{
          margin: '6px 0',
          paddingLeft: '20px',
          fontSize: '14px',
          color: '#4b5563',
          lineHeight: '1.5',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px'
        }}>
          <span style={{ color: '#0f766e', flexShrink: 0 }}>•</span>
          <span>{line.replace('•', '').trim()}</span>
        </div>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <div key={index} className="overview-text" style={{
          fontSize: '14px',
          color: '#4b5563',
          lineHeight: '1.5',
          margin: '8px 0'
        }}>{line}</div>;
      }
    });
  };
  const demoQuestions = [
    {
      question: `What is the main topic covered in ${currentLesson.title}${subtopicName ? ` - ${subtopicName}` : ''}?`,
      options: ["Basic Concepts", "Advanced Applications", "Historical Context", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "Which of the following best describes the learning objectives?",
      options: ["Memorization", "Conceptual Understanding", "Practical Application", "Both B and C"],
      correctAnswer: 3
    },
    {
      question: "What should you focus on while studying this chapter?",
      options: ["Key Definitions", "Problem Solving", "Real-world Applications", "All of the above"],
      correctAnswer: 3
    }
  ];
  const activeNote = stickyNotes.find(note => note.id === activeNoteId);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
     
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="coin"
          style={{
            '--end-x': `${coin.endX - coin.startX}px`,
            '--end-y': `${coin.endY - coin.startY}px`,
            left: `${coin.startX}px`,
            top: `${coin.startY}px`,
            animationDelay: `${coin.delay}ms`
          }}
          onAnimationEnd={() => {
            setCoins(prev => prev.map(c =>
              c.id === coin.id ? { ...c, animationCompleted: true } : c
            ));
          }}
        >
          <div className="coin-inner">
            <Coins size={10} color="#744210" />
          </div>
        </div>
      ))}
     
      <div className="lesson-page-container">
        <div className="header-section">
          <h1 className="header-title">
            {subject} • {currentLesson.title}
          </h1>
          {currentLesson.subtopic && (
            <div className="subtopic-label">
              Topic: {currentLesson.subtopic}
            </div>
          )}
        </div>
        <div className="main-content">
          <div className="video-section">
            <h2 className="video-title">
              <Play size={18} />
              {currentLesson.subtopic ? `Video: ${currentLesson.subtopic}` : `Video: ${currentLesson.title}`}
              {pointsAwarded && (
                <span className="reward-badge">
                  <Coins size={12} />
                  Rewarded
                </span>
              )}
            </h2>
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src={currentLesson.file}
                controls
                controlsList="nodownload"
                className="video-player"
                onEnded={handleVideoEnd}
              />
            </div>
            {!pointsAwarded && (
              <div className="reward-hint">
                <Coins size={14} />
                Complete this video to earn 10 reward points!
              </div>
            )}
          </div>
          <div className="tab-navigation">
            {[
              { id: 'overview', label: 'Overview', icon: null },
              { id: 'checklist', label: 'Lesson Checklist', icon: FileText },
              { id: 'practice', label: 'Quick Practice', icon: Play },
              { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
              { id: 'notes', label: `Notes (${stickyNotes.length})`, icon: StickyNote }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.icon && <tab.icon size={16} />}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-header">
                  <h3 className="overview-title">
                    📘 {currentLesson.subtopic ? 'Topic Overview' : 'Chapter Overview'}
                  </h3>
                  <button
                    onClick={generateOverview}
                    disabled={isGeneratingOverview}
                    className={`refresh-button ${isGeneratingOverview ? 'loading' : ''}`}
                  >
                    {isGeneratingOverview ? (
                      <>
                        <div className="spinner"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={14} />
                        Refresh Overview
                      </>
                    )}
                  </button>
                </div>
                {isGeneratingOverview && !overviewContent ? (
                  <div className="loading-section">
                    <div className="spinner-large"></div>
                    <p className="loading-text">Generating comprehensive overview...</p>
                  </div>
                ) : overviewContent ? (
                  <div className="overview-content">
                    {formatOverview(overviewContent)}
                  </div>
                ) : (
                  <div className="empty-overview">
                    <FileText size={40} className="empty-icon" />
                    <p className="empty-title">
                      Overview not generated yet
                    </p>
                    <p className="empty-description">
                      Click "Refresh Overview" to generate a comprehensive overview of this {currentLesson.subtopic ? 'topic' : 'chapter'}.
                    </p>
                  </div>
                )}
                {!pointsAwarded && (
                  <div className="video-reward-banner">
                    <Coins size={20} />
                    <div>
                      <div className="banner-title">Complete the video to earn 10 reward points!</div>
                      <div className="banner-description">Watch the entire video without skipping to earn your reward.</div>
                    </div>
                  </div>
                )}
                {pointsAwarded && (
                  <div className="reward-banner">
                    <Coins size={20} />
                    <div>
                      <div className="banner-title">🎉 Reward Earned!</div>
                      <div className="banner-description">You've earned 10 reward points for completing this {currentLesson.subtopic ? 'topic' : 'chapter'}!</div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'checklist' && (
              <div className="checklist-tab">
                <h3 className="checklist-title">
                  <FileText size={18}/>
                  Lesson Checklist
                </h3>
                {checklistItems.map((item) => (
                  <div key={item.id} className="checklist-item">
                    <span className="checklist-task">{item.task}</span>
                    <span className={`checklist-status ${item.status}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
                {pointsAwarded && (
                  <div className="reward-banner-small">
                    <Coins size={16} />
                    🎉 You earned 10 reward points for completing this {subtopicName ? 'subtopic' : 'chapter'}!
                  </div>
                )}
              </div>
            )}
            {activeTab === 'practice' && (
              <div className="practice-tab">
                <h3 className="practice-title">Quick Practice</h3>
                <div className="chances-warning">
                  <AlertCircle size={16} color="#f59e0b" />
                  <span className="warning-text">
                    {remainingChances} {remainingChances === 1 ? 'chance' : 'chances'} remaining for this chapter
                  </span>
                </div>
                {practiceQuestions.map((q) => (
                  <div key={q.id} className="practice-question">
                    <span className="question-text">{q.question}</span>
                    <button
                      onClick={handleStartQuiz}
                      disabled={remainingChances <= 0}
                      className={`start-quiz-button ${remainingChances <= 0 ? 'disabled' : ''}`}
                    >
                      <Play size={14} />
                      {remainingChances > 0 ? "Start Quiz" : "No chances"}
                    </button>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'ai-assistant' && (
              <div className="ai-assistant-container">
                {showHistory && (
                  <div className="history-modal">
                    <div className="history-header">
                      <span>Search History ({chatHistory.length})</span>
                      <button
                        onClick={() => setShowHistory(false)}
                        className="close-button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="history-content">
                      {chatHistory.length === 0 ? (
                        <div className="empty-history">
                          No search history yet
                        </div>
                      ) : (
                        chatHistory.map((item) => (
                          <div key={item.id} className="history-item">
                            <div className="history-question">Q: {item.userMessage}</div>
                            <div className="history-answer">A: {item.aiResponse.substring(0, 100)}...</div>
                            <div className="history-timestamp">{item.timestamp}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                <div
                  ref={chatContainerRef}
                  className="chat-container"
                >
                  {chatMessages.length === 0 ? (
                    <div className="empty-chat">
                      <Bot size={40} className="empty-chat-icon" />
                      <p className="empty-chat-title">
                        Hello! I'm your AI Learning Assistant
                      </p>
                      <p className="empty-chat-description">
                        Ask me anything about this lesson, request study plans and notes.
                      </p>
                      <button
                        onClick={() => setShowHistory(true)}
                        className="history-button"
                      >
                        View History ({chatHistory.length})
                      </button>
                    </div>
                  ) : (
                    <>
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`message-wrapper ${message.type}`}
                        >
                          <div className={`message-avatar ${message.type}`}>
                            {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </div>
                          <div className={`message-bubble ${message.type}`}>
                            <div className="message-content">
                              {message.type === 'assistant' ? formatResponse(message.content) : message.content}
                            </div>
                            <div className="message-footer">
                              <span className="message-timestamp">{message.timestamp}</span>
                              {message.type === 'assistant' && (
                                <button
                                  onClick={() => copyToClipboard(message.content, message.id)}
                                  className={`copy-button ${copiedMessageId === message.id ? 'copied' : ''}`}
                                >
                                  {copiedMessageId === message.id ? (
                                    <>
                                      <Check size={12} />
                                      Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      Copy
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                 
                  {isLoading && (
                    <div className="message-wrapper assistant">
                      <div className="message-avatar assistant">
                        <Bot size={16} />
                      </div>
                      <div className="message-bubble assistant loading-message">
                        <div className="typing-dots">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                        <span className="loading-text">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
                {showQuickActions && chatMessages.length === 0 && (
                  <div className="quick-actions">
                    <div className="quick-actions-label">Try asking:</div>
                    <div className="quick-actions-grid">
                      <button
                        onClick={() => handleQuickAction('study_plan')}
                        className="quick-action-button"
                      >
                        <Calendar size={14} />
                        Study Plan
                      </button>
                      <button
                        onClick={() => handleQuickAction('notes')}
                        className="quick-action-button"
                      >
                        <FileText size={14} />
                        Get Notes
                      </button>
                    </div>
                  </div>
                )}
                {chatMessages.length > 0 && (
                  <div className="chat-controls">
                    <button
                      onClick={() => setShowHistory(true)}
                      className="control-button"
                    >
                      View History ({chatHistory.length})
                    </button>
                    <button
                      onClick={clearChat}
                      className="control-button"
                    >
                      Clear Chat
                    </button>
                  </div>
                )}
                <div className="input-container">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask about study plans, notes..."
                    className="input-textarea"
                    rows={1}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !userInput.trim()}
                    className={`send-button ${userInput.trim() && !isLoading ? 'enabled' : 'disabled'}`}
                  >
                    <Send size={16} />
                    Send
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'notes' && (
              <div className="notes-container" style={{ backgroundColor: activeNote?.color || '#fef3c7' }}>
                {savedMessage && (
                  <div className="save-toast">
                    ✓ Note saved successfully!
                  </div>
                )}
                {showNotesList && (
                  <div className="notes-list-modal">
                    <div className="notes-list-header">
                      <span>All Notes ({stickyNotes.length})</span>
                      <button
                        onClick={() => setShowNotesList(false)}
                        className="close-button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {stickyNotes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => selectNote(note.id)}
                        className={`notes-list-item ${note.id === activeNoteId ? 'active' : ''}`}
                      >
                        <div className="notes-preview">
                          {note.content.substring(0, 50) || 'Empty note'}
                          {note.content.length > 50 && '...'}
                        </div>
                        <div className="notes-timestamp">
                          <Clock size={10} />
                          {note.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="notes-header">
                  <button
                    onClick={addNewNote}
                    className="add-note-button"
                    title="Add new note"
                  >
                    <Plus size={18} color="#1f2937" />
                  </button>
                  <div className="notes-controls">
                    <button
                      onClick={() => setShowNotesList(!showNotesList)}
                      className="notes-control-button"
                      title="View all notes"
                    >
                      <MoreHorizontal size={18} color="#1f2937" />
                    </button>
                    <button
                      onClick={() => activeNote && deleteNote(activeNote.id)}
                      className="delete-note-button"
                      title="Delete note"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="notes-editor">
                  <textarea
                    ref={textareaRef}
                    value={activeNote?.content || ''}
                    onChange={(e) => activeNote && updateNoteContent(activeNote.id, e.target.value)}
                    placeholder="Take a note..."
                    className="notes-textarea"
                  />
                </div>
                <div className="notes-footer">
                  <button
                    onClick={saveNote}
                    className="save-notes-button"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showQuiz && (
          <div className="quiz-modal-overlay">
            <div className="quiz-modal">
              <button
                onClick={handleCloseQuiz}
                className="close-quiz-button"
              >
                <X size={20} color="#6b7280" />
              </button>
              {!quizCompleted ? (
                <>
                  <h2 className="quiz-title">
                    Question {currentQuestionIndex + 1} of {demoQuestions.length}
                  </h2>
                  <p className="quiz-question">
                    {demoQuestions[currentQuestionIndex]?.question}
                  </p>
                  <div className="quiz-options">
                    {demoQuestions[currentQuestionIndex]?.options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`option ${selectedAnswer === index ? 'selected' : ''}`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`next-button ${selectedAnswer !== null ? 'enabled' : 'disabled'}`}
                  >
                    {currentQuestionIndex === demoQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="quiz-title">Quiz Completed!</h2>
                  <div className="quiz-result">
                    <p className="score">Your score: {quizScore} out of {demoQuestions.length}</p>
                    <p className={`result-message ${quizScore >= Math.ceil(demoQuestions.length * 0.8) ? 'passed' : 'failed'}`}>
                      {quizScore >= Math.ceil(demoQuestions.length * 0.8)
                        ? 'Congratulations! You passed the quiz.'
                        : 'Keep studying and try again.'}
                    </p>
                  </div>
                  <div className="quiz-actions">
                    <button
                      onClick={handleCloseQuiz}
                      className="close-quiz-action"
                    >
                      Close
                    </button>
                    {remainingChances > 0 && quizScore < Math.ceil(demoQuestions.length * 0.8) && (
                      <button
                        onClick={handleRetryQuiz}
                        className="retry-quiz-action"
                      >
                        Try Again ({remainingChances} left)
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default LessonPage;

