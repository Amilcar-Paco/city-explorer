package com.paco.city_explorer_backend;


import com.paco.city_explorer_backend.Dto.Auth.AuthRequest;
import com.paco.city_explorer_backend.Dto.Auth.AuthResponse;
import com.paco.city_explorer_backend.Dto.Auth.RegisterRequest;
import com.paco.city_explorer_backend.Exception.UnauthorizedException;
import com.paco.city_explorer_backend.Repository.UserRepository;
import com.paco.city_explorer_backend.Security.JwtTokenProvider;
import com.paco.city_explorer_backend.Service.Auth.AuthService;
import com.paco.city_explorer_backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister_Success() {
        // Given
        RegisterRequest registerRequest = RegisterRequest.builder()
                .email("test@example.com")
                .password("password")
                .firstName("John")
                .lastName("Doe")
                .build();

        User newUser = User.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .build();

        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());
        when(userRepository.save(any())).thenReturn(newUser);
        when(jwtTokenProvider.generateToken(any())).thenReturn("mockAccessToken");
        when(jwtTokenProvider.generateRefreshToken(any())).thenReturn("mockRefreshToken");

        // When
        AuthResponse authResponse = authService.register(registerRequest);

        // Then
        assertEquals("mockAccessToken", authResponse.getAccessToken());
        assertEquals("mockRefreshToken", authResponse.getRefreshToken());

        verify(userRepository, times(1)).findByEmail(registerRequest.getEmail());
        verify(userRepository, times(1)).save(any());
        verify(jwtTokenProvider, times(1)).generateToken(any());
        verify(jwtTokenProvider, times(1)).generateRefreshToken(any());
    }

    @Test
    public void testRegister_UserAlreadyExists() {
        // Given
        RegisterRequest registerRequest = RegisterRequest.builder()
                .email("existingUser@example.com")
                .password("password")
                .firstName("Jane")
                .lastName("Doe")
                .build();

        when(userRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.of(new User()));

        // When / Then
        try {
            authService.register(registerRequest);
        } catch (UnauthorizedException e) {
            assertEquals("Username is already taken", e.getMessage());
        }

        verify(userRepository, times(1)).findByEmail(registerRequest.getEmail());
        verify(userRepository, never()).save(any());
        verify(jwtTokenProvider, never()).generateToken(any());
        verify(jwtTokenProvider, never()).generateRefreshToken(any());
    }

    @Test
    public void testLogin_Success() {
        // Given
        AuthRequest authRequest = AuthRequest.builder()
                .email("test@example.com")
                .password("password")
                .build();

        User existingUser = User.builder()
                .email(authRequest.getEmail())
                .password(passwordEncoder.encode(authRequest.getPassword()))
                .build();

        when(userRepository.findByEmail(authRequest.getEmail())).thenReturn(Optional.of(existingUser));
        when(jwtTokenProvider.generateToken(existingUser)).thenReturn("mockAccessToken");
        when(jwtTokenProvider.generateRefreshToken(existingUser)).thenReturn("mockRefreshToken");

        // When
        AuthResponse authResponse = authService.login(authRequest);

        // Then
        assertEquals("mockAccessToken", authResponse.getAccessToken());
        assertEquals("mockRefreshToken", authResponse.getRefreshToken());

        verify(userRepository, times(1)).findByEmail(authRequest.getEmail());
        verify(jwtTokenProvider, times(1)).generateToken(existingUser);
        verify(jwtTokenProvider, times(1)).generateRefreshToken(existingUser);
    }

    @Test
    public void testLogin_UserNotFound() {
        // Given
        AuthRequest authRequest = AuthRequest.builder()
                .email("nonExistingUser@example.com")
                .password("password")
                .build();

        when(userRepository.findByEmail(authRequest.getEmail())).thenReturn(Optional.empty());

        // When / Then
        try {
            authService.login(authRequest);
        } catch (UnauthorizedException e) {
            assertEquals("Invalid username or password", e.getMessage());
        }

        verify(userRepository, times(1)).findByEmail(authRequest.getEmail());
        verify(jwtTokenProvider, never()).generateToken(any());
        verify(jwtTokenProvider, never()).generateRefreshToken(any());
    }
}
