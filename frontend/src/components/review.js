import React, { useState } from 'react';
import './review.css';
import { getToken, getUserEmail } from '../utils/auth';

const Review = ({ doctorId, userEmail, onClose }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!comment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    try {
      const emailToUse = userEmail || getUserEmail();
      if (!emailToUse) {
        alert('Unable to detect your email from the session. Please log in again.');
        return;
      }
      const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}/users/${encodeURIComponent(emailToUse)}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ comment, rating })
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      alert("Review submitted successfully!");
      onClose();

    } catch (err) {
      console.error('Error:', err);
      alert('Error submitting review. Please try again.');
    }
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h2>Add Review for Doctor ID: {doctorId}</h2>
        <form onSubmit={handleSubmit}>
          <label>Rating (1–5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />

          <label>Comment:</label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            required
          />

          <div className="review-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
