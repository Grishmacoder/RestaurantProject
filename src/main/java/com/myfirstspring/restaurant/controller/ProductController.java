package com.myfirstspring.restaurant.controller;

import com.myfirstspring.restaurant.dtos.ProductDto;
import com.myfirstspring.restaurant.entities.Product;
import com.myfirstspring.restaurant.mapper.ProductMapper;
import com.myfirstspring.restaurant.repositories.CategoryRepository;
import com.myfirstspring.restaurant.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<ProductDto> getProducts(

            @RequestParam(name = "categoryId", required = false ) Byte categoryId
    ) {

        List<Product> products;
        if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId);
        }else{
            products = productRepository.findAllWithCategory();
        }

        return products
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductsByCategory(@PathVariable Long id) {
        var product =  productRepository.findById(id).orElse(null);
        if(product == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productMapper.toDto(product));
    }

    @PostMapping("/add-product")
    public ResponseEntity<ProductDto>  createProduct(
            @RequestBody  ProductDto request,
            UriComponentsBuilder uriBuilder
    ) {
        var category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        if(category == null){
            return ResponseEntity.notFound().build();
        }
        var product = productMapper.toEntity(request);
        product.setCategory(category);
        productRepository.save(product);
        request.setId(product.getId());

        var uri = uriBuilder.path("/products/{id}").buildAndExpand(product.getId()).toUri();
        return ResponseEntity.created(uri).body(request);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable(name = "id") Long id,
            @RequestBody  ProductDto request
    ){
        var category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        if(category == null){
            return ResponseEntity.notFound().build();
        }
        var product = productRepository.findById(id).orElse(null);
        if(product == null){
            return ResponseEntity.notFound().build();
        }
        productMapper.update(request,product);
        product.setCategory(category);
        productRepository.save(product);
        request.setId(product.getId());
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        var product = productRepository.findById(id).orElse(null);
        if(product == null){
            return ResponseEntity.notFound().build();
        }
        productRepository.delete(product);
        return ResponseEntity.noContent().build();
    }
}
