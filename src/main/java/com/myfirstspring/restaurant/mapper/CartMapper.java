package com.myfirstspring.restaurant.mapper;

import com.myfirstspring.restaurant.dtos.CartDto;
import com.myfirstspring.restaurant.dtos.CartItemDto;
import com.myfirstspring.restaurant.entities.Cart;
import com.myfirstspring.restaurant.entities.CartItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartDto toDto(Cart cart);
    CartItemDto toDto(CartItem cartItem);

}
