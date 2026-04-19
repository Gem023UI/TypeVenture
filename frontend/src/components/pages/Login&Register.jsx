import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerUser, loginUser } from "../../api/user";
import Loader from "../layout/Loader";
import "./Login&Register.css";

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

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const [showTermsModal, setShowTermsModal] = useState(false);

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

    const payload = {
      username: username.trim(),
      email: email.trim(),
      password: password,
    };

    try {
      const data = await registerUser(payload);

      console.log("✅ Registered:", data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setHobbies([]);
    } catch (err) {
      console.error("❌ Registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err || "Invalid credentials.",
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
      const data = await loginUser({ email, password });

      console.log("✅ Login response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("isVerified", data.user.isVerified);
      localStorage.setItem("userrole", data.user.userrole);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      const role = data.user.userrole;
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/lessons");
        }
      }, 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err || "Invalid credentials.",
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
                  style={{
                    border: passwordsMatch
                      ? "2px solid #22c55e"
                      : passwordsMismatch
                      ? "2px solid #ef4444"
                      : undefined,
                    transition: "border-color 0.2s ease",
                  }}
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

              {/* Terms & Conditions Checkbox */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", margin: "12px 0 4px", maxWidth: "300px", width: "100%" }}>
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={{ width: "16px", height: "16px", flexShrink: 0, cursor: "pointer", accentColor: "#0029FF" }}
                />
                <label htmlFor="termsCheckbox" style={{ fontSize: "12px", color: "#333", margin: 0, textAlign: "left", lineHeight: "1.4" }}>
                  I agree to the{" "}
                  <span
                    onClick={() => setShowTermsModal(true)}
                    style={{ color: "#0029FF", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>

              <button type="submit" className="btn2" disabled={loading || !agreedToTerms}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20px" height="20px" fillRule="nonzero">
                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                      <g transform="scale(5.12,5.12)">
                        <path d="M25,3c-12.15,0-22,9.85-22,22c0,11.03,8.125,20.137,18.712,21.728v-15.897h-5.443v-5.783h5.443v-3.848c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944c10.738-1.457,19.022-10.638,19.022-21.775c0-12.15-9.85-22-22-22z"></path>
                      </g>
                    </g>
                  </svg>
                </a>

                <a className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20px" height="20px" fillRule="nonzero">
                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                      <g transform="scale(8.53333,8.53333)">
                        <path d="M9.99805,3c-3.859,0-6.99805,3.14195-6.99805,7.00195v10c0,3.859,3.14195,6.99805,7.00195,6.99805h10c3.859,0,6.99805-3.14195,6.99805-7.00195v-10c0-3.859-3.14195-6.99805-7.00195-6.99805zM22,7c0.552,0,1,0.448,1,1c0,0.552-0.448,1-1,1c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1zM15,9c3.309,0,6,2.691,6,6c0,3.309-2.691,6-6,6c-3.309,0-6-2.691-6-6c0-3.309,2.691-6,6-6zM15,11c-2.20914,0-4,1.79086-4,4c0,2.20914,1.79086,4,4,4c2.20914,0,4-1.79086,4-4c0-2.20914-1.79086-4-4-4z"></path>
                      </g>
                    </g>
                  </svg>
                </a>

                <a className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="20px" fill="#ffffff">
                    <path d="M16.003906 14.0625 L16.003906 18.265625 L21.992188 18.265625 C21.210938 20.8125 19.082031 22.636719 16.003906 22.636719 C12.339844 22.636719 9.367188 19.664063 9.367188 16 C9.367188 12.335938 12.335938 9.363281 16.003906 9.363281 C17.652344 9.363281 19.15625 9.96875 20.316406 10.964844 L23.410156 7.867188 C21.457031 6.085938 18.855469 5 16.003906 5 C9.925781 5 5 9.925781 5 16 C5 22.074219 9.925781 27 16.003906 27 C25.238281 27 27.277344 18.363281 26.371094 14.078125 Z" />
                  </svg>
                </a>

                <a className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20px" height="20px" fillRule="nonzero">
                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
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

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2000, padding: "20px",
          }}
          onClick={() => setShowTermsModal(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: "16px", padding: "40px 36px",
              maxWidth: "520px", width: "100%", position: "relative",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)", maxHeight: "80vh",
              overflowY: "auto", fontFamily: "Poppins, sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowTermsModal(false)}
              style={{
                position: "absolute", top: "14px", right: "16px",
                background: "none", border: "none", fontSize: "28px",
                color: "#666", cursor: "pointer", lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#000", margin: "0 0 6px" }}>
                Terms and Conditions
              </h2>
              <div style={{ height: "3px", width: "60px", background: "linear-gradient(135deg,#0029FF,#000,#FF1414)", margin: "0 auto", borderRadius: "2px" }} />
            </div>

            {/* Content */}
            <div style={{ fontSize: "13px", color: "#444", lineHeight: "1.8" }}>
              <h4 style={{ color: "#0029FF", marginBottom: "6px", fontSize: "14px" }}>📚 Content Disclaimer</h4>
              <p style={{ marginBottom: "16px" }}>
                The lessons, exercises, and games available within this system have been gathered and compiled from publicly accessible resources on the internet. We do not claim ownership over third-party content. All materials are used for educational purposes only.
              </p>

              <h4 style={{ color: "#0029FF", marginBottom: "6px", fontSize: "14px" }}>🔬 Research & Data Use</h4>
              <p style={{ marginBottom: "16px" }}>
                By creating an account, you acknowledge and consent that your account information and usage data may be collected and used strictly for <strong>academic research purposes</strong>. Your data will not be sold, shared with advertisers, or used for any commercial purpose.
              </p>

              <h4 style={{ color: "#0029FF", marginBottom: "6px", fontSize: "14px" }}>🔒 Privacy</h4>
              <p style={{ marginBottom: "16px" }}>
                All collected data will be handled with confidentiality and in accordance with applicable data privacy standards. Personal identifiable information will not be publicly disclosed.
              </p>

              <h4 style={{ color: "#0029FF", marginBottom: "6px", fontSize: "14px" }}>✅ Agreement</h4>
              <p style={{ marginBottom: "0" }}>
                By checking the Terms and Conditions box and registering, you confirm that you have read, understood, and agree to these terms.
              </p>
            </div>

            {/* Accept button */}
            <button
              onClick={() => { setAgreedToTerms(true); setShowTermsModal(false); }}
              style={{
                marginTop: "28px", width: "100%", padding: "12px",
                background: "linear-gradient(135deg,#0029FF,#000,#FF1414)",
                color: "#fff", border: "none", borderRadius: "8px",
                fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px",
                textTransform: "uppercase", cursor: "pointer",
              }}
            >
              I Understand & Accept
            </button>
          </div>
        </div>
      )}

    </div>
  );
}