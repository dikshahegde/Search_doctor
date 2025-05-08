package com.example.ecom_proj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecom_proj.model.User;
import com.example.ecom_proj.repo.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;
    public User saveUser(User user){
        return repo.save(user);
    }
    public User findByEmail(String email){
        return repo.findByEmail(email);
    }
    
}
