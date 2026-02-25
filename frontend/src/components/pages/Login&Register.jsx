import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { sendPasswordResetCode, resetPassword } from "../../api/user";
import Loader from "../layout/Loader";
import "./Login&Register.css";

// API base URL
const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";
// const API_URL = import.meta.env.VITE_LOCAL_URL || "http://localhost:5000";

export default function LoginRegister({ logoUrl }) {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: code+password
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer for password reset code
  React.useEffect(() => {
    if (!showForgotPasswordModal || forgotPasswordStep !== 2) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showForgotPasswordModal, forgotPasswordStep]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle send reset code
  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      await sendPasswordResetCode(resetEmail);
      
      Swal.fire({
        icon: 'success',
        title: 'Reset Code Sent!',
        text: 'Please check your email for the password reset code',
        timer: 2000,
        showConfirmButton: false,
      });
      
      setForgotPasswordStep(2);
      setTimeLeft(900);
      setCanResend(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Code',
        text: error || 'Please check your email and try again',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setResetLoading(false);
    }
  };

// Handle reset password
const handleResetPassword = async (e) => {
  e.preventDefault();
  setResetLoading(true);

  if (newPassword !== confirmNewPassword) {
    Swal.fire({
      icon: 'warning',
      title: 'Passwords do not match',
      timer: 2000,
      showConfirmButton: false,
    });
    setResetLoading(false);
    return;
  }

  try {
    await resetPassword(resetEmail, resetCode, newPassword);
    
    Swal.fire({
      icon: 'success',
      title: 'Password Reset Successful!',
      text: 'You can now login with your new password',
      timer: 3000,
      showConfirmButton: false,
    });
    
    // Reset state and close modal
      setShowForgotPasswordModal(false);
      setForgotPasswordStep(1);
      setResetEmail("");
      setResetCode("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: error || 'Invalid or expired code',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setResetLoading(false);
    }
  };

  // Handle resend code
  const handleResendResetCode = async () => {
    setResetLoading(true);
    try {
      await sendPasswordResetCode(resetEmail);
      
      Swal.fire({
        icon: 'success',
        title: 'Code Resent!',
        text: 'A new reset code has been sent to your email',
        timer: 2000,
        showConfirmButton: false,
      });
      
      setTimeLeft(900);
      setCanResend(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Resend Failed',
        text: error || 'Failed to resend code',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setResetLoading(false);
    }
  };

  // Handle close forgot password modal
  const handleCloseForgotPassword = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordStep(1);
    setResetEmail("");
    setResetCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setTimeLeft(900);
    setCanResend(false);
  };

  // REGISTER FUNCTION
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords do not match",
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();

    const payload = {
      username: username.trim(),
      email: email.trim(),
      password: password,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/user/register`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Registered:", response.data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Optional reset
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setHobbies([]);
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.error || "Invalid credentials.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("✅ Login response:", response.data);

      // Store token, userId, and username in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("isVerified", response.data.user.isVerified);

      console.log("💾 Stored in localStorage:");
      console.log("  token:", localStorage.getItem("token"));
      console.log("  userId:", localStorage.getItem("userId"));
      console.log("  username:", localStorage.getItem("username"));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/lessons"), 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.error || "Invalid credentials.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-register-wrapper">
      {resetLoading && <Loader />}
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        {/* LOGIN */}
        <div className="form-container sign-up">
          <form id="loginForm" onSubmit={handleLogin}>
            <h1>LOGIN</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
              />
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  disabled={loading}
                />

                <a
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(prev => !prev)}
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </a>
              </div>
              
              <a 
                onClick={() => setShowForgotPasswordModal(true)}
                style={{
                  cursor: 'pointer',
                  color: '#0029FF',
                  fontSize: '12px',
                  textDecoration: 'none',
                  marginTop: '5px',
                  display: 'block',
                }}
              >
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              LOGIN
            </button>
          </form>

          {/* Mobile-only toggle button */}
          <div className="mobile-toggle-row">
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Don't have an account? Register" : "Already have an account? Log In"}
              </button>
          </div>
        </div>

        {/* REGISTER */}
        <div className="form-container sign-in">
          <form id="registerForm" onSubmit={handleRegister}>
            <h1>REGISTER</h1>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="UserName ( > 6 characters )"
                required
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password ( atleast 1 character )"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <a
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(prev => !prev)}
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </a>
              </div>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  disabled={loading}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <a
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </a>
              </div>
            </div>
            <button type="submit" className="btn2" disabled={loading}>
              REGISTER
            </button>
          </form>

          {/* Mobile-only toggle button */}
          <div className="mobile-toggle-row">
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Don't have an account? Register" : "Already have an account? Log In"}
            </button>
          </div>
        </div>

        {/* TOGGLE CONTAINER */}
        <div className="toggle-container">
          <div className="toggle">
            {/* LEFT SIDE */}
            <div className="toggle-panel toggle-left">
              <img src={logoUrl} alt="TypeVenture Logo" className="trademark" />
              <h1>GREETINGS!</h1>
              <div className="hotlines">
                <p>Sharpen your design eye while having fun!</p>
                <p>For any inquiries, please contact us at:</p>
                <p>typeventure@gmail.com</p>
              </div>
              <button className="hidden" onClick={() => setIsActive(false)}>
                Not Registered Yet?
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="toggle-panel toggle-right">
              <div className="social-icons">
                <h1>WELCOME!</h1>
                <p>Stay Updated with TypeVenture's Social Platforms</p>

                <a className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="20px"
                    height="20px"
                    fillRule="nonzero"
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M25,3c-12.15,0-22,9.85-22,22c0,11.03,8.125,20.137,18.712,21.728v-15.897h-5.443v-5.783h5.443v-3.848c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944c10.738-1.457,19.022-10.638,19.022-21.775c0-12.15-9.85-22-22-22z"></path>
                      </g>
                    </g>
                  </svg>
                </a>

                <a className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="20px"
                    height="20px"
                    fillRule="nonzero"
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(8.53333,8.53333)">
                        <path d="M9.99805,3c-3.859,0-6.99805,3.14195-6.99805,7.00195v10c0,3.859,3.14195,6.99805,7.00195,6.99805h10c3.859,0,6.99805-3.14195,6.99805-7.00195v-10c0-3.859-3.14195-6.99805-7.00195-6.99805zM22,7c0.552,0,1,0.448,1,1c0,0.552-0.448,1-1,1c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1zM15,9c3.309,0,6,2.691,6,6c0,3.309-2.691,6-6,6c-3.309,0-6-2.691-6-6c0-3.309,2.691-6,6-6zM15,11c-2.20914,0-4,1.79086-4,4c0,2.20914,1.79086,4,4,4c2.20914,0,4-1.79086,4-4c0-2.20914-1.79086-4-4-4z"></path>
                      </g>
                    </g>
                  </svg>
                </a>

                <a className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width="20px"
                    height="20px"
                    fill="#ffffff"
                  >
                    <path d="M16.003906 14.0625 L16.003906 18.265625 L21.992188 18.265625 C21.210938 20.8125 19.082031 22.636719 16.003906 22.636719 C12.339844 22.636719 9.367188 19.664063 9.367188 16 C9.367188 12.335938 12.335938 9.363281 16.003906 9.363281 C17.652344 9.363281 19.15625 9.96875 20.316406 10.964844 L23.410156 7.867188 C21.457031 6.085938 18.855469 5 16.003906 5 C9.925781 5 5 9.925781 5 16 C5 22.074219 9.925781 27 16.003906 27 C25.238281 27 27.277344 18.363281 26.371094 14.078125 Z" />
                  </svg>
                </a>

                <a className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="20px"
                    height="20px"
                    fillRule="nonzero"
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M11,4c-3.866,0-7,3.134-7,7v28c0,3.866,3.134,7,7,7h28c3.866,0,7-3.134,7-7v-28c0-3.866-3.134-7-7-7zM13.08594,13h7.9375l5.63672,8.00977l6.83984-8.00977h2.5l-8.21094,9.61328l10.125,14.38672h-7.93555l-6.54102-9.29297l-7.9375,9.29297h-2.5l9.30859-10.89648zM16.91406,15l14.10742,20h3.06445l-14.10742-20z"></path>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
              <button className="hidden" onClick={() => setIsActive(true)}>
                Have an Account?
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div 
          className="login-register-wrapper"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseForgotPassword}
        >
          <div 
            className="container"
            style={{
              maxWidth: '450px',
              minHeight: 'auto',
              padding: '40px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseForgotPassword}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '30px',
                color: '#666',
                cursor: 'pointer',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              ×
            </button>

            {/* Step 1: Enter Email */}
            {forgotPasswordStep === 1 && (
              <form onSubmit={handleSendResetCode} style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#000' }}>
                    🔒 Forgot Password?
                  </h2>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Enter your email address to receive a reset code
                  </p>
                </div>

                <div className="input-box">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={resetLoading}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      fontSize: '14px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      marginBottom: '20px',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  style={{
                    width: '100%',
                    padding: '12px 30px',
                    background: 'linear-gradient(135deg, #0029FF, #000000, #FF1414)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: resetLoading ? 'not-allowed' : 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    opacity: resetLoading ? 0.6 : 1,
                  }}
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </form>
            )}

            {/* Step 2: Enter Code + New Password */}
            {forgotPasswordStep === 2 && (
              <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#000' }}>
                    🔓 Reset Password
                  </h2>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>
                    Enter the code sent to:
                  </p>
                  <p style={{ fontSize: '12px', color: '#0029FF', margin: 0, fontWeight: 600 }}>
                    {resetEmail}
                  </p>
                </div>

                <div className="input-box">
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    required
                    disabled={resetLoading}
                    style={{
                      width: '100%',
                      padding: '20px',
                      fontSize: '32px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      letterSpacing: '10px',
                      border: '2px solid #ddd',
                      borderRadius: '10px',
                      outline: 'none',
                      fontFamily: 'Courier New, monospace',
                      marginBottom: '10px',
                    }}
                  />

                  <div style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                    {timeLeft > 0 ? (
                      <span>
                        Code expires in: <strong style={{ color: '#0029FF' }}>{formatTime(timeLeft)}</strong>
                      </span>
                    ) : (
                      <span style={{ color: '#FF1414', fontWeight: 600 }}>Code expired</span>
                    )}
                  </div>

                  <div className="password-wrapper" style={{ marginBottom: '10px' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      required
                      disabled={resetLoading}
                      style={{
                        width: '100%',
                        padding: '12px 40px 12px 15px',
                        fontSize: '14px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        outline: 'none',
                      }}
                    />
                    <a
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(prev => !prev)}
                      disabled={resetLoading}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </a>
                  </div>

                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      required
                      disabled={resetLoading}
                      style={{
                        width: '100%',
                        padding: '12px 40px 12px 15px',
                        fontSize: '14px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        outline: 'none',
                      }}
                    />
                    <a
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      disabled={resetLoading}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading || resetCode.length !== 6 || timeLeft === 0}
                  style={{
                    width: '100%',
                    padding: '12px 30px',
                    background: 'linear-gradient(135deg, #0029FF, #000000, #FF1414)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (resetLoading || resetCode.length !== 6 || timeLeft === 0) ? 'not-allowed' : 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '10px',
                    opacity: (resetLoading || resetCode.length !== 6 || timeLeft === 0) ? 0.6 : 1,
                  }}
                >
                  {resetLoading ? 'Resetting...' : 'Reset Password'}
                </button>

                <button
                  type="button"
                  onClick={handleResendResetCode}
                  disabled={resetLoading || !canResend}
                  style={{
                    width: '100%',
                    padding: '12px 30px',
                    background: 'transparent',
                    color: '#0029FF',
                    border: '2px solid #0029FF',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (resetLoading || !canResend) ? 'not-allowed' : 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    opacity: (resetLoading || !canResend) ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!resetLoading && canResend) {
                      e.target.style.background = '#0029FF';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#0029FF';
                  }}
                >
                  {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}