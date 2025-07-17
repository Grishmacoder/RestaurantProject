package com.myfirstspring.restaurant.mapper;

import com.myfirstspring.restaurant.dtos.ProductDto;
import com.myfirstspring.restaurant.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.id", target = "categoryId")
    ProductDto toDto(Product product);
}
