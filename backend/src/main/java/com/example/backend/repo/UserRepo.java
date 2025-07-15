
package com.example.backend.repo;
import com.example.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepo extends JpaRepository<Users,String>{
    Users findByEmail(String email);
   
}