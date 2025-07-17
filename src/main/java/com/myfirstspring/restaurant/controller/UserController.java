package com.myfirstspring.restaurant.controller;

import com.myfirstspring.restaurant.dtos.ChangePasswordRequest;
import com.myfirstspring.restaurant.dtos.RegisterUserRequest;
import com.myfirstspring.restaurant.dtos.UpdateUserRequest;
import com.myfirstspring.restaurant.dtos.UserDto;
import com.myfirstspring.restaurant.entities.User;
import com.myfirstspring.restaurant.mapper.UserMapper;
import com.myfirstspring.restaurant.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    @GetMapping
    public List<UserDto> getUsers(
            @RequestParam(required = false, defaultValue = "") String sort)
    {

        if(!Set.of("name", "email").contains(sort))
            sort = "name";

        return userRepository.findAll(Sort.by(sort))
                .stream()
                .map(userMapper::toDto)
                .toList();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> addUser(
            @RequestBody RegisterUserRequest request,
            UriComponentsBuilder uriBuilder
    ) {
        var user = userMapper.toEntity(request);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(user.getId()).toUri();
        userRepository.save(user);

        var userDto = userMapper.toDto(user);
        return ResponseEntity.created(uri).body(userDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable long id) {
        var user =  userRepository.findById(id).orElse(null);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable(name = "id") long id,
            @RequestBody UpdateUserRequest request ) {
        var user = userRepository.findById(id).orElse(null);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        userMapper.update(request,user);
        userRepository.save(user);

        return ResponseEntity.ok(userMapper.toDto(user));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        var user = userRepository.findById(id).orElse(null);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        userRepository.delete(user);
        return ResponseEntity.noContent().build();

    }

    @PostMapping("/{id}/{change-password}")
    public ResponseEntity<Void> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request) {

        var user = userRepository.findById(id).orElse(null);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        if(!user.getPassword().equals(request.getOldPassword())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        user.setPassword(request.getNewPassword());
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }

}

