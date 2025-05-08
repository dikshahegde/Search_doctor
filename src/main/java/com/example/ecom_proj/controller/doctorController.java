package com.example.ecom_proj.controller;

import java.util.List;

import com.example.ecom_proj.model.User;
import com.example.ecom_proj.model.doctors;
import com.example.ecom_proj.service.DoctorsService;
import com.example.ecom_proj.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    @Autowired 
    private UserService userService;
    @PostMapping("/register")
    public String register(@RequestBody User user){
        if(userService.findByEmail(user.getEmail())!=null){
            return "Email alredy registered";
        }
        
        userService.saveUser(user);
        return "Registration Completed";

    }
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User existing = userService.findByEmail(user.getEmail());
        if (existing == null) {
            return "User not found!";
        }
        if (!existing.getPassword().equals(user.getPassword())) {
            return "Incorrect password!";
        }
        return "Login successful!";
    }
}
