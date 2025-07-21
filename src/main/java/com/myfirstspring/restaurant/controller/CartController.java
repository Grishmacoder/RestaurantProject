package com.myfirstspring.restaurant.controller;

import com.myfirstspring.restaurant.dtos.AddItemToCartRequest;
import com.myfirstspring.restaurant.dtos.CartDto;
import com.myfirstspring.restaurant.dtos.CartItemDto;
import com.myfirstspring.restaurant.dtos.UpdateCartItemRequest;
import com.myfirstspring.restaurant.services.CartService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartDto> createCart(UriComponentsBuilder ucb) {
        var cartDto = cartService.createCart();
        var uri = ucb.path("/carts/{id}").buildAndExpand(cartDto.getId()).toUri();

        return ResponseEntity.created(uri).body(cartDto);
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<CartItemDto> addToCart(
            @PathVariable("cartId")UUID cartId,
            @RequestBody AddItemToCartRequest request)
    {

        var cartItemDto = cartService.addToCart(cartId, request.getProductId());
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItemDto);
    }

    @PutMapping("/{cartId}/items/{productId}")
    public CartItemDto updateItem(
            @PathVariable("cartId")UUID cartId,
            @PathVariable("productId") Long productId,
            @Valid @RequestBody UpdateCartItemRequest request
            )
    {
        return cartService.updateItem(cartId, productId, request.getQuantity());
    }

    @DeleteMapping("/{cartId}/items/{productId}")
    public ResponseEntity<?> deleteItem(
            @PathVariable("cartId") UUID cartId,
            @PathVariable("productId") Long productId)
    {

        cartService.removeFromCart(cartId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartId}/items")
    public ResponseEntity<?> clearCart(
            @PathVariable("cartId") UUID cartId)
    {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{cartId}")
    public CartDto getCart(@PathVariable UUID cartId) {

        return cartService.getCart(cartId);
    }

}

