package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Users;
import com.example.backend.repo.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;
    public Users saveUser(Users user){
        return repo.save(user);
    }
    public Users findByEmail(String email){
        return repo.findByEmail(email);
    }
    public List<Users> getAllUsers() {
    return repo.findAll();  // userRepo extends JpaRepository
}

    
}