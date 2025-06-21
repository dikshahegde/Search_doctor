package com.example.backend.repo;
import com.example.backend.model.doctors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //Data Access Object layer which interacts with the table.
public interface DoctorRepo extends JpaRepository<doctors,Integer>{
    //spring data jpa provides the readymade CRUD operations
}