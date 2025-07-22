import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import './Home.css';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [spec, setSpec] = useState('');
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
        const response = await fetch('http://localhost:8080/api/doctors', {
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
    if (!spec) {
      setFiltered(doctors);
      return;
    }

    const result = doctors.filter(doc =>
      doc.spec?.name?.toLowerCase().includes(spec.toLowerCase())
    );
    setFiltered(result);
  };

  if (loading) {
    return <div className="hero"><p>Loading doctors...</p></div>;
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
        <select value={spec} onChange={(e) => setSpec(e.target.value)}>
          <option value="" disabled>Select Doctor Type</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Dentist">Dentist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="General Surgery">General Surgery</option>
          <option value="General Practice">General Practice</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Occupational Medicine">Occupational Medicine</option>
          <option value="Homeopathy">Homeopathy</option>
          <option value="Cardiologist">Cardiologist</option>
        </select>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {filtered.length > 0 ? (
          filtered.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))
        ) : (
          <p>No doctors found for the selected specialization.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
