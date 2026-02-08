import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';   // ✅ shared CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!emailRegex.test(email)) { setMessage("Invalid email format!"); return; } if (!password.trim()) { setMessage("Password is required!"); return; }
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {

      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(errorText || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setMessage("Login successful!");
      navigate('/home');
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="switch-auth">
          Don’t have an account?{" "}
          <span onClick={() => navigate('/register')} className="link-text">Register instead</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
