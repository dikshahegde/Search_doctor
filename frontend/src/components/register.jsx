import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';   // ✅ shared CSS

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) { setMessage("Name is required!"); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!emailRegex.test(email)) { setMessage("Invalid email format!"); return; }

    if (password.length < 6) { 
      setMessage("Password must be at least 6 characters long!"); return;
     }

    if (password !== confirm) {
      setMessage("Passwords do not match!");
      return;
    }
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirm }),
      });

      const result = await response.text();

      if (response.status === 409) {
        setMessage(result);
        return;
      }

      if (response.ok && result === "User registered successfully") {
        alert("✅ Registration successful! Please login.");
        navigate('/login');
      } else {
        setMessage(result);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
{email && !/^[^\s@]+@[^\s@]+\.(com|in|org|net|co)$/i.test(email) && (
  <p className="error-text">Enter a valid email ending with .com, .in, .org, etc.</p>
)}

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {password && confirm && password !== confirm && ( <p className="error-text">Passwords do not match!</p> )}
          <button type="submit">Register</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="switch-auth">
          Already have an account?{" "}
          <span onClick={() => navigate('/login')} className="link-text">Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
