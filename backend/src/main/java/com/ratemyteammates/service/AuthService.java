package com.ratemyteammates.service;

import com.ratemyteammates.dto.LoginRequest;
import com.ratemyteammates.dto.LoginResponse;
import com.ratemyteammates.model.User;
import com.ratemyteammates.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateJwtToken(authentication);
        
        User user = (User) authentication.getPrincipal();

        return LoginResponse.builder()
                .token(jwt)
                .username(user.getUsername())
                .isAdmin(user.isAdmin())
                .build();
    }
} 