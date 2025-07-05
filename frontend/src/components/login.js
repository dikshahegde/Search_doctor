import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();
      setMessage(result);

      if (result === "Login successful!") {
        alert("✅ Logged in!");
        navigate('/home');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Error connecting to server.");
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-card">
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

      {message && (
        <>
          <p className="message">{message}</p>
          {message !== "Login successful!" && (
            <button className="register-link" onClick={goToRegister}>
              Register Instead
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
