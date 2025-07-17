package com.myfirstspring.restaurant.mapper;

import com.myfirstspring.restaurant.dtos.RegisterUserRequest;
import com.myfirstspring.restaurant.dtos.UpdateUserRequest;
import com.myfirstspring.restaurant.dtos.UserDto;
import com.myfirstspring.restaurant.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    UserDto toDto(User user);

    User toEntity(RegisterUserRequest request);
    void update(UpdateUserRequest request, @MappingTarget User user);
}