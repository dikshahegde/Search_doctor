import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; 
import Login from './components/login'; 
import Register from './components/register'; 
import About from './components/About'; 
import Review from './components/review';

function App() {
  return (
    <Router>
      <div className="doctor-list-container"> {/* Apply the class here */}
        <Header /> {/* Display Header on all pages */}
        <Routes>
          {/* Define Routes for different pages */}
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home />} /> {/* Home page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/register" element={<Register />} /> {/* Register page */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/doctors/:doctorId/review" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
