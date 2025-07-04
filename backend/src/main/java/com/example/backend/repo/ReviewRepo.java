package com.example.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Long>{
    List<Review> findReviewsByDoctorId(Long doctorId);
}
