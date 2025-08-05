package com.voting.voting_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserDetailsManager userDetailsManager;

    @GetMapping("/me")
    public UserInfo getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return new UserInfo(username, roles);
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        if (userDetailsManager.userExists(request.getUsername())) {
            return "User already exists!";
        }

        UserDetails user = User.withUsername(request.getUsername())
                .password("{noop}"+request.getPassword())
                .roles("MEMBERS") // default role
                .build();

        userDetailsManager.createUser(user);
        return "User registered successfully!";
    }

    public record UserInfo(String username, List<String> roles) {}
}
