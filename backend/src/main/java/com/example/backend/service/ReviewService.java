package com.example.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Review;
import com.example.backend.model.Users;
import com.example.backend.model.doctors;
import com.example.backend.repo.DoctorRepo;
import com.example.backend.repo.ReviewRepo;
import com.example.backend.repo.UserRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo repo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired 
    private UserRepo userRepo;
    public List<Review> getReviewsByDoctorId(Long doctorId){
        return repo.findReviewsByDoctorId(doctorId);
    }
    public Review saveReview(Long doctorId, String email,Review review) {
    doctors doctor = doctorRepo.findById(doctorId)
        .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

    Users user=userRepo.findByEmail(email);
    if (user == null) throw new IllegalArgumentException("User not found with email: " + email);
    review.setDoctor(doctor);//setter
    review.setUser(user);
    review.setReviewDate(LocalDate.now());
    return repo.save(review);//saved by jpa
}


}
