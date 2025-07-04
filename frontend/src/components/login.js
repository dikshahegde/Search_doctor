import React, { useState } from 'react';//use state keeps account of states
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.text(); // Backend returns plain text

    setMessage(result);
    if (result === "Login successful!") {
      alert("✅ Logged in!");
      // You can navigate to another page here
    }
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

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
