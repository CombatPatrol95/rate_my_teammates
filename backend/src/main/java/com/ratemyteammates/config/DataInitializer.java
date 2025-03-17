package com.ratemyteammates.config;

import com.ratemyteammates.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UserService userService;

    @Bean
    @Profile("!prod")
    public CommandLineRunner initData() {
        return args -> {
            try {
                // Create an admin user
                userService.createUser("admin", "admin123", true);
                log.info("Admin user created successfully");
            } catch (Exception e) {
                log.error("Error creating admin user: {}", e.getMessage());
            }
        };
    }
} 