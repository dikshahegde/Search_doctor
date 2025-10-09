import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();
      
      if (response.status === 409) {
        setMessage(result);
        return;
      }
      
      if (response.ok && result === "User registered successfully") {
        alert("✅ Registration successful! Please login.");
        setEmail('');
        setPassword('');
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
    <div className="register-card">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
