package com.example.backend.controller;

import java.util.List;

import com.example.backend.model.Review;
import com.example.backend.model.Users;
import com.example.backend.model.doctors;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.DoctorsService;
import com.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class doctorController {

    //get all doctors
    @Autowired
    private DoctorsService doctorservice;

    @GetMapping("/doctors")
    public List<doctors> getAllDoctors(){
        return doctorservice.getAllDoctors();
    }

    //add and view the reviews of each doctors
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/doctors/{Id}/users/{email}/reviews")
        public Review submitReview(
            @PathVariable("Id") Long Id,
            @PathVariable("email") String email,
            @RequestBody Review review) {// path variable is used to take Id from the url and use it as a parameter
        return reviewService.saveReview(Id,email,review);  // requestbody is used is used to convert json to review object
    }

    @GetMapping("/doctors/{Id}/reviews")
    public List<Review> getDoctorReviews(@PathVariable Long Id){
        return reviewService.getReviewsByDoctorId(Id);
    }

    //register to website
    @Autowired
private UserRepo userRepo;

@Autowired
private PasswordEncoder passwordEncoder;

@PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody Users user) {
    // Encode the password before saving
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepo.save(user);
    return ResponseEntity.ok("User registered successfully");
}

    
}