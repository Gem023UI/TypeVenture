import React, { useState } from "react";
import "./Login&Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function LoginRegister({ logoUrl }) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // REGISTER FUNCTION
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await axios.post(`${API_URL}/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful! Please log in.");
      setIsActive(false); // switch to login view
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed.");
    }
  };

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post(`${API_URL}/user/login`, { email, password });
      navigate("/landing"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.error || "Login failed.");
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
              />
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn" name="submit">
              LOGIN
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
              />
              <input
                type="text"
                id="register-username"
                name="username"
                placeholder="User Name"
                required
              />
              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn" name="submit">
              REGISTER
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
