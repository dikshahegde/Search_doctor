import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const handleMapSearch = () => {
    const query = `${doctor.name} ${doctor.hospital} ${doctor.city}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.spec}</p>
      <p><strong>Hospital:</strong> {doctor.hosp}</p>
      <p><strong>City:</strong> {doctor.city}</p>
      <p><strong>Fees:</strong> {doctor.fees}</p>
      <p><strong>Experience:</strong> {doctor.exp}</p>
      <button onClick={handleMapSearch}>Search in Google Maps</button>
    </div>
  );
};

export default DoctorCard;
