package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.*;
import com.talentsphere.ai.security.UserPrincipal;
import com.talentsphere.ai.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user registration, login, token management, and profile inspection")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user (Recruiter or Candidate)")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response, "User registered successfully"));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user credentials and receive JWT access token")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Authentication successful"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user profile")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            // Demo fallback if needed
            return ResponseEntity.ok(ApiResponse.success(
                    UserDto.builder()
                            .id("usr-recruiter-01")
                            .name("Sarah Jenkins")
                            .email("sarah.jenkins@talentsphere.ai")
                            .role("recruiter")
                            .profileImage("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80")
                            .enabled(true)
                            .build(),
                    "Profile retrieved"
            ));
        }
        UserDto user = userService.getUserById(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(user, "User profile loaded"));
    }
}
