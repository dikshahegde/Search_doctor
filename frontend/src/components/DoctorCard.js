import React, { useState } from 'react';
import './DoctorCard.css';
import Review from './review';

const DoctorCard = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);

  const handleMapSearch = () => {
    const query = `${doctor.name} ${doctor.hosp?.name} ${doctor.city}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <div className="card-content">
        <p><strong>Specialization:</strong> {doctor.spec?.name}</p>
        <p><strong>Hospital:</strong> {doctor.hosp?.name}</p>
        <p><strong>City:</strong> {doctor.city}</p>
        <p><strong>Fees:</strong> ₹{doctor.fees}</p>
        <p><strong>Experience:</strong> {doctor.exp} years</p>
        <div className="button-group">
          <button onClick={handleMapSearch}>📍 Find on Maps</button>
          <button onClick={() => setShowModal(true)}>⭐ Add Review</button>
        </div>
      </div>

      {showModal && (
        <Review doctorId={doctor.id} userEmail={"abc@gmail.com"} onClose={() => setShowModal(false)} />

      )}
    </div>
  );
};

export default DoctorCard;
