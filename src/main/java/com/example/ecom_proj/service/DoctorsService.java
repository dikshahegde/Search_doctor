package com.example.ecom_proj.service;

import java.util.List;
import com.example.ecom_proj.model.doctors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecom_proj.repo.DoctorRepo;

@Service
public class DoctorsService {
    @Autowired
    private DoctorRepo repo;

    public List<doctors> getAllDoctors(){
        return repo.findAll();
    }
}
