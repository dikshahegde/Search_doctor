package com.example.backend.controller;

import java.util.List;

import com.example.backend.model.Review;
import com.example.backend.model.Users;
import com.example.backend.model.doctors;
import com.example.backend.service.DoctorsService;
import com.example.backend.service.ReviewService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class doctorController {

    @Autowired
    private DoctorsService service;

    @GetMapping("/doctors")
    public List<doctors> getAllDoctors(){
        return service.getAllDoctors();
    }

    
    @GetMapping("/users")
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }

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

    @Autowired 
    private UserService userService;
    @PostMapping("/register")
    public String register(@RequestBody Users user){
        if(userService.findByEmail(user.getEmail())!=null){
            return "Email alredy registered";
        }
        
        userService.saveUser(user);
        return "Registration Completed";

    }
    @PostMapping("/login")
    public String loginUser(@RequestBody Users user) {
        Users existing = userService.findByEmail(user.getEmail());
        if (existing == null) {
            return "User not found!";
        }
        if (!existing.getPassword().equals(user.getPassword())) {
            return "Incorrect password!";
        }
        return "Login successful!";
    }
}