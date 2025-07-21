package com.myfirstspring.restaurant.controller;

import com.myfirstspring.restaurant.dtos.LoginRequest;
import com.myfirstspring.restaurant.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest loginRequest){
                var user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
                if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
                System.out.println("Login successful" + loginRequest.getEmail());
                return ResponseEntity.ok("Login successful");
    }

}
