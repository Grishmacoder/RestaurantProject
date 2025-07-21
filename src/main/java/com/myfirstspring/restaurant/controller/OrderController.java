package com.myfirstspring.restaurant.controller;

import com.myfirstspring.restaurant.dtos.OrderDto;
import com.myfirstspring.restaurant.entities.Order;
import com.myfirstspring.restaurant.mapper.OrderMapper;
import com.myfirstspring.restaurant.repositories.OrderRepository;
import com.myfirstspring.restaurant.repositories.ProductRepository;
import com.myfirstspring.restaurant.repositories.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;


    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderDto orderDto,
            UriComponentsBuilder uriBuilder
    ){
        var order = orderMapper.toEntity(orderDto);
        orderRepository.save(order);
        order.setId(order.getId());

        var uri = uriBuilder.path("/orders/{id}").buildAndExpand(order.getId()).toUri();
        return ResponseEntity.created(uri).body(order);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getCurrentUserOrders(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        var user = userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User not found"));
        List<Order> orders = orderRepository.getOrderByCustomer(user);
        List<OrderDto> orderDtos = orders
                .stream()
                .map(orderMapper::toOrderDto)
                .toList();
        return ResponseEntity.ok(orderDtos);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable("orderId") Long orderId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        var order = orderRepository.getOrderWithItems(orderId).orElse(null);
        if(order == null){
            return ResponseEntity.notFound().build();
        }
        var user = userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User not found"));
        if(!order.isPlacedBy(user)){
            throw new AccessDeniedException("Access denied, you don't have permission to view this order");
        }
        return ResponseEntity.ok(orderMapper.toOrderDto(order));
    }
}
