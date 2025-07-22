import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Register from './components/register';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorReviews from './components/DoctorReviews';
import { isLoggedIn } from './utils/auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/doctors/:Id/reviews" element={
          <ProtectedRoute>
            <DoctorReviews />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
