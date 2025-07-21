package com.myfirstspring.restaurant.repositories;

import com.myfirstspring.restaurant.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Long id(Long id);
    Optional<User> findByEmail(String email);
}
