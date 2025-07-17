package com.myfirstspring.restaurant.mapper;

import com.myfirstspring.restaurant.dtos.UserDto;
import com.myfirstspring.restaurant.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    UserDto toDto(User user);
}
