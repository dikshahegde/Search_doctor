import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard'; // Import DoctorCard to display doctor details
import './Home.css';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [spec, setSpec] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = () => {
    const result = doctors.filter(doc => doc.spec.toLowerCase() === spec.toLowerCase());
    setFiltered(result);
  };

  return (
    <div className="hero">
      <h1>Find Your Specialist</h1>
      <div className="search-box">
        <select onChange={(e) => setSpec(e.target.value)} defaultValue="">
          <option value="" disabled>Select Doctor Type</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Dentist">Dentist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="General Surgery">General Surgery</option>
          <option value="General Practice">General Practice</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Occupational Medicine">Occupational Medicine</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {filtered.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

export default Home;
