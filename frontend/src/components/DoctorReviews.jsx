import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getToken } from '../utils/auth';
import './DoctorReviews.css';

const DoctorReviews = () => {
  const { Id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();
    fetch(`http://localhost:8080/api/doctors/${Id}/reviews`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setError('Unexpected response format');
        }
      })
      .catch((e) => {
        setError(e.message || 'Error fetching reviews');
      });
  }, [Id]);

  return (
    <div className="doctor-reviews-container">
      <h2 className="title">Reviews for {name || 'Doctor'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reviews.length === 0 && !error && <p className="no-reviews">No reviews found.</p>}
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <h4>Rating: {review.rating} ⭐</h4>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorReviews;
