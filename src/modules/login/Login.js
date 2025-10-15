////old code
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Toast, ToastContainer, Modal, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { motion } from 'framer-motion';
// import { FaUserGraduate, FaUserTie, FaBookOpen, FaChalkboardTeacher, FaEye, FaEyeSlash, FaChild } from 'react-icons/fa';
// import { RiLockPasswordFill } from 'react-icons/ri';
// import { IoMdSchool } from 'react-icons/io';
 
// // ✅ Full Updated LoginPage with Forgot Password and Child Email for Parents
// const LoginPage = () => {
//   const [activeTab, setActiveTab] = useState('student');
//   const [formData, setFormData] = useState({
//     student: { username: '', password: '' },
//     parent: { username: '', password: '', childEmail: '' }
//   });
//   const [errors, setErrors] = useState({
//     student: { username: '', password: '' },
//     parent: { username: '', password: '', childEmail: '' }
//   });
//   const [showToast, setShowToast] = useState(false);
//   const [toastMsg, setToastMsg] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showPassword, setShowPassword] = useState({
//     student: false,
//     parent: false,
//   });
//   const [showForgotModal, setShowForgotModal] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [forgotError, setForgotError] = useState('');
 
//   const navigate = useNavigate();
 
//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [activeTab]: {
//         ...prev[activeTab],
//         [name]: value,
//       },
//     }));
//     if (errors[activeTab][name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [activeTab]: {
//           ...prev[activeTab],
//           [name]: '',
//         },
//       }));
//     }
//   };
 
//   // ✅ Validate login form
//   const validateForm = () => {
//     let valid = true;
//     const current = formData[activeTab];
//     const newErrors = { username: '', password: '', childEmail: '' };
 
//     if (!current.username.trim()) {
//       newErrors.username = 'Username is required';
//       valid = false;
//     } else if (current.username.length < 4) {
//       newErrors.username = 'Username must be at least 4 characters';
//       valid = false;
//     }
 
//     if (!current.password) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (current.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }
 
//     // Additional validation for parent: child email
//     if (activeTab === 'parent' && !current.childEmail.trim()) {
//       newErrors.childEmail = 'Child email is required';
//       valid = false;
//     } else if (activeTab === 'parent' && current.childEmail && !/\S+@\S+\.\S+/.test(current.childEmail)) {
//       newErrors.childEmail = 'Please enter a valid email address';
//       valid = false;
//     }
 
//     setErrors((prev) => ({
//       ...prev,
//       [activeTab]: newErrors,
//     }));
 
//     return valid;
//   };
 
//   // ✅ Toggle Password Visibility (separate for Student & Parent)
//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => ({
//       ...prev,
//       [activeTab]: !prev[activeTab],
//     }));
//   };
 
//   // ✅ Handle login submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const current = formData[activeTab];
//       setIsLoading(true);
 
//       await new Promise(resolve => setTimeout(resolve, 1000));
 
//       if (
//         (activeTab === 'student' && current.username === 'student123' && current.password === 'studentpass') ||
//         (activeTab === 'parent' && current.username === 'parent456' && current.password === 'parentpass')
//       ) {
//         localStorage.setItem('userRole', activeTab);
//         localStorage.setItem('userToken', 'dummy-token');
       
//         // Store child email for parent login
//         if (activeTab === 'parent' && current.childEmail) {
//           localStorage.setItem('childEmail', current.childEmail);
//         }
       
//         setToastMsg(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} login successful!`);
//         setShowToast(true);
//         setIsLoading(false);
 
//         setTimeout(() => {
//           navigate(activeTab === 'student' ? '/student/dashboard' : '/parent/dashboard');
//         }, 2000);
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           [activeTab]: {
//             ...prev[activeTab],
//             username: '',
//             password: 'Invalid username or password'
//           },
//         }));
//         setIsLoading(false);
//       }
//     }
//   };
 
//   // Handle register navigation
//   const handleRegisterClick = () => {
//     navigate('/signup');
//   };
 
//   // ✅ Forgot Password - Submit
//   const handleForgotPassword = () => {
//     if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
//       setForgotError('Please enter a valid email address');
//       return;
//     }
//     setForgotError('');
//     setShowForgotModal(false);
//     setToastMsg(`Password reset link sent to ${forgotEmail}`);
//     setShowToast(true);
//     setForgotEmail('');
//   };
 
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//   };
 
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
//   };
 
//   return (
//     <div className="min-vh-100 d-flex align-items-center" style={{
//       background: 'linear-gradient(to right, #2D5D7B, #A62D69)',
//       overflow: 'hidden',
//       position: 'relative'
//     }}>
//       {/* Floating Icons */}
//       <motion.div initial={{ x: -100, y: -100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1, type: 'spring' }}
//         style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}>
//         <FaBookOpen />
//       </motion.div>
//       <motion.div initial={{ x: 100, y: -100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1, type: 'spring', delay: 0.2 }}
//         style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '4rem', color: 'rgba(255,255,255,0.2)' }}>
//         <IoMdSchool />
//       </motion.div>
//       <motion.div initial={{ x: -100, y: 100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1, type: 'spring', delay: 0.4 }}
//         style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '3.5rem', color: 'rgba(255,255,255,0.2)' }}>
//         <FaChalkboardTeacher />
//       </motion.div>
 
//       {/* Toast */}
//       <ToastContainer position="top-end" className="p-3">
//         <Toast onClose={() => setShowToast(false)} show={showToast} delay={2500} autohide bg="success">
//           <Toast.Header closeButton>
//             <strong className="me-auto">Notification</strong>
//           </Toast.Header>
//           <Toast.Body className="text-white">{toastMsg}</Toast.Body>
//         </Toast>
//       </ToastContainer>
 
//       {/* Forgot Password Modal */}
//       <Modal show={showForgotModal} onHide={() => setShowForgotModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Forgot Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Enter your email</Form.Label>
//             <Form.Control
//               type="email"
//               value={forgotEmail}
//               onChange={(e) => setForgotEmail(e.target.value)}
//               placeholder="you@example.com"
//             />
//             {forgotError && <div className="text-danger mt-1">{forgotError}</div>}
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowForgotModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleForgotPassword}>Send Reset Link</Button>
//         </Modal.Footer>
//       </Modal>
 
//       {/* Main Card */}
//       <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6">
//             <motion.div variants={itemVariants} className="card shadow-lg border-0 overflow-hidden"
//               style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.9)' }}
//               whileHover={{ scale: 1.02 }}>
//               <div className="card-body p-0">
//                 <div className="row g-0">
//                   {/* Left Visual */}
//                   <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center"
//                     style={{ background: 'linear-gradient(to right, #2D5D7B, #A62D69)' }}>
//                     <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
//                       style={{ zIndex: 1, textAlign: 'center', color: 'white' }}>
//                       <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
//                         {activeTab === 'student' ? <FaUserGraduate /> : <FaUserTie />}
//                       </div>
//                       <h4 className="fw-bold mb-0">{activeTab === 'student' ? 'Student Portal' : 'Parent Portal'}</h4>
//                       {activeTab === 'student'
//                         ? <p className="mb-0 text-white">Your gateway to knowledge</p>
//                         : <p className="mb-0 text-white">Track your child's progress</p>}
//                     </motion.div>
//                   </div>
 
//                   {/* Right Form */}
//                   <div className="col-md-7">
//                     <div className="p-4 p-md-5">
//                       {/* Branding */}
//                       <motion.div variants={itemVariants} className="text-center mb-4"
//                         onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
//                         <motion.h1 className="fw-bold mb-2"
//                           style={{ background: 'linear-gradient(to right, #2D5D7B, #A62D69)',
//                             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                           NOVYA
//                         </motion.h1>
//                         <p className="text-muted">Education Management Platform</p>
//                       </motion.div>
 
//                       {/* Tabs */}
//                       <div className="btn-group w-100 shadow-sm mb-4">
//                         <button className={`btn ${activeTab === 'student' ? 'btn-primary' : 'btn-outline-primary'}`}
//                           onClick={() => setActiveTab('student')}>
//                           <FaUserGraduate className="me-2" /> Student
//                         </button>
//                         <button className={`btn ${activeTab === 'parent' ? 'btn-primary' : 'btn-outline-primary'}`}
//                           onClick={() => setActiveTab('parent')}>
//                           <FaUserTie className="me-2" /> Parent
//                         </button>
//                       </div>
 
//                       {/* Form */}
//                       <motion.form variants={containerVariants} onSubmit={handleSubmit}>
//                         {/* Username */}
//                         <div className="mb-3">
//                           <label className="form-label fw-medium">Username</label>
//                           <div className="input-group">
//                             <span className="input-group-text"><FaUserGraduate /></span>
//                             <input
//                               type="text"
//                               name="username"
//                               className="form-control"
//                               value={formData[activeTab].username}
//                               onChange={handleChange}
//                               placeholder={`Enter username`}
//                             />
//                           </div>
//                           {errors[activeTab].username && (
//                             <div className="invalid-feedback d-block">{errors[activeTab].username}</div>
//                           )}
//                         </div>
 
//                         {/* Password */}
//                         <div className="mb-3">
//                           <label className="form-label fw-medium">Password</label>
//                           <div className="input-group">
//                             <span className="input-group-text"><RiLockPasswordFill /></span>
//                             <input
//                               type={showPassword[activeTab] ? "text" : "password"}
//                               name="password"
//                               className="form-control"
//                               value={formData[activeTab].password}
//                               onChange={handleChange}
//                               placeholder="Enter password"
//                             />
//                             {formData[activeTab].password.length > 0 && (
//                               <span className="input-group-text" style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
//                                 {showPassword[activeTab] ? <FaEyeSlash /> : <FaEye />}
//                               </span>
//                             )}
//                           </div>
//                           {errors[activeTab].password && (
//                             <div className="invalid-feedback d-block">{errors[activeTab].password}</div>
//                           )}
//                         </div>
 
//                         {/* Child Email Field (Only for Parent) */}
//                         {activeTab === 'parent' && (
//                           <div className="mb-3">
//                             <label className="form-label fw-medium">Child's Email</label>
//                             <div className="input-group">
//                               <span className="input-group-text"><FaChild /></span>
//                               <input
//                                 type="email"
//                                 name="childEmail"
//                                 className="form-control"
//                                 value={formData.parent.childEmail}
//                                 onChange={handleChange}
//                                 placeholder="Enter child's email"
//                               />
//                             </div>
//                             {errors.parent.childEmail && (
//                               <div className="invalid-feedback d-block">{errors.parent.childEmail}</div>
//                             )}
                           
//                           </div>
//                         )}
 
//                         {/* Forgot Password */}
//                         <div className="text-end mb-3">
//                           <button type="button" className="btn btn-link p-0" onClick={() => setShowForgotModal(true)}>
//                             Forgot Password?
//                           </button>
//                         </div>
 
//                         {/* Submit */}
//                         <button type="submit" className="btn w-100" disabled={isLoading}
//                           style={{ background: "linear-gradient(to right, #2D5D7B, #A62D69)", color: "white" }}>
//                           {isLoading ? "Signing in..." : "Sign In"}
//                         </button>
 
//                         {/* Register */}
//                         <div className="text-center mt-3">
//                           <p className="text-muted">
//                             New to Novya?{" "}
//                             <button type="button" className="btn btn-link p-0" onClick={handleRegisterClick}>Create account</button>
//                           </p>
//                         </div>
//                       </motion.form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };
 
// export default LoginPage;





















import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { 
  FaUserGraduate, 
  FaUserTie, 
  FaBookOpen, 
  FaChalkboardTeacher, 
  FaEye, 
  FaEyeSlash, 
  FaChild,
  FaCoins 
} from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdSchool } from 'react-icons/io';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({
    student: { username: '', password: '' },
    parent: { username: '', password: '', childEmail: '' }
  });
  const [errors, setErrors] = useState({
    student: { username: '', password: '' },
    parent: { username: '', password: '', childEmail: '' }
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ student: false, parent: false });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [showFlyingCoins, setShowFlyingCoins] = useState(false);

  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [name]: value }
    }));

    if (errors[activeTab][name]) {
      setErrors(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], [name]: '' }
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    let valid = true;
    const current = formData[activeTab];
    const newErrors = { username: '', password: '', childEmail: '' };

    if (!current.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (current.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
      valid = false;
    }

    if (!current.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (current.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (activeTab === 'parent') {
      if (!current.childEmail.trim()) {
        newErrors.childEmail = 'Child email is required';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(current.childEmail)) {
        newErrors.childEmail = 'Please enter a valid email address';
        valid = false;
      }
    }

    setErrors(prev => ({ ...prev, [activeTab]: newErrors }));
    return valid;
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => ({ ...prev, [activeTab]: !prev[activeTab] }));
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const current = formData[activeTab];
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy login validation
    if (
      (activeTab === 'student' && current.username === 'student123' && current.password === 'studentpass') ||
      (activeTab === 'parent' && current.username === 'parent456' && current.password === 'parentpass')
    ) {
      localStorage.setItem('userRole', activeTab);
      localStorage.setItem('userToken', 'dummy-token');
      if (activeTab === 'parent') localStorage.setItem('childEmail', current.childEmail);

      // --- Daily Reward Points Logic (Students Only) ---
      if (activeTab === 'student') {
        const lastRewardDate = localStorage.getItem('student_lastRewardDate');
        const today = new Date().toISOString().split('T')[0];
        let points = parseInt(localStorage.getItem('rewardPoints')) || 0;

        if (lastRewardDate !== today) {
          points += 5; // Add daily points only once
          localStorage.setItem('rewardPoints', points);
          localStorage.setItem('student_lastRewardDate', today);

          // Trigger flying coins animation
          setShowFlyingCoins(true);
          setToastMsg(`Student login successful! +5 Reward Points!`);
        } else {
          setToastMsg(`Student login successful!`);
        }
      } else {
        setToastMsg(`Parent login successful!`);
      }
      // --- End Daily Reward Points Logic ---

      setShowToast(true);
      setIsLoading(false);

      // Wait for animation to complete before navigation
      setTimeout(() => {
        navigate(activeTab === 'student' ? '/student/dashboard' : '/parent/dashboard');
      }, 2500);

    } else {
      setErrors(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], username: '', password: 'Invalid username or password' }
      }));
      setIsLoading(false);
    }
  };

  // Navigate to register page
  const handleRegisterClick = () => {
    navigate('/signup');
  };

  // Forgot password
  const handleForgotPassword = () => {
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError('Please enter a valid email address');
      return;
    }
    setForgotError('');
    setShowForgotModal(false);
    setToastMsg(`Password reset link sent to ${forgotEmail}`);
    setShowToast(true);
    setForgotEmail('');
  };

  // Framer motion variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(to right, #2D5D7B, #A62D69)', position: 'relative', overflow: 'hidden' }}>

      {/* Flying Coins Animation */}
      {showFlyingCoins && (
        <div className="flying-coins-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="flying-coin"
              initial={{ 
                scale: 0,
                opacity: 1,
                x: window.innerWidth / 2 - 100,
                y: window.innerHeight / 2 - 50
              }}
              animate={{
                scale: [0, 1, 0.8, 0],
                opacity: [1, 1, 1, 0],
                x: [window.innerWidth / 2 - 100, window.innerWidth - 100, window.innerWidth - 50],
                y: [window.innerHeight / 2 - 50, 50, 20]
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: i * 0.1
              }}
              style={{
                position: 'absolute',
                fontSize: '24px',
                color: '#FFD700',
                zIndex: 9999,
              }}
              onAnimationComplete={() => {
                if (i === 14) setShowFlyingCoins(false);
              }}
            >
              <FaCoins />
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Icons */}
      <motion.div initial={{ x: -100, y: -100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1, type: 'spring' }} style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}>
        <FaBookOpen />
      </motion.div>
      <motion.div initial={{ x: 100, y: -100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1, type: 'spring', delay: 0.2 }} style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '4rem', color: 'rgba(255,255,255,0.2)' }}>
        <IoMdSchool />
      </motion.div>
      <motion.div initial={{ x: -100, y: 100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1, type: 'spring', delay: 0.4 }} style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '3.5rem', color: 'rgba(255,255,255,0.2)' }}>
        <FaChalkboardTeacher />
      </motion.div>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Header closeButton>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Forgot Password Modal */}
      <Modal show={showForgotModal} onHide={() => setShowForgotModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Enter your email</Form.Label>
            <Form.Control type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="you@example.com" />
            {forgotError && <div className="text-danger mt-1">{forgotError}</div>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgotModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleForgotPassword}>Send Reset Link</Button>
        </Modal.Footer>
      </Modal>

      {/* Main Card */}
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <motion.div variants={itemVariants} className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.9)' }} whileHover={{ scale: 1.02 }}>
              <div className="card-body p-0">
                <div className="row g-0">

                  {/* Left Visual */}
                  <div className="col-md-5 d-none d-md-flex flex-column align-items-center justify-content-center" 
                    style={{ background: 'linear-gradient(to right, #2D5D7B, #A62D69)' }}>
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} 
                      style={{ textAlign: 'center', color: 'white' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {activeTab === 'student' ? <FaUserGraduate /> : <FaUserTie />}
                      </div>
                      <h4 className="fw-bold mb-0">
                        {activeTab === 'student' ? 'Student Portal' : 'Parent Portal'}
                      </h4>
                      <p className="mb-0 text-white">
                        {activeTab === 'student' ? 'Your gateway to knowledge' : "Track your child's progress"}
                      </p>
                    </motion.div>

                    {/* Reward Points Info */}
                    {activeTab === 'student' && (
                      <motion.div 
                        style={{
                          marginTop: '20px',
                          padding: '10px 15px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          fontSize: '0.9rem'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <FaCoins size={16} />
                        <span>+5 Daily Login Reward!</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Form */}
                  <div className="col-md-7">
                    <div className="p-4 p-md-5">

                      {/* Branding */}
                      <motion.div variants={itemVariants} className="text-center mb-4">
                        <motion.h1 className="fw-bold mb-2" style={{ background: 'linear-gradient(to right, #2D5D7B, #A62D69)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          NOVYA
                        </motion.h1>
                        <p className="text-muted">Education Management Platform</p>
                      </motion.div>

                      {/* Tabs */}
                      <div className="btn-group w-100 shadow-sm mb-4">
                        <button className={`btn ${activeTab === 'student' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('student')}>
                          <FaUserGraduate className="me-2" /> Student
                        </button>
                        <button className={`btn ${activeTab === 'parent' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('parent')}>
                          <FaUserTie className="me-2" /> Parent
                        </button>
                      </div>

                      {/* Form */}
                      <motion.form onSubmit={handleSubmit} variants={containerVariants}>

                        {/* Username */}
                        <div className="mb-3">
                          <label className="form-label fw-medium">Username</label>
                          <div className="input-group">
                            <span className="input-group-text"><FaUserGraduate /></span>
                            <input type="text" name="username" className="form-control" value={formData[activeTab].username} onChange={handleChange} placeholder="Enter username" />
                          </div>
                          {errors[activeTab].username && <div className="invalid-feedback d-block">{errors[activeTab].username}</div>}
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                          <label className="form-label fw-medium">Password</label>
                          <div className="input-group">
                            <span className="input-group-text"><RiLockPasswordFill /></span>
                            <input type={showPassword[activeTab] ? "text" : "password"} name="password" className="form-control" value={formData[activeTab].password} onChange={handleChange} placeholder="Enter password" />
                            {formData[activeTab].password.length > 0 && (
                              <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                {showPassword[activeTab] ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            )}
                          </div>
                          {errors[activeTab].password && <div className="invalid-feedback d-block">{errors[activeTab].password}</div>}
                        </div>

                        {/* Child Email for Parent */}
                        {activeTab === 'parent' && (
                          <div className="mb-3">
                            <label className="form-label fw-medium">Child's Email</label>
                            <div className="input-group">
                              <span className="input-group-text"><FaChild /></span>
                              <input type="email" name="childEmail" className="form-control" value={formData.parent.childEmail} onChange={handleChange} placeholder="Enter child's email" />
                            </div>
                            {errors.parent.childEmail && <div className="invalid-feedback d-block">{errors.parent.childEmail}</div>}
                          </div>
                        )}

                        {/* Forgot Password */}
                        <div className="text-end mb-3">
                          <button type="button" className="btn btn-link p-0" onClick={() => setShowForgotModal(true)}>Forgot Password?</button>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn w-100" disabled={isLoading} style={{ background: 'linear-gradient(to right, #2D5D7B, #A62D69)', color: 'white' }}>
                          {isLoading ? "Signing in..." : "Sign In"}
                        </button>

                        {/* Register */}
                        <div className="text-center mt-3">
                          <p className="text-muted">New to Novya? <button type="button" className="btn btn-link p-0" onClick={handleRegisterClick}>Create account</button></p>
                        </div>

                      </motion.form>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;