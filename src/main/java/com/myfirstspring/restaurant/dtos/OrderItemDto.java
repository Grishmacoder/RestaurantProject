package com.myfirstspring.restaurant.dtos;

import com.myfirstspring.restaurant.entities.Product;
import lombok.Data;

@Data
public class OrderItemDto {
    private Product product;
    private int quantity;
    private double totalPrice;
}
