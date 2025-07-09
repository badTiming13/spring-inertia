package com.example.inertia_demo.repos;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.inertia_demo.models.User;
/**
 *
 * @author BDavydov
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
