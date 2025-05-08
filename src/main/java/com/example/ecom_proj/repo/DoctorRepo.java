package com.example.ecom_proj.repo;
import com.example.ecom_proj.model.doctors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DoctorRepo extends JpaRepository<doctors,Integer>{
    
}
