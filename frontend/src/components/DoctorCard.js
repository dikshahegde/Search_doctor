import React, { useState } from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const handleMapSearch = () => {
    const query = `${doctor.name} ${doctor.hosp?.name} ${doctor.city}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleSubmit = () => {
    const review = {
      rating,
      comment,
      doctor_id: doctor.id,
      user_id: 1 // Replace with actual user ID (from auth or local storage if applicable)
    };

    fetch('http://localhost:8080/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit review');
        return res.json();
      })
      .then(data => {
        alert('Review submitted successfully!');
        setShowModal(false);
        setComment('');
        setRating(1);
      })
      .catch(err => {
        console.error('Error submitting review:', err);
        alert('Error submitting review');
      });
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
        <button onClick={handleMapSearch}>Search in Google Maps</button>
        <br />
        <button onClick={() => setShowModal(true)}>Add Review</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Review for {doctor.name}</h3>
            <label>Rating (1–5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <label>Comment:</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
            />
            <div className="modal-buttons">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
