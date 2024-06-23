package com.paco.city_explorer_backend.Controller;

import com.paco.city_explorer_backend.Dto.Auth.AuthRequest;
import com.paco.city_explorer_backend.Dto.Auth.AuthResponse;
import com.paco.city_explorer_backend.Dto.Auth.RefreshRequest;
import com.paco.city_explorer_backend.Dto.Auth.RegisterRequest;
import com.paco.city_explorer_backend.Exception.ExpiredJwtTokenException;
import com.paco.city_explorer_backend.Exception.UnauthorizedException;
import com.paco.city_explorer_backend.Service.Auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication API", description = "API for authentication operations")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and generate access token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated and generated access token"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid credentials or access denied"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            AuthResponse authResponse = authService.login(authRequest);
            return ResponseEntity.ok(authResponse);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user and generate access token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully registered and generated access token"),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid input data or validation errors"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            AuthResponse authResponse = authService.register(registerRequest);
            return ResponseEntity.ok(authResponse);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token using refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully refreshed and generated new access token"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid refresh token"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshRequest refreshRequest) {
        try {
            AuthResponse authResponse = authService.refresh(refreshRequest.getRefreshToken());
            return ResponseEntity.ok(authResponse);
        } catch (ExpiredJwtTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
