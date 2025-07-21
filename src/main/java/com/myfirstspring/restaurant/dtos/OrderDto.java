package com.myfirstspring.restaurant.dtos;


import com.myfirstspring.restaurant.entities.OrderItem;
import com.myfirstspring.restaurant.entities.PaymentStatus;
import com.myfirstspring.restaurant.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class OrderDto {
    private Long id;
    private String status;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private List<OrderItem> items;

}
