import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import './Home.css';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [spec, setSpec] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login first.');
        setLoading(false);
        return;
      }

      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/api/doctors`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          setError('Authentication failed. Please login again.');
          localStorage.removeItem('token');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setDoctors(data);
        setFiltered(data);
        setError('');
      } catch (err) {
        setError(`Failed to fetch doctors: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = () => {
    const normalizedName = nameQuery.trim().toLowerCase();
    const normalizedSpec = spec.trim().toLowerCase();

    const result = doctors.filter(doc => {
      const matchesSpec = normalizedSpec
        ? (doc.spec?.name?.toLowerCase().includes(normalizedSpec))
        : true;
      const matchesName = normalizedName
        ? (doc.name?.toLowerCase().includes(normalizedName))
        : true;
      return matchesSpec && matchesName;
    });

    setFiltered(result);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameQuery(value);
    const q = value.trim().toLowerCase();
    if (!q) {
      setNameSuggestions([]);
      setSuggestionsOpen(false);
      return;
    }
    const seen = new Set();
    const matches = doctors
      .filter(d => d.name?.toLowerCase().includes(q))
      .map(d => d.name)
      .filter(name => {
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      })
      .slice(0, 8);
    setNameSuggestions(matches);
    setSuggestionsOpen(matches.length > 0);
  };

  const chooseSuggestion = (name) => {
    setNameQuery(name);
    setSuggestionsOpen(false);
    setTimeout(() => handleSearch(), 0);
  };

  if (loading) {
    return (
      <div className="hero">
        <h1>Find Your Specialist</h1>
        <div className="skeleton-row">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero">
        <h1>Find Your Specialist</h1>
        <div className="error-message" style={{ color: 'red', padding: '20px' }}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <h1>Find Your Specialist</h1>

      <div className="search-box">
        <div className="name-typeahead">
          <input
          type="text"
          placeholder="Search by doctor name..."
          value={nameQuery}
          onChange={handleNameChange}
          onFocus={() => nameSuggestions.length && setSuggestionsOpen(true)}
          onBlur={() => setTimeout(() => setSuggestionsOpen(false), 150)}
        />
        {suggestionsOpen && (
          <ul className="typeahead-list">
            {nameSuggestions.map((s) => (
              <li key={s} onMouseDown={() => chooseSuggestion(s)}>{s}</li>
            ))}
          </ul>
        )}
        </div>
        <select value={spec} onChange={(e) => setSpec(e.target.value)}>
          <option value="">All doctors</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Dentist">Dentist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="General Surgery">General Surgery</option>
          <option value="General Practice">General Practice</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Occupational Medicine">Occupational Medicine</option>
          <option value="Homeopathy">Homeopathy</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Ayurveda">Ayurveda</option>
          <option value="Gynecologist/Obstetrician">Gynecologist/Obstetrician</option>
          <option value="Orthopedist">Orthopedist</option>
          <option value="Endocrinologist">Endocrinologist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Infertility Specialist">Infertility Specialist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {filtered.length > 0 ? (
          filtered.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))
        ) : (
          <div style={{background:'#fff', padding:'20px', borderRadius:'12px', boxShadow:'0 10px 25px rgba(0,0,0,0.08)'}}>
            <p style={{marginBottom:'8px'}}>No doctors found for the selected specialization.</p>
            <small>Try another specialization or clear the filter.</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
