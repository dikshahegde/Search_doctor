package com.example.backend.service;

import java.util.List;
import com.example.backend.model.doctors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repo.DoctorRepo;

@Service // it contains the logic and it is a layer between controllers and jpa repo 
public class DoctorsService {
    @Autowired
    private DoctorRepo repo;

    public List<doctors> getAllDoctors(){
        return repo.findAll();
    }
}