import React, { useState } from "react";
import "./Login&Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// FIXED: Add /api prefix and fallback
const API_URL = import.meta.env.VITE_BACKEND_URL || "https://typeventure.onrender.com";

export default function LoginRegister({ logoUrl }) {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debug logging
  console.log("🔍 API_URL:", API_URL);
  console.log("🔍 All env vars:", import.meta.env);

  // REGISTER FUNCTION
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // Debug what we're sending
    console.log("📤 Registering to:", `${API_URL}/api/user/register`);

    try {
      const response = await axios.post(`${API_URL}/api/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Registration success:", response.data);
      alert("Registration successful! Please log in.");
      setIsActive(false); // switch to login view
      e.target.reset(); // clear form
    } catch (err) {
      console.error("❌ Registration error:", err.response || err);
      alert(err.response?.data?.message || err.response?.data?.error || "Registration failed.");
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

    // Debug what we're sending
    console.log("📤 Logging in to:", `${API_URL}/api/user/login`);
    console.log("📤 Credentials:", { email, password: "***" });

    try {
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("✅ Login success:", response.data);
      alert("Login successful!");
      navigate("/landing"); // redirect after login
    } catch (err) {
      console.error("❌ Login error:", err.response || err);
      alert(err.response?.data?.message || err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-register-wrapper">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        {/* LOGIN */}
        <div className="form-container sign-up">
          <form id="loginForm" onSubmit={handleLogin}>
            <h1>LOGIN</h1>
            <div className="input-box">
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
              />
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn" name="submit" disabled={loading}>
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>
        </div>

        {/* REGISTER */}
        <div className="form-container sign-in">
          <form id="registerForm" onSubmit={handleRegister}>
            <h1>REGISTER</h1>
            <div className="input-box">
              <input
                type="file"
                id="register-avatar"
                name="avatar"
                className="file-input"
                placeholder="Upload Profile Picture"
                disabled={loading}
              />
              <input
                type="text"
                id="register-username"
                name="username"
                placeholder="User Name"
                required
                disabled={loading}
              />
              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
              />
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Password"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn" name="submit" disabled={loading}>
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>
        </div>

        {/* TOGGLE CONTAINER */}
        <div className="toggle-container">
          <div className="toggle">
            {/* LEFT SIDE */}
            <div className="toggle-panel toggle-left">
              <img src={logoUrl} alt="TypeVenture Logo" className="trademark" />
              <h1>GREETINGS!</h1>
              <div className="hotlines">
                <h5>"Sharpen your design eye while having fun!"</h5>
                <p>For any inquiries, please contact us at:</p>
                <p>(+63) 906 211 0919</p>
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
              </div>
              <button className="hidden" onClick={() => setIsActive(true)}>
                Have an Account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}