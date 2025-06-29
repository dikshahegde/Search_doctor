package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Review;
import com.example.backend.model.doctors;
import com.example.backend.repo.DoctorRepo;
import com.example.backend.repo.ReviewRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo repo;

    @Autowired
    private DoctorRepo doctorRepo;
    public List<Review> getReviewsByDoctorId(Long doctorId){
        return repo.findByDoctorId(doctorId);
    }
    public Review saveReviews(Long doctorId,Review review){
        doctors doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        review.setDoctor(doctor);
        return repo.save(review);
    }
}
