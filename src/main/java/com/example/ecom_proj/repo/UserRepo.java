
package com.example.ecom_proj.repo;
import com.example.ecom_proj.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepo extends JpaRepository<User,String>{
    User findByEmail(String email);
}
