import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import './Home.css';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [spec, setSpec] = useState('');

  // Fetch doctors from backend on load
  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched doctors: ", data);
        setDoctors(data);
        setFiltered(data);
      })
      .catch(err => {
        console.error("Failed to fetch doctors:", err);
      });
  }, []);

  // Handle search by specialization
  const handleSearch = () => {
    console.log("Searching for specialization:", spec);
    console.log("Available specs:", doctors.map(d => d.spec?.name));

    if (!spec) {
      setFiltered(doctors);
      return;
    }

    const result = doctors.filter(doc =>
      doc.spec?.name?.toLowerCase().includes(spec.toLowerCase())
    );

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
          <option value="Homeopathy">Homeopathy</option>
          <option value="Cardiologist">Cardiologist</option>
        </select>
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="results">
        {filtered.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          filtered.map(doc => (
            <DoctorCard key={doc.doctorId} doctor={doc} />
          ))
        )}
      </div>

      {/* Debugging block (remove later) */}
      {/* <pre>{JSON.stringify(doctors, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
