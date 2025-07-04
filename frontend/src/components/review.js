import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Review() {
  const { doctorId } = useParams(); // 👈 capture the ID from the URL
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/doctors/${Id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment, rating })
    });
    alert("Review submitted!");
  };

  return (
    <div>
      <h2>Submit Review for Doctor ID: {doctorId}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write your review"
        />
        <br />
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
          placeholder="Rating (1-5)"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Review;
