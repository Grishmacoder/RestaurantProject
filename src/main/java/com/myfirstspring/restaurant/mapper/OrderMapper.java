package com.myfirstspring.restaurant.mapper;

import com.myfirstspring.restaurant.dtos.OrderDto;
import com.myfirstspring.restaurant.entities.Order;
import org.mapstruct.Mapper;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderDto toOrderDto(Order order);
    Order toEntity(OrderDto orderDto);

}
