package com.myfirstspring.restaurant.dtos;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String name;
    private String email;

}
