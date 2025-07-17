package com.myfirstspring.restaurant.repositories;

import com.myfirstspring.restaurant.entities.Category;
import com.myfirstspring.restaurant.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Byte> {

}
