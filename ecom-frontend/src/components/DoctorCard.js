import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p><strong>Speciality:</strong> {doctor.spec}</p>
      <p><strong>City:</strong> {doctor.city}</p>
      <p><strong>Fees:</strong> ₹{doctor.fees}</p>
      <p><strong>Hospital:</strong> {doctor.hosp}</p>
      <p><strong>City:</strong> {doctor.city}</p>
      <p><strong>Experience:</strong> {doctor.exp}</p>
    </div>
  );
};

export default DoctorCard;
