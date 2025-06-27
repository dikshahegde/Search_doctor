import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const handleMapSearch = () => {
    const query = `${doctor.name} ${doctor.hosp?.name} ${doctor.city}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.spec?.name}</p>
      <p><strong>Hospital:</strong> {doctor.hosp?.name}</p>
      <p><strong>City:</strong> {doctor.city}</p>
      <p><strong>Fees:</strong> {doctor.fees}</p>
      <p><strong>Experience:</strong> {doctor.exp}</p>
      <button onClick={handleMapSearch}>Search in Google Maps</button>
    </div>
  );
};

export default DoctorCard;
