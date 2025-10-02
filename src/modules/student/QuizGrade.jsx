

// // function QuizGrade({ classes, onClassClick }) {
// //   const gradeIcons = ["🎓", "🎓", "🎓", "🎓"]; // Custom icons for grade cards
 
// //   const getClassColor = (cl) => {
// //     switch (cl) {
// //       case 7: return "#e74c3c"; // red
// //       case 8: return "#1abc9c"; // teal
// //       case 9: return "#3498db"; // blue
// //       case 10: return "#27ae60"; // green
// //       case 11: return "#f39c12"; // orange
// //       case 12: return "#9b59b6"; // purple
// //       default: return "#95a5a6";
// //     }
// //   };
 
// //   return (
// //     <section
// //       style={{
// //         padding: "4rem 2rem",
// //         minHeight: "100vh",
// //         fontFamily: "'Inter','Segoe UI',sans-serif",
// //         position: "relative",
// //         overflow: "hidden",
// //         backgroundImage: `url("/mnt/data/Screenshot 2025-09-26 114310.png")`, // 👈 Replace with actual path
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundRepeat: "no-repeat",
// //       }}
// //     >
// //       {/* Overlay for readability */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           background: "rgba(255,255,255,0.85)",
// //           backdropFilter: "blur(6px)",
// //           zIndex: 0,
// //         }}
// //       ></div>
 
// //       {/* Floating Circles */}
// //       <div className="bg-circles">
// //         <span style={{ background: "#9a5e5730", top: "10%", left: "15%", width: "180px", height: "180px" }}></span>
// //         <span style={{ background: "#3b9a8730", top: "70%", left: "10%", width: "140px", height: "140px" }}></span>
// //         <span style={{ background: "#49657730", top: "20%", right: "10%", width: "200px", height: "200px" }}></span>
// //         <span style={{ background: "#27ae6030", bottom: "15%", right: "20%", width: "150px", height: "150px" }}></span>
// //         <span style={{ background: "#deb47030", top: "50%", left: "45%", width: "120px", height: "120px" }}></span>
// //         <span style={{ background: "#5e426930", bottom: "5%", left: "35%", width: "160px", height: "160px" }}></span>
// //       </div>
 
// //       {/* Content */}
// //       <div style={{ position: "relative", zIndex: 1 }}>
// //         {/* Header */}
// //         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
// //           <h2
// //             style={{
// //               fontSize: "2.8rem",
// //               fontWeight: "800",
// //               background: "linear-gradient(135deg,#2c3e50,#34495e)",
// //               WebkitBackgroundClip: "text",
// //               WebkitTextFillColor: "transparent",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             Choose Your Grade
// //           </h2>
// //           <p
// //             style={{
// //               fontSize: "1.1rem",
// //               color: "#8fa2b5ff",
// //               maxWidth: "600px",
// //               margin: "0 auto",
// //               lineHeight: "1.6",
// //               fontWeight: "500",
// //             }}
// //           >
// //             Select your grade level to explore quizzes and study materials built for your journey.
// //           </p>
// //         </div>
 
// //         {/* Grade Cards */}
// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// //             gap: "2.2rem",
// //             maxWidth: "1150px",
// //             margin: "0 auto",
// //           }}
// //         >
// //           {classes.map((cl, index) => {
// //             const isDisabled = cl === 12;
// //             const classColor = getClassColor(cl);
// //             const icon = gradeIcons[index % gradeIcons.length]; // cycle icons
 
// //             return (
// //               <div
// //                 key={cl}
// //                 onClick={() => (isDisabled ? null : onClassClick(cl))}
// //                 className="grade-card"
// //                 style={{
// //                   borderRadius: "24px",
// //                   padding: "2.5rem 1.8rem",
// //                   cursor: isDisabled ? "not-allowed" : "pointer",
// //                   position: "relative",
// //                   overflow: "hidden",
// //                   textAlign: "center",
// //                   transition: "all 0.35s ease",
// //                   background: "rgba(249,251,253,0.9)",
// //                   backdropFilter: "blur(16px)",
// //                   border: `3px solid ${isDisabled ? "#dcdcdc" : classColor + "50"}`,
// //                   boxShadow: `0 12px 28px rgba(0,0,0,0.15), 0 0 15px ${classColor}33`,
// //                 }}
// //               >
// //                 {/* Icon Badge */}
// //                 <div
// //                   style={{
// //                     width: "90px",
// //                     height: "90px",
// //                     margin: "0 auto 1.2rem",
// //                     borderRadius: "50%",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     background: isDisabled
// //                       ? "linear-gradient(135deg,#bdc3c7,#95a5a6)"
// //                       : `linear-gradient(135deg,${classColor},${classColor}cc)`,
// //                     fontSize: "2.5rem",
// //                     boxShadow: `0 8px 20px ${classColor}55`,
// //                     animation: isDisabled ? "none" : "pulse 2.5s infinite",
// //                   }}
// //                 >
// //                   {icon}
// //                 </div>
 
// //                 {/* Grade Number */}
// //                 <div
// //                   style={{
// //                     fontSize: "3.2rem",
// //                     fontWeight: "900",
// //                     background: isDisabled
// //                       ? "linear-gradient(135deg,#95a5a6,#bdc3c7)"
// //                       : `linear-gradient(135deg,${classColor},${classColor}dd)`,
// //                     WebkitBackgroundClip: "text",
// //                     WebkitTextFillColor: "transparent",
// //                     marginBottom: "0.5rem",
// //                   }}
// //                 >
// //                   {cl}
// //                 </div>
 
// //                 {/* Title */}
// //                 <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "#2c3e50" }}>
// //                   Grade {cl}
// //                 </div>
 
// //                 {/* Coming Soon */}
// //                 {isDisabled && (
// //                   <div
// //                     style={{
// //                       marginTop: "1.3rem",
// //                       background: "#2c3e50",
// //                       color: "#fff",
// //                       padding: "0.55rem 1.1rem",
// //                       borderRadius: "12px",
// //                       fontSize: "0.9rem",
// //                       fontWeight: "700",
// //                       display: "inline-block",
// //                     }}
// //                   >
// //                     🚧 Coming Soon
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
 
// //       {/* Animations + Circles */}
// //       <style>
// //         {`
// //           .grade-card:hover {
// //             transform: translateY(-18px) scale(1.07) rotateX(5deg) rotateY(-5deg);
// //             box-shadow: 0 20px 45px rgba(0,0,0,0.2), 0 0 30px rgba(0,0,0,0.18);
// //           }
// //           @keyframes pulse {
// //             0%, 100% { transform: scale(1); }
// //             50% { transform: scale(1.08); }
// //           }
// //           .bg-circles span {
// //             position: absolute;
// //             border-radius: 50%;
// //             z-index: 0;
// //             filter: blur(30px);
// //             animation: float 8s ease-in-out infinite alternate;
// //           }
// //           @keyframes float {
// //             from { transform: translateY(0px); }
// //             to { transform: translateY(-40px); }
// //           }
// //         `}
// //       </style>
// //     </section>
// //   );
// // }
 
// // export default QuizGrade;




































// // function QuizGrade({ classes, onClassClick }) {
// //   const gradeIcons = ["🎓", "🎓", "🎓", "🎓"];

// //   const getClassColor = (cl) => {
// //     switch (cl) {
// //       case 7: return "#00a8ff";
// //       case 8: return "#9c88ff";
// //       case 9: return "#4cd137";
// //       case 10: return "#e84118";
// //       case 11: return "#fbc531";
// //       case 12: return "#487eb0";
// //       default: return "#718093";
// //     }
// //   };

// //   return (
// //     <section
// //       style={{
// //         padding: "4rem 2rem",
// //         minHeight: "100vh",
// //         fontFamily: "'Inter','Segoe UI',sans-serif",
// //         position: "relative",
// //         overflow: "hidden",
// //         background: "linear-gradient(135deg, #f9f9f9, #ececec)",
// //         color: "#2f3640",
// //       }}
// //     >
// //       {/* Sparkles */}
// //       <div className="sparkles">
// //         {Array.from({ length: 20 }).map((_, i) => (
// //           <span
// //             key={i}
// //             style={{
// //               top: `${Math.random() * 100}vh`,
// //               left: `${Math.random() * 100}vw`,
// //               animationDuration: `${6 + Math.random() * 6}s`,
// //               animationDelay: `${Math.random() * 5}s`,
// //             }}
// //           ></span>
// //   ))}
// // </div>
// // {/* Floating background circles */}
// // <div className="floating-circles">
// //   {/* Original 10 circles */}
// //   {Array.from({ length: 8}).map((_, i) => {
// //     const size = 50 + Math.random() * 100; // same for width & height
// //     return (
// //       <div
// //         key={i}
// //         className="circle"
// //         style={{
// //           width: `${size}px`,
// //           height: `${size}px`,
// //           top: `${Math.random() * 100}vh`,
// //           left: `${Math.random() * 100}vw`,
// //           background: `rgba(0, 0, 0, ${0.05 + Math.random() * 0.5})`,
// //           borderRadius: "55%", // ensures perfect circle
// //           animationDuration: `${20 + Math.random() * 20}s`,
// //           animationDelay: `${Math.random() * 10}s`,
// //         }}
// //       ></div>
// //     );
// //   })}
// // </div>



// //       {/* Content */}
// //       <div style={{ position: "relative", zIndex: 1 }}>
// //         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
// //           <h2
// //             style={{
// //               fontSize: "3rem",
// //               fontWeight: "900",
// //               background: "linear-gradient(135deg,#2c3e50,#636e72)",
// //               WebkitBackgroundClip: "text",
// //               WebkitTextFillColor: "transparent",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             Choose Your Grade
// //           </h2>
// //           <p
// //             style={{
// //               fontSize: "1.2rem",
// //               color: "#2f3640",
// //               maxWidth: "650px",
// //               margin: "0 auto",
// //               lineHeight: "1.6",
// //               fontWeight: "400",
// //             }}
// //           >
// //             Unlock quizzes and study materials designed just for your grade.
// //           </p>
// //         </div>

// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// //             gap: "2.2rem",
// //             maxWidth: "1150px",
// //             margin: "0 auto",
// //           }}
// //         >
// //           {classes.map((cl, index) => {
// //             const isDisabled = cl === 12;
// //             const classColor = getClassColor(cl);
// //             const icon = gradeIcons[index % gradeIcons.length];

// //             return (
// //               <div
// //                 key={cl}
// //                 onClick={() => (isDisabled ? null : onClassClick(cl))}
// //                 className="grade-card"
// //                 style={{
// //                   borderRadius: "22px",
// //                   padding: "2.5rem 1.8rem",
// //                   cursor: isDisabled ? "not-allowed" : "pointer",
// //                   position: "relative",
// //                   textAlign: "center",
// //                   background: "rgba(255,255,255,0.6)",
// //                   backdropFilter: "blur(12px)",
// //                   border: `1px solid ${isDisabled ? "#636e72" : classColor + "80"}`,
// //                   boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
// //                   transition: "all 0.6s ease",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: "85px",
// //                     height: "85px",
// //                     margin: "0 auto 1.2rem",
// //                     borderRadius: "50%",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     fontSize: "2.5rem",
// //                     background: isDisabled
// //                       ? "linear-gradient(135deg,#636e72,#2d3436)"
// //                       : `linear-gradient(135deg,${classColor},${classColor}aa)`,
// //                     color: "#fff",
// //                     boxShadow: `0 10px 30px ${classColor}60`,
// //                     // animation: isDisabled ? "none" : "pulse 2.5s infinite",
// //                   }}
// //                 >
// //                   {icon}
// //                 </div>

// //                 <div
// //                   style={{
// //                     fontSize: "3rem",
// //                     fontWeight: "800",
// //                     background: isDisabled
// //                       ? "linear-gradient(135deg,#95a5a6,#bdc3c7)"
// //                       : `linear-gradient(135deg,${classColor},#ffffff)`,
// //                     WebkitBackgroundClip: "text",
// //                     WebkitTextFillColor: "transparent",
// //                     marginBottom: "0.5rem",
// //                   }}
// //                 >
// //                   {cl}
// //                 </div>

// //                 <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "#2f3640" }}>
// //                   Grade {cl}
// //                 </div>

// //                 {isDisabled && (
// //                   <div
// //                     style={{
// //                       marginTop: "1.3rem",
// //                       background: "#353b48",
// //                       color: "#fff",
// //                       padding: "0.55rem 1.1rem",
// //                       borderRadius: "12px",
// //                       fontSize: "0.9rem",
// //                       fontWeight: "700",
// //                       display: "inline-block",
// //                     }}
// //                   >
// //                     🚧 Coming Soon
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Animations */}
// //       <style>
// //         {`
// //           /* Sparkles */
// //           .sparkles span {
// //             position: absolute;
// //             width: 6px;
// //             height: 6px;
// //             background: white;
// //             border-radius: 50%;
// //             opacity: 0.9;
// //             box-shadow: 0 0 8px rgba(255,255,255,0.8);
// //             animation: sparkle-rotate linear infinite;
// //           }
// //           @keyframes sparkle-rotate {
// //             0% { transform: rotate(0deg) translateX(50px) rotate(0deg); opacity: 0.6; }
// //             50% { opacity: 1; }
// //             100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); opacity: 0.6; }
// //           }

// //           /* Card Hover Floating Effect */
// //           .grade-card:hover {
// //             transform: translateY(-15px) scale(1.05) rotateX(2deg) rotateY(2deg);
// //             box-shadow: 0 18px 40px rgba(0,0,0,0.25);
// //             animation: float 3s ease-in-out infinite;
// //           }

// //           @keyframes float {
// //             0% { transform: translateY(-15px) scale(1.05) rotateX(2deg) rotateY(2deg); }
// //             50% { transform: translateY(-25px) scale(1.06) rotateX(-2deg) rotateY(-2deg); }
// //             100% { transform: translateY(-15px) scale(1.05) rotateX(2deg) rotateY(2deg); }
// //           }

// //           @keyframes pulse {
// //             0%, 100% { transform: scale(1); }
// //             50% { transform: scale(1.1); }
// //           }

// //           /* Floating Circles Animation */
// //           .floating-circles .circle {
// //             position: absolute;
// //             border-radius: 50%;
// //             opacity: 0.15;
// //             animation-name: floatCircle;
// //             animation-timing-function: ease-in-out;
// //             animation-iteration-count: infinite;
// //           }

// //           @keyframes floatCircle {
// //             0% { transform: translateY(0) scale(1); }
// //             50% { transform: translateY(-50px) scale(1.1); }
// //             100% { transform: translateY(0) scale(1); }
// //           }
// //         `}
// //       </style>
// //     </section>
// //   );
// // }

// // export default QuizGrade;













   


































// function QuizGrade({ classes, onClassClick }) {
//   const gradeIcons = ["🎓", "🎓", "🎓", "🎓"];

//   const getClassColor = (cl) => {
//     switch (cl) {
//       case 7:
//         return "#00a8ff";
//       case 8:
//         return "#9c88ff";
//       case 9:
//         return "#4cd137";
//       case 10:
//         return "#e84118";
//       case 11:
//         return "#fbc531";
//       case 12:
//         return "#487eb0";
//       default:
//         return "#718093";
//     }
//   };

//   return (
//     <section
//       style={{
//         padding: "4rem 2rem",
//         minHeight: "100vh",
//         fontFamily: "'Inter','Segoe UI',sans-serif",
//         position: "relative",
//         overflow: "hidden",
//         background: "linear-gradient(135deg, #f9f9f9, #ececec)",
//         color: "#2f3640",
//       }}
//     >
//       {/* Sparkles */}
//       <div className="sparkles">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <span
//             key={i}
//             style={{
//               top: `${Math.random() * 100}vh`,
//               left: `${Math.random() * 100}vw`,
//               animationDuration: `${6 + Math.random() * 6}s`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           ></span>
//         ))}
//       </div>
//       {/* Floating background circles */}
//       <div className="floating-circles">
//         {Array.from({ length: 8 }).map((_, i) => {
//           const size = 50 + Math.random() * 100;
//           return (
//             <div
//               key={i}
//               className="circle"
//               style={{
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 top: `${Math.random() * 100}vh`,
//                 left: `${Math.random() * 100}vw`,
//                 background: `rgba(0, 0, 0, ${0.05 + Math.random() * 0.8})`,
//                 borderRadius: "55%",
//                 animationDuration: `${20 + Math.random() * 20}s`,
//                 animationDelay: `${Math.random() * 10}s`,
//               }}
//             ></div>
//           );
//         })}
//       </div>

//       {/* Content */}
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <h2
//             style={{
//               fontSize: "3rem",
//               fontWeight: "900",
//               background: "linear-gradient(135deg,#2c3e50,#636e72)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               marginBottom: "1rem",
//             }}
//           >
//             Choose Your Grade
//           </h2>
//           <p
//             style={{
//               fontSize: "1.2rem",
//               color: "#2f3640",
//               maxWidth: "650px",
//               margin: "0 auto",
//               lineHeight: "1.6",
//               fontWeight: "400",
//             }}
//           >
//             Unlock quizzes and study materials designed just for your grade.
//           </p>
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "2.2rem",
//             maxWidth: "1150px",
//             margin: "0 auto",
//           }}
//         >
//           {classes.map((cl, index) => {
//             const isDisabled = cl === 12;
//             const classColor = getClassColor(cl);
//             const icon = gradeIcons[index % gradeIcons.length];

//             return (
//               <div
//                 key={cl}
//                 onClick={() => (isDisabled ? null : onClassClick(cl))}
//                 className="grade-card"
//                 style={{
//                   borderRadius: "22px",
//                   padding: "2.5rem 1.8rem",
//                   cursor: isDisabled ? "not-allowed" : "pointer",
//                   position: "relative",
//                   textAlign: "center",
//                   background: "rgba(255, 245, 245, 0.6)",
//                   backdropFilter: "blur(12px)",
//                   border: `1px solid ${isDisabled ? "#636e72" : classColor + "80"}`,
//                   boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
//                   transition: "all 0.6s ease",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "85px",
//                     height: "85px",
//                     margin: "0 auto 1.2rem",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "2.5rem",
//                     background: isDisabled
//                       ? "linear-gradient(135deg,#636e72,#2d3436)"
//                       : `linear-gradient(135deg,${classColor},${classColor}aa)`,
//                     color: "#fff",
//                     boxShadow: `0 10px 30px ${classColor}60`,
//                     position: "relative",
//                     zIndex: 2,
//                   }}
//                 >
//                   {icon}
//                 </div>

//                 <div
//                   style={{
//                     fontSize: "3rem",
//                     fontWeight: "800",
//                     background: isDisabled
//                       ? "linear-gradient(135deg,#95a5a6,#bdc3c7)"
//                       : `linear-gradient(135deg,${classColor},#ffffff)`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     marginBottom: "0.5rem",
//                     position: "relative",
//                     zIndex: 2,
//                   }}
//                 >
//                   {cl}
//                 </div>

//                 <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "#2f3640", position: "relative", zIndex: 2 }}>
//                   Grade {cl}
//                 </div>

//                 {!isDisabled && (
//                   <div
//                     className="grade-card-overlay"
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       borderRadius: "22px",
//                       // background: `linear-gradient(120deg, ${classColor}55, #ffffff33, ${classColor}22)`,
//                       backgroundSize: "300% 300%",
//                       zIndex: 1,
//                       pointerEvents: "none",
//                     }}
//                   ></div>
//                 )}

//                 {isDisabled && (
//                   <div
//                     style={{
//                       marginTop: "1.3rem",
//                       background: "#353b48",
//                       color: "#fff",
//                       padding: "0.55rem 1.1rem",
//                       borderRadius: "12px",
//                       fontSize: "0.9rem",
//                       fontWeight: "700",
//                       display: "inline-block",
//                       position: "relative",
//                       zIndex: 2,
//                     }}
//                   >
//                     🚧 Coming Soon
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//           /* Sparkles */
//           .sparkles span {
//             position: absolute;
//             width: 6px;
//             height: 6px;
//             background: white;
//             border-radius: 50%;
//             opacity: 0.9;
//             box-shadow: 0 0 8px rgba(255,255,255,0.8);
//             animation: sparkle-rotate linear infinite;
//           }
//           @keyframes sparkle-rotate {
//             0% { transform: rotate(0deg) translateX(50px) rotate(0deg); opacity: 0.6; }
//             50% { opacity: 1; }
//             100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); opacity: 0.6; }
//           }

//           /* Floating Circles */
//           .floating-circles .circle {
//             position: absolute;
//             border-radius: 50%;
//             opacity: 0.15;
//             animation-name: floatCircle;
//             animation-timing-function: ease-in-out;
//             animation-iteration-count: infinite;
//           }
//           @keyframes floatCircle {
//             0% { transform: translateY(0) scale(1); }
//             50% { transform: translateY(-50px) scale(1.1); }
//             100% { transform: translateY(0) scale(1); }
//           }

//           /* Card Hover Floating Effect */
//           .grade-card:hover {
//             transform: translateY(-15px) scale(1.05) rotateX(2deg) rotateY(2deg);
//             box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
//             animation: float 3s ease-in-out infinite;
//             background-position: 100% 100%;
//             background-repeat: no-repeat;
//             background-size: 300% 300%;
//             transition: all 0.6s ease;
//           }

//           /* Diagonal tide animation on overlay */
//           .grade-card-overlay {
//             animation: diagonalTide 5s linear infinite;
//           }

//           @keyframes diagonalTide {
//             0% { background-position: 0% 0%; }
//             50% { background-position: 100% 100%; }
//             100% { background-position: 0% 0%; }
//           }

//           @keyframes float {
//             0% { transform: translateY(-15px) scale(1.05) rotateX(2deg) rotateY(2deg); }
//             50% { transform: translateY(-25px) scale(1.06) rotateX(-2deg) rotateY(-2deg); }
//             100% { transform: translateY(-15px) scale(1.05) rotateX(2deg) rotateY(2deg); }
//           }
//         `}
//       </style>
//     </section>
//   );
// }

// export default QuizGrade;






import { useNavigate } from 'react-router-dom';
 
function QuizGrade({ classes, onClassClick }) {
  const navigate = useNavigate();
  const gradeIcons = ["🎓", "🎓", "🎓", "🎓"]; // Custom icons for grade cards
 
  const getClassColor = (cl) => {
    switch (cl) {
      case 7: return "#e74c3c"; // red
      case 8: return "#1abc9c"; // teal
      case 9: return "#3498db"; // blue
      case 10: return "#27ae60"; // green
      case 11: return "#f39c12"; // orange
      case 12: return "#9b59b6"; // purple
      default: return "#95a5a6";
    }
  };
 
  return (
    <section
      style={{
        padding: "4rem 2rem",
        minHeight: "100vh",
        fontFamily: "'Inter','Segoe UI',sans-serif",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url("/mnt/data/Screenshot 2025-09-26 114310.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          zIndex: 0,
        }}
      ></div>
 
      {/* Back Button */}
      <button
        onClick={() => navigate("/student/dashboard")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 2,
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          background: "#34495e",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        ← Back
      </button>
 
      {/* Floating Circles */}
      <div className="bg-circles">
        <span style={{ background: "#9a5e5730", top: "10%", left: "15%", width: "180px", height: "180px" }}></span>
        <span style={{ background: "#3b9a8730", top: "70%", left: "10%", width: "140px", height: "140px" }}></span>
        <span style={{ background: "#49657730", top: "20%", right: "10%", width: "200px", height: "200px" }}></span>
        <span style={{ background: "#27ae6030", bottom: "15%", right: "20%", width: "150px", height: "150px" }}></span>
        <span style={{ background: "#deb47030", top: "50%", left: "45%", width: "120px", height: "120px" }}></span>
        <span style={{ background: "#5e426930", bottom: "5%", left: "35%", width: "160px", height: "160px" }}></span>
      </div>
 
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              background: "linear-gradient(135deg,#2c3e50,#34495e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
            }}
          >
            Choose Your Grade
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#8fa2b5ff",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
          >
            Select your grade level to explore quizzes and study materials built for your journey.
          </p>
        </div>
 
        {/* Grade Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2.2rem",
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          {classes.map((cl, index) => {
            const isDisabled = cl === 12;
            const classColor = getClassColor(cl);
            const icon = gradeIcons[index % gradeIcons.length]; // cycle icons
 
            return (
              <div
                key={cl}
                onClick={() => (isDisabled ? null : onClassClick(cl))}
                className="grade-card"
                style={{
                  borderRadius: "24px",
                  padding: "2.5rem 1.8rem",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                  transition: "all 0.35s ease",
                  background: "rgba(249,251,253,0.9)",
                  backdropFilter: "blur(16px)",
                  border: `3px solid ${isDisabled ? "#dcdcdc" : classColor + "50"}`,
                  boxShadow: `0 12px 28px rgba(0,0,0,0.15), 0 0 15px ${classColor}33`,
                }}
              >
                {/* Icon Badge */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    margin: "0 auto 1.2rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isDisabled
                      ? "linear-gradient(135deg,#bdc3c7,#95a5a6)"
                      : `linear-gradient(135deg,${classColor},${classColor}cc)`,
                    fontSize: "2.5rem",
                    boxShadow: `0 8px 20px ${classColor}55`,
                    animation: isDisabled ? "none" : "pulse 2.5s infinite",
                  }}
                >
                  {icon}
                </div>
 
                {/* Grade Number */}
                <div
                  style={{
                    fontSize: "3.2rem",
                    fontWeight: "900",
                    background: isDisabled
                      ? "linear-gradient(135deg,#95a5a6,#bdc3c7)"
                      : `linear-gradient(135deg,${classColor},${classColor}dd)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0.5rem",
                  }}
                >
                  {cl}
                </div>
 
                {/* Title */}
                <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "#2c3e50" }}>
                  Grade {cl}
                </div>
 
                {/* Coming Soon */}
                {isDisabled && (
                  <div
                    style={{
                      marginTop: "1.3rem",
                      background: "#2c3e50",
                      color: "#fff",
                      padding: "0.55rem 1.1rem",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      display: "inline-block",
                    }}
                  >
                    🚧 Coming Soon
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
 
      {/* Animations + Circles */}
      <style>
        {`
          .grade-card:hover {
            transform: translateY(-18px) scale(1.07) rotateX(5deg) rotateY(-5deg);
            box-shadow: 0 20px 45px rgba(0,0,0,0.2), 0 0 30px rgba(0,0,0,0.18);
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          .bg-circles span {
            position: absolute;
            border-radius: 50%;
            z-index: 0;
            filter: blur(30px);
            animation: float 8s ease-in-out infinite alternate;
          }
          @keyframes float {
            from { transform: translateY(0px); }
            to { transform: translateY(-40px); }
          }
        `}
      </style>
    </section>
  );
}
 export default QuizGrade;