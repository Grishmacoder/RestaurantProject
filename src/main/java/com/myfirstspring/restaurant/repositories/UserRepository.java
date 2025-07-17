package com.myfirstspring.restaurant.repositories;

import com.myfirstspring.restaurant.entities.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {
}
