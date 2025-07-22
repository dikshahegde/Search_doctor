import React, { useState } from 'react';
import './DoctorCard.css';
import Review from './review';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor, userEmail }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleMapSearch = () => {
    const query = `${doctor.name} ${doctor.hosp?.name} ${doctor.city}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleViewReviews = () => {
    navigate(`/doctors/${doctor.id}/reviews`);
  };

  return (
    <div className="doctor-card">
      <h2>{doctor.name} (ID: {doctor.id})</h2>
      <div className="card-content">
        <p><strong>Specialization:</strong> {doctor.spec?.name}</p>
        <p><strong>Hospital:</strong> {doctor.hosp?.name}</p>
        <p><strong>City:</strong> {doctor.city}</p>
        <p><strong>Fees:</strong> ₹{doctor.fees}</p>
        <p><strong>Experience:</strong> {doctor.exp} years</p>
        <div className="button-group">
          <button onClick={handleMapSearch}>Find on Maps</button>
          <button onClick={() => setShowModal(true)}>⭐ Add Review</button><br />
          <button onClick={handleViewReviews}>View Reviews</button>
        </div>
      </div>

      {showModal && (
        <Review doctorId={doctor.id} userEmail={userEmail} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default DoctorCard;
