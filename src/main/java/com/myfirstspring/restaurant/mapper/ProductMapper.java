package com.myfirstspring.restaurant.mapper;

import com.myfirstspring.restaurant.dtos.ProductDto;
import com.myfirstspring.restaurant.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(ProductDto request);

    @Mapping(source = "category.id", target = "categoryId")
    ProductDto toDto(Product product);
    @Mapping(target = "id", ignore = true)
    void update(ProductDto request, @MappingTarget Product product);
}
